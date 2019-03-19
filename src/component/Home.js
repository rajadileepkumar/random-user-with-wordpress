import React, { Component } from 'react';
import Loader from 'react-loaders'

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false,

        };
    }
    componentDidMount() {
        fetch('https://randomuser.me/api/?results=12')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
    }
    render() {

        return (
            <React.Fragment>
                {this.state.isLoaded === false ? (<Loader type="line-scale" />) : (
                    <div className="App">
                        <div className="App-container container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ul className="App-grid row">
                                        {this.state.items && this.state.items.results ? this.state.items.results.map(item => (
                                            <li className="col-md-4 App-card" key={item.email} id={item.login.uuid}>
                                                <div className="App-card-body">
                                                    <div className="App-card-header">
                                                        <img alt={item.name.first + item.name.last} src={item.picture.large} className="img-responsive center-block img-circle" />
                                                    </div>
                                                    <div className="App-card-content">
                                                        <h2>{item.name.first + " " + item.name.last}</h2>
                                                        <span><i className="glyphicon glyphicon-envelope"></i>{item.email}</span>
                                                    </div>
                                                    <div className="App-card-footer">
                                                        <p><i className="glyphicon glyphicon-phone-alt"></i>{item.phone}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        )) : ''}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )

                }
            </React.Fragment>


        );
    }
}