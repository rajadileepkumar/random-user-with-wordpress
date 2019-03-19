import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import Profile from './admin/Profile';
import Users from './admin/Users';

const routes = [
    {
        path: "/",
        exact: true,
        //sidebar: () => <div>home!</div>,
        main: () => <h2>Home</h2>
    },
    {
        path: "/bubblegum",
        //sidebar: () => <div>bubblegum!</div>,
        main: () => <Users />
    },
    {
        path: "/shoelaces",
        //sidebar: () => <div>shoelaces!</div>,
        main: () => <Profile />
    }
];


export default class Sidebar extends Component {

    render() {
        var roles = JSON.parse(localStorage.getItem('user'));
        return (
            <div>
                <ul className="app__sidebar__navigation">
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link">Dashboard</Link>
                    </li>
                    {roles.role && roles.role[0] === 'administrator' ? <li className="nav-item">
                        <Link to="/users" className="nav-link">User</Link>
                    </li> : ''}

                    <li className="nav-item">
                        <Link to={"/profile/" + roles.userID} className="nav-link">Profile</Link>
                    </li>
                </ul>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.sidebar}
                    />
                ))}

                <div style={{ flex: 1, padding: "10px" }}>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                        />
                    ))}
                </div>
            </div>
        )
    }
}