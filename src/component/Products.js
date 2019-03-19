import React, { Component } from 'react';
import Loader from 'react-loaders'
import axios from 'axios';
import API_URL from './../constants/index';
import { Link } from 'react-router-dom';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            isLoaded: false,
            productId: this.props.id || ''
        }
    }
    componentDidMount() {
        let url = API_URL.productPageURL + this.state.productId + "?_embed"
        this.state.productId ? (
            axios.get(url)
                .then(res => {
                    this.setState({
                        products: res.data
                    })
                    //console.log(this.state.products);
                })

                .catch(function (error) {
                    console.log(error);
                })

        ) : (
                axios.get(API_URL.pageURL)
                    .then(res => {
                        this.setState({ products: res.data, isLoaded: true })
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            )


    }
    render() {
        return (

            <React.Fragment>
                {this.state.productId ? (
                    <div className="">
                        <h1>Product ID{this.state.products.date}</h1>
                    </div>
                ) : (
                        <div className="">
                            <div className="App-container container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <ul className="App-grid row">
                                            {this.state.products && this.state.products.map((item, i) => (
                                                <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={i} id={"product-" + item.id}>
                                                    <div className="App-card">
                                                        <div className="App-card-body">
                                                            <div className="App-card-header">
                                                                <img src={item._embedded['wp:featuredmedia'][0].media_details && item._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url} alt={item.title.rendered} />
                                                            </div>
                                                            <div className="App-card-content">
                                                                <h5 className="card-title">{item.title.rendered}</h5>
                                                                <p className="card-text" dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}></p>
                                                            </div>
                                                            <div className="App-card-footer">
                                                                <Link to={"/product/" + item.id} className="btn btn-primary">GO TO PRODUCT</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
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