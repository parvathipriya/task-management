import React, { Component } from 'react';

class HomeComponent extends Component {
    render() {
        return (
            <div>
                <h2>Home Page</h2>
                <p>Welcome to the Home page.</p>
            </div>
        );
    }
}

class AboutComponent extends Component {
    render() {
        return (
            <div>
                <h2>About Page</h2>
                <p>Learn more about us on the About page.</p>
            </div>
        );
    }
}

class ContactComponent extends Component {
    render() {
        return (
            <div>
                <h2>Contact Page</h2>
                <p>Contact us on the Contact page.</p>
            </div>
        );
    }
}

export { HomeComponent, AboutComponent, ContactComponent };