import React, { Component } from 'react'

import MyButton from './MyButton';

export default class EditCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.bookmarkToEdit.title,
            link: this.props.bookmarkToEdit.link,
            about: this.props.bookmarkToEdit.about
        };

        this.onChange = this.onChange.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        // this.handleCategorySubmit= this.handleCategorySubmit.bind(this);
        }

    onChange(e) {
        this.setState( {[e.target.name]: e.target.value })
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.props.editBookmark && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.toggleEditBookmark(false, 0, "", "", "", 0)
        }
    }

    handleBookmarkSubmit() {
        if (this.props.bookmarkToEdit.title !== this.state.title || this.props.bookmarkToEdit.about !== this.state.about || this.props.bookmarkToEdit.link !== this.state.link) {
            this.props.updateBookmark(this.props.bookmarkToEdit.id,this.state.title,this.state.about,this.state.link)
            .then( () => this.props.updateBookmarkInfo(this.state.title, this.state.about, this.state.link, this.props.bookmarkToEdit.index))
        }
    }

  render() {
    return (
    <div className= "not-hidden modal-bg">
        <div className="my-modal form-modal" ref={this.setWrapperRef}>
            <h2>Edit Bookmark</h2>
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
                    <label className="display-block">About: <i className="small-italics float-right">(optional)</i></label>
                    <textarea className= "form-control" name="about" onChange={this.onChange} value={this.state.about}></textarea>
                </div>
            </form>
            <div className="align-center">
                <MyButton myStyle="btn btn-primary btn-lg fixed-size" text="Submit" onClick={() => this.handleBookmarkSubmit()}/>
            </div>
        </div>
    </div>
    )
  }
}
