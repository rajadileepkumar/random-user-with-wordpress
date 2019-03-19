import React, { Component } from 'react';
import logo from './../logo.svg';
import { Link } from 'react-router-dom';
class Footer extends Component {

    render() {
        let isLogin = localStorage.getItem('isLogin');
        if (isLogin === '1') {
            return <AuthFooter />
        }
        else {
            return <NormalFooter />
        }
    }

}
export default Footer;

class NormalFooter extends React.Component {
    render() {
        return (
            <footer className="App-footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="App-footer-content col-md-12">
                            <div className="row">
                                <div className="col-md-6 App-footer-left">
                                    <Link to="/">
                                        <img src={logo} className="" alt="logo" width="50px" />
                                    </Link>
                                </div>
                                <div className="col-md-6 App-footer-right">
                                    <p className="App-copyright">Proudly powered by React</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

class AuthFooter extends React.Component {
    render() {
        return (
            <footer className="App-footer app__auth__footer">
                <div className="container">
                    <div className="row">
                        <div className="App-footer-content col-md-12">
                            <div className="row">
                                <div className="col-md-6 App-footer-left">
                                    <Link to="/">
                                        <img src={logo} className="" alt="logo" width="50px" />
                                    </Link>
                                </div>
                                <div className="col-md-6 App-footer-right">
                                    <p className="App-copyright">Proudly powered by React</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}