import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

import './NoteForm.css';


export default class CreateNote extends Component {

    state = {
        id_usuario: localStorage.getItem('id'),
        id_nota: '',
        titulo: '',
        contenido: '',
        tokenCfg: {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        },
        redirect: false,
        displayBtn: 'none'
    };

    async componentDidMount() {
        const noteId = this.props.noteId;

        if (noteId !== 'undefined') {
            const res = await Axios.get('http://localhost:3700/api/note/' + noteId, this.state.tokenCfg);

            this.setState({
                id_nota: res.data.note._id,
                titulo: res.data.note.titulo,
                contenido: res.data.note.contenido,
                displayBtn: 'block'
            });

        };
    };


    inputHandle = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = async e => {
        e.preventDefault();
        const id_usuario = this.state.id_usuario;
        const titulo = this.state.titulo;
        const contenido = this.state.contenido;

        const datos = { id_usuario, titulo, contenido };

        if (this.props.fromCreate) {

            await Axios.post('http://localhost:3700/api/new-note', datos, this.state.tokenCfg);

        } else {
            await Axios.put('http://localhost:3700/api/note/' + this.props.noteId, datos, this.state.tokenCfg);
        };

        this.setState({
            redirect: true
        });
    };

    deleteNote = async () => {

        if (window.confirm("¿Quieres eliminar esta nota?")) {

            await Axios.delete('http://localhost:3700/api/note/' + this.state.id_nota, this.state.tokenCfg)
            this.setState({
                redirect: true
            });
        };
    };


    render() {

        if (this.state.redirect) {
            return (
                <Redirect to="/notes" />
            );
        } else {
            return (
                <div className="container">

                    <div className="note-form">
                        <h2 className="note-form-header">{this.props.title}</h2>
                        <form className="note-form-container" onSubmit={this.onSubmit}>
                            <p>
                                <input
                                    type="text"
                                    name="titulo"
                                    placeholder="Title"
                                    value={this.state.titulo}
                                    onChange={this.inputHandle}
                                    required
                                />
                            </p>

                            <p>
                                <textarea
                                    name="contenido"
                                    placeholder="Content"
                                    value={this.state.contenido}
                                    onChange={this.inputHandle}
                                    required
                                />
                            </p>

                            <p className="flex">
                                <input className="btn" type="submit" value="SAVE" />
                                <button className="btn red" type="button" style={{ display: this.state.displayBtn }} onClick={this.deleteNote}>DELETE</button>
                            </p>


                        </form></div></div>

            );
        };

    };
};
