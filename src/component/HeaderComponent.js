import React, { Component } from 'react';
import logo from './../logo.svg';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false,
            isAuthenticated: props.isAuthenticated
        };
    }
    componentDidMount() {
        let navigation;
        window.addEventListener('scroll', (event) => {
            if (window.pageYOffset >= 1) {
                navigation = 'fixed-navigation'
            } else {
                navigation = 'normal'
            }
            this.setState({
                activeClass: navigation
            })
        });
    }

    render() {
        let isLogin = localStorage.getItem('isLogin');
        if (isLogin === '1') {
            return <AuthHeader />
        }
        else {
            return <NorMalHeader />
        }
    }
}
export default Header;


class NorMalHeader extends React.Component {
    render() {
        return (
            <React.Fragment>
                <header>
                    <nav className="navbar navbar-expand-md fixed-top navbar-fixed-top clearfix navbar-dark App-header-navigation">
                        <div className="container-fluid">
                            <Link to='/' className="navbar-brand navbar-link">
                                <img src={logo} className="App-logo" alt="logo" />
                            </Link>
                            <div className="justify-content-end">
                                <div className="collapse navbar-collapse" id="myNavbar">
                                    <ul className="nav navbar-nav navbar-right page__nav__menu page__nav__menu__parent " >
                                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="/page">Page</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="/products">Product</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </React.Fragment>
        )
    }
}

class AuthHeader extends React.Component {
    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('isLogin');
        localStorage.removeItem('user');
        window.location.href = '/login';
        
    }
    
    render() {
        return (
            <React.Fragment>
                <header className="app__auth__header">
                    <div className="justify-content-end">
                        <div className="navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right page__nav__menu page__nav__menu__parent" >
                                <li className="nav-item"><Link className="nav-link" to="/login" onClick={this.handleLogout}>Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </header>
                <aside className="app__sidebar">
                    <div className="admin-logo">
                        <a href="/admin">
                            <img src={logo} className="img-responsive App-logo" alt="admin" />
                        </a>
                    </div>
                    <Sidebar />
                </aside>
            </React.Fragment>
        )
    }
}