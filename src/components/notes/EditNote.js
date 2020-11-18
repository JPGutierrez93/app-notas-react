import React, { Component } from 'react';

import NoteForm from './NoteForm';


export default class CreateNote extends Component {

    state = {
        title: 'EDIT NOTE',
        fromCreate: false,
        tokenCfg: {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    };

    

    render() {
        return (
            <>
                <NoteForm 
                    fromCreate={this.state.fromCreate} 
                    title={ this.state.title }
                    noteId={ this.props.match.params.id }
                    />
            </>
        );
    };
};
