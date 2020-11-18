import React, { Component } from 'react';
import NoteForm from './NoteForm';

export default class CreateNote extends Component {

    state = {
        title: 'NEW NOTE',
        fromCreate: true
    };

    render() {
        return (
            <>
                <NoteForm 
                fromCreate={this.state.fromCreate} 
                title={ this.state.title }
                noteId='undefined'
                />
            </>
        );
    };
};
