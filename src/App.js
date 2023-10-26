import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Auth from './Auth';
import Logout from './Logout';
import TaskManager from './TaskManager';
import './Menu.css';


class Header extends Component {
  render() {
    return (
      <header>
        <h1>Task Management System</h1>
      </header>
    );
  }
}

class NavigationMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }



  render() {

    const { isLoggedIn } = this.props;
    console.log(isLoggedIn, 'isLoggedInisLoggedIn')
    return (
      <Router>
        <div>
          <nav className="menu">
            <ul className="menu-list">
              {isLoggedIn ? (
                <li className="menu-item"> <Link to="/logout" >Logout</Link></li>
              ) : (<li className="menu-item"><Link to="/login" >Login/Signup</Link></li>)}
              <li className="menu-item">
                <Link to="/tasks">Tasks</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/tasks" component={TaskManager} />
            <Route path="/login" component={Auth} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </Router>
    );
  }
}


class Footer extends Component {
  render() {
    return (
      <footer>
        <p>&copy; 2023 My Task Management</p>
      </footer>
    );
  }
}

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const storedData = sessionStorage.getItem('users');

    const reloadCount = sessionStorage.getItem('reloadCount');

    if (storedData) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }

    if (reloadCount === 1) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div className="app-container">
        <Header />
        <NavigationMenu isLoggedIn={isLoggedIn} />
        <main>

        </main >
        <Footer />
      </div >
    );
  }
}

export default App;