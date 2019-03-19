import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData:[],
            userName:'',
            Password:'',
            fireRedirect: false,
            isLoginIn:false,
            error:false,
        }
    }

    handlePassword = (e) => {
        this.setState({
            Password:e.target.value
        })
    }

    handleUserName = (e) => {
        this.setState({
            userName:e.target.value
        })
    }

    handleValidateUser = (e) => {
        axios({
            method: 'POST',
            url: 'http://192.168.0.245/lwi.shop.com/wp-json/users/v2/user',
            data: {
                userName: this.state.userName,
                Password: this.state.Password,
            }
        }).then(response => {
            if(response.data.data && response.data.data.user_login ){
                this.setState({
                    userData:response.data,
                    isLoginIn:true
                })
                
            }else{
                this.setState({
                    error:true,
                    userData:response.data
                })
            }
        })
    }

    render() {
        if(this.state.isLoginIn === true){
            this.props.loginAuthenticate()
            let user = {'userID':this.state.userData.ID,'role':this.state.userData.roles}
            localStorage.setItem('isLogin',1);
            localStorage.setItem('user',JSON.stringify(user));
            return <Redirect to={{
                pathname: '/admin',
            }}/>
        }
        return (
            <div className="header__full__width">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                       
                            <form method="get">
                            <div className="col-md-4">
                                <label>Username</label>
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control" name="userName" id="userName" value={this.state.userName} onChange={this.handleUserName}/>
                            </div>
                            <div className="col-md-4">
                                <label>Password</label>
                            </div>
                            <div className="col-md-4">
                                <input type="password" className="form-control" name="password" id="password" value={this.state.password} onChange={this.handlePassword} />
                            </div>
                            <div className="col-md-4">
                                <input type="button" name="login" id="login" onClick={this.handleValidateUser} className="btn btn-primary" value="Login"/>
                            </div>
                            </form>
                            {this.state.error?
                                <p className="text-danger">{this.state.userData}</p> : ''}
                            
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}