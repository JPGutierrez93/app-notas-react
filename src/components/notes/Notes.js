import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

//styles
import './Notes.css';

export default class notes extends Component {

    state = {
        notes: [],
        id_usuario: localStorage.getItem('id'),
        nombre: localStorage.getItem('nombre'),
        tokenCfg: {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        },
        redirect: false,
        idSelected: ''
    };

    async componentDidMount() {

        this.getNotes();
    };

    getNotes = async () => {
        const res = await Axios.get('http://localhost:3700/api/notes?id_usuario=' + this.state.id_usuario, this.state.tokenCfg);
        this.setState({
            notes: res.data.notes
        });
    };

    smallDelete = async noteId => {
        if (window.confirm("¿Quieres eliminar esta nota?")) {
            await Axios.delete('http://localhost:3700/api/note/' + noteId, this.state.tokenCfg);

            this.getNotes();
        };

    };

    noteSelected = idSelected => {
        this.setState({
            idSelected,
            redirect: true
        });
    };

    render() {

        if (!this.state.redirect) {
            if( this.state.notes.length > 0 ){
                return (
                    <div className="notes-container">
                        {this.state.notes.map(n => {
                            return <div className="note-card" key={n._id} >
                                <button className="small-delete" onClick={() => this.smallDelete(n._id)}>X</button>
                                <div className="note-body" onClick={() => this.noteSelected(n._id)}>
                                    <h3>{n.titulo}</h3>
                                    <p>{n.contenido}</p>
                                </div>
                            </div>
                        })}
                    </div>
                );
            }else{
                return (
                    <div className="notes-container mrg">
                        Crea tu primer nota haciendo click <Link className="clickHere" to="/create"><strong>aquí</strong></Link>
                    </div>
                );
            };

        } else {
            return (
                <Redirect to={`/edit/${this.state.idSelected}`} />
            );
        };



    };
};
