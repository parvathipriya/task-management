import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Logout extends Component {

    componentDidMount() {

        sessionStorage.setItem('users', '');
        const reloadCount = sessionStorage.getItem('reloadCount');

        if (reloadCount === 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.setItem('reloadCount', 1);
        }
    }

    render() {
        return (
            <header>
                <h1>Successfully Logged out!</h1>
                <p>Login here <Link to="/login">login</Link></p>
            </header>
        );
    }
}

export default Logout;