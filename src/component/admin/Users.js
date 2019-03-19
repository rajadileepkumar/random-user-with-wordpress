import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        axios.get('http://192.168.0.245/lwi.shop.com/wp-json/wp/v2/users')
            .then(res => {
                this.setState({ users: res.data })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        return (
            <div className="wrapper-body">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Avatar</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users && this.state.users.map((item, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.name}</td>
                                        <td><img src={item.avatar_urls && item.avatar_urls[48]} alt="userimage"/></td>
                                        <td>
                                            <Link to={'/profile/'+item.id}>Edit</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}