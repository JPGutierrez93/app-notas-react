import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './UserForm.css'

export default class UserForm extends Component {

    state = {
        nombre: '',
        email: '',
        password: '',
        redirect: false,
        alert: 'none'
    };

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = async e => {
        e.preventDefault();

        let nombre = null;
        let email = this.state.email;
        let password = this.state.password;

        if (this.props.isLogIn) {
            nombre = this.state.nombre;
            await axios.post('http://localhost:3700/api/signup', { nombre, email, password })
            .then(res =>{
                    console.log(res);
                    this.setState({ alert: 'block' });
                    setTimeout(() => this.setState({ redirect: true }), 2000);
                    
            })
            .catch(err => alert('El mail ya está registrado.'));
            

        } else {
            await axios.post('http://localhost:3700/api/login', { email, password })
            .then(res => {
                if(res.data.id){
                    localStorage.setItem('id', res.data.id);
                    localStorage.setItem('nombre', res.data.nombre);
                    localStorage.setItem('token', res.data.token);
                    window.location.replace('/notes');
                }else{
                    alert('Usuario incorrecto o contraseña incorrectaa')

                };
                
            })
            .catch(err => {
                alert('Usuario incorrecto o contraseña incorrecta')
            });
        };

    };


    render() {
        if (this.state.redirect) {
            return <Redirect to="/login" />;
        } else {
            return (
                <div className="container">

                    <div className="login">
                        <div className="login-triangle"></div>
                        <h2 className="login-header">{this.props.title}</h2>
                        <form className="login-container" onSubmit={this.onSubmit}>
                            {/* props pasadas: 
                            display: para ver el input name en Sign up,
                            isLogIn: para ver si esta en loggin o no */}
                            <p style={{ display: this.props.display }}>
                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleInput}
                                    required={this.props.isLogIn}
                                />
                            </p>

                            <p>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleInput}
                                    required
                                />
                            </p>

                            <p>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleInput}
                                    required
                                />
                            </p>

                            <p><input type="submit" value="Sign Up" /></p>


                            <p style={{ display: this.state.alert }} className="alert">
                                <span >Usuario creado con éxito!</span> 
                            </p>


                        </form>



                    </div>
                </div>

            );
        };
    };
};
