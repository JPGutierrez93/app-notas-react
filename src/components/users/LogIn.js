import React, { Component } from 'react';
import UserForm from './UserForm';

export default class LogIn extends Component {
    
    state = {
        title: 'Log In'
    };
    
    render() {
        return (
            <div>
                <UserForm title={this.state.title} isLogIn={false} display='none'/>
            </div>
        );
    };
}
 