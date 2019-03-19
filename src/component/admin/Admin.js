import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: [],
        }
    }
    render() {
        var roles = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="wrapper-body">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Users</h5>
                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        <Link to="/users" className="btn btn-primary">Go somewhere</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Profile</h5>
                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        <Link to={"/profile/"+roles.userID} className="btn btn-primary">Go somewhere</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}