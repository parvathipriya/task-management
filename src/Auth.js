import React, { Component } from 'react';
import axios from 'axios';
import './Auth.css';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: true,
            username: '',
            email: '',
            password: '',
            errorMessage: '',
            isAuthenticated: false,
        };
    }

    componentDidMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');

        if (reloadCount === 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload(true);
        } else {
            sessionStorage.removeItem('reloadCount');
        }
    }

    switchModeHandler = () => {
        this.setState((prevState) => {
            return { isLogin: !prevState.isLogin };
        });

        this.setState({ errorMessage: '' });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.isLogin) {
            // Handle login submission
            const { email, password } = this.state;
            axios
                .post('http://127.0.0.1:8000/api/login', { email, password }) // Replace with your API endpoint
                .then((response) => {
                    console.log(response, 'response')
                    const isLoggedIn = true;
                    sessionStorage.setItem("users", response.data.user.id);

                    this.props.history.push('/tasks', { isLoggedIn });
                    window.location.reload();
                })
                .catch((error) => {
                    // Handle login error
                    this.setState({ errorMessage: 'Login failed. Please check your credentials.', isAuthenticated: false });
                    sessionStorage.setItem("users", '');
                    console.error('Login error:', error);
                    // window.location.reload();
                });
        } else {
            // Handle signup submission
            const { username, email, password } = this.state;
            axios
                .post('http://127.0.0.1:8000/api/signup', { username, email, password }) // Replace with your API endpoint
                .then((response) => {
                    // Handle successful signup
                    this.props.history.push('/login');
                    window.location.reload();
                })
                .catch((error) => {
                    if (error.response.data.error.username) {
                        this.setState({ errorMessage: error.response.data.error.username[0] });
                    } else if (error.response.data.error.email) {
                        this.setState({ errorMessage: error.response.data.error.email[0] });
                    } else if (error.response.data.error.password) {
                        this.setState({ errorMessage: error.response.data.error.password[0] });
                    } else {
                        this.setState({ errorMessage: 'Signup failed. Please try again.' });
                    }

                    console.log(error, 'error')
                    // Handle signup error

                    console.error('Signup error:', error);
                });
        }
    };

    render() {
        return (
            <div className="auth">
                <h1>{this.state.isLogin ? 'Login' : 'Sign Up'}</h1>
                {this.state.errorMessage && (
                    <div className="error-message">{this.state.errorMessage}</div>
                )}
                <form onSubmit={this.handleSubmit}>
                    {!this.state.isLogin && (
                        <div className="form-control">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={this.state.username}
                                onChange={(event) =>
                                    this.setState({ username: event.target.value })
                                }
                            />
                        </div>
                    )}
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={this.state.email}
                            onChange={(event) =>
                                this.setState({ email: event.target.value })
                            }
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={(event) =>
                                this.setState({ password: event.target.value })
                            }
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">
                            {this.state.isLogin ? 'Login' : 'Sign Up'}
                        </button>
                        <button type="button" onClick={this.switchModeHandler}>
                            Switch to {this.state.isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Auth;