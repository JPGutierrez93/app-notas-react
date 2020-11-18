import React, { Component } from 'react';
import UserForm from './UserForm';

export default class signup extends Component {

    state = {
        title: 'Sign Up'
    };

    render() {
        return (
            <div>
                <UserForm title={this.state.title} isLogIn={true}/>
            </div>
        );
    };
};
