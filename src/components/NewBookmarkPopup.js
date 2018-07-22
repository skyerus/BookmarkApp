import React, { Component } from 'react'

import MyButton from './MyButton';

export default class NewBookmarkPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            link:"",
            category: "",
            about: ""
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        }
    
    onChange(e) {
        this.setState( {[e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
    if (this.props.newBookmarkPopup && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.props.toggleNewBookmarkPopup(false)
    }
    }

    render() {
    return (
    <div className= "not-hidden modal-bg">
        <div className="my-modal form-modal" ref={this.setWrapperRef}>
            <h2>New Bookmark</h2>
            <form className="signup-form">
                <div className="form-group">
                    <label>Title:</label>
                    <input className= "form-control" name= "title" type="text" onChange={this.onChange} value={this.state.title}/>
                </div>
                <div className="form-group">
                    <label>Link:</label>
                    <input className="form-control" name="link" type="text" onChange={this.onChange} value={this.state.link}/>
                </div>
                <div className="form-group">
                    <label className="display-block">Category: <i className="small-italics float-right">(optional)</i></label>
                    <input className= "form-control" name= "category" type="text" onChange={this.onChange} value={this.state.category}/>
                </div>
                <div className="form-group">
                    <label className="display-block">About: <i className="small-italics float-right">(optional)</i></label>
                    <textarea className= "form-control" name="about" onChange={this.onChange} value={this.state.about}></textarea>
                </div>
            </form>
            <div className="align-center">
                <MyButton myStyle="btn btn-primary btn-lg fixed-size" text="Create" onClick={this.handleSubmit}/>
            </div>
        </div>
    </div>
    )
  }
}
