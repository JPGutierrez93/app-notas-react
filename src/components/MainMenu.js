import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class MainMenu extends Component {

    state = {
        loggedIn: false,
        nombre: ''
    };

    componentDidMount() {

        if (localStorage.getItem('nombre')) {

            this.setState({
                nombre: localStorage.getItem('nombre'),
                loggedIn: true
            });
        };
    };

    logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    render() {
        if (this.state.loggedIn) {
            return (
                <>
                    <div className="navbar">

                        <div className="navbar-left">
                            <Link className="navbar-link navbar-logo" to="/notes" >☺</Link>
                            <Link className="navbar-link" to="/notes" >Note List</Link>
                            <Link className="navbar-link" to="/create" >Create Note</Link>
                        </div>

                        <div className="navbar-right">

                            <p className="navbar-link" > Hello {this.state.nombre}!</p>
                            <button
                                className="navbar-link btn-logout"
                                onClick={this.logout}
                            >Log Out
                            </button>
                        </div>
                    </div>
                </>
            )
        } else {
            return <>
                <div className="navbar">

                    <div className="navbar-left">
                        <p className="navbar-link navbar-logo">☺</p>
                    </div>


                    <div className="navbar-right">

                        <Link className="navbar-link" to="/signup" >Sign Up </Link>
                        <Link className="navbar-link" to="/login" >Log In</Link>
                    </div>
                </div>
            </>
        };
    };
};
