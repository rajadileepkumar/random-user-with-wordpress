import React, { Component } from 'react';
import axios from 'axios';

export default class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false,
            title: '',
            content: '',
            author:'',
            hero_image:''

        };
    }

    componentDidMount() {
        fetch('http://192.168.0.245/lwi.shop.com/wp-json/wp/v2/product?_embed')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });

    }
    handleTitleOnchange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    handleAuthor = (e) => {
        this.setState({
            author:e.target.value
        })
    }

    handleImageUpload = (e) => {

        this.setState({
            hero_image:e.target.value
        })
        
    }

    handleClick = () => {
        console.log("title" + this.state.title);
        console.log("content" + this.state.content);
        console.log("Author" + this.state.author);
        console.log('Image' + this.state.hero_image);
        axios({
            method: 'post',
            url: 'http://192.168.0.245/lwi.shop.com/wp-json/contacts/v2/contact',
            data: {
                title: this.state.title,
                content: this.state.content,
                author:this.state.author,
                hero_image:this.state.hero_image,
            }
        }).then(response => {
            console.log(response.data);
        })


    }

    toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
            callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    render() {
        var headerImage = this.state.items && this.state.items.acf && this.state.items.acf.hero_banner_image && this.state.items.acf.hero_banner_image.url;
        return (
            <React.Fragment>

                <div className="header__full__width" style={{ backgroundImage: 'url("' + headerImage + '")' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <h1 className="feature__title__h1">{this.state.items && this.state.items.acf && this.state.items.acf.hero_banner_title}</h1>
                                <p className="feature__tag__line">{this.state.items && this.state.items.acf && this.state.items.acf.hero_banner_tag_line}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-12 col-lg-12">
                                <form method="post">
                                <input type="text" name="title" id="title" onChange={this.handleTitleOnchange} className="form-control" placeholder="Post Title" value={this.state.title} />
                                <input type="text" name="author" id="author" className="form-control" placeholder="Author Name" value={this.state.author} onChange={this.handleAuthor}/>
                                <input type="file" name="hero_image" id="hero_image" className="form-control" onChange={this.handleImageUpload}/>
                                <textarea name="content" id="content" className="form-control" placeholder="Post Content" value={this.state.content} onChange={this.handleContent}></textarea>

                                <button type="button" onClick={this.handleClick}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}