import React, { Component } from 'react';
import axios from 'axios';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('userID'),
            userData: {
                data: {
                    user_login: '',
                    user_pass:'',
                }

            },
            roles:'',
            ID: this.props.id || '',
        }
    }

    componentDidMount() {
        axios.get('http://192.168.0.245/lwi.shop.com/wp-json/user/v2/user/', {
            params: {
                userId: this.state.ID
            }
        })
            .then(res => {
                this.setState({
                    userData: res.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    handleChangeUserLogin(event) {
        this.setState({ value: event.target.value });
    }
    handleChangePassword(event){
        this.setState({value:event.target.value})
    }
    handleSubmitUser(e){
        e.preventDefault();
    }
    render() {
        return (
            <div className="wrapper-body">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="row">
                            <div className="col-md-4">
                                <label>User Login</label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" value={this.state.userData.data.user_login} onChange={this.handleChangeUserLogin}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <label>Password</label>
                            </div>
                            <div className="col-md-8">
                                <input type="password" className="form-control" value={this.state.userData.data.user_pass} onChange={this.handleChangePassword}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="submit" name="updateUser" id="updateUser" value="Update" className="btn btn-primary" onClick={this.handleSubmitUser}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}