import React, { Component } from 'react'

import MyButton from './MyButton';

export default class NewBookmarkPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            about:"",
            link:""
        };

        this.onChange = this.onChange.bind(this);
        this.handleBookmarkSubmit = this.handleBookmarkSubmit.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
        this.handleCategorySubmit= this.handleCategorySubmit.bind(this);
        }
    
    onChange(e) {
        this.setState( {[e.target.name]: e.target.value })
    }

    handleBookmarkSubmit() {
        this.props.createBookmark(this.state.title,this.state.about,this.state.link,this.props.currentCategory,this.props.currentOrderID)  
        .then(() => this.props.updateCategory(this.props.currentCategoryObj.id,this.props.currentCategoryObj.name,this.props.currentCategoryObj.children,this.props.currentCategoryObj.bookmarkorder,this.props.currentCategoryObj.order,this.props.currentCategoryObj.categoryloc) )   
    }

    handleCategorySubmit() {
        this.props.createCategory(this.state.title,this.props.currentCategory,[],[],[],[],this.props.currentOrderID)
        .then(() => this.props.updateCategory(this.props.currentCategoryObj.id,this.props.currentCategoryObj.name,this.props.currentCategoryObj.children,this.props.currentCategoryObj.bookmarkorder,this.props.currentCategoryObj.order,this.props.currentCategoryObj.categoryloc) )
    }

    handleBookmarkClick() {
        this.props.toggleBookmarkForm(true)
        this.props.toggleCategoryForm(false)
    }

    handleCategoryClick() {
        this.props.toggleBookmarkForm(false)
        this.props.toggleCategoryForm(true)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    // componentDidUpdate() {
    //     if (this.props.justCreatedBookmark) {
    //         this.props.updateCategory(this.props.currentCategoryObj.id,this.props.currentCategoryObj.name,this.props.currentCategoryObj.children,this.props.currentCategoryObj.bookmarkorder,this.props.currentCategoryObj.order,this.props.currentCategoryObj.categoryloc)
    //         this.props.justCreatedBookmarkFunc(false)
    //     }
    // }

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
        let form;
        if (this.props.addBookmark) {
            form =  <div className="my-modal form-modal" ref={this.setWrapperRef}>
                        <div className="btn-grid bookmk-btn-container">
                            <button className="bookmk-btn-selected bookmk-btn-left" onClick={this.handleBookmarkClick}>Bookmark</button>
                            <button className="bookmk-btn bookmk-btn-right" onClick={this.handleCategoryClick}>Category</button>
                        </div>
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
                                <label className="display-block">About: <i className="small-italics float-right">(optional)</i></label>
                                <textarea className= "form-control" name="about" onChange={this.onChange} value={this.state.about}></textarea>
                            </div>
                        </form>
                        <div className="align-center">
                            <MyButton myStyle="btn btn-primary btn-lg fixed-size" text="Create" onClick={this.handleBookmarkSubmit} isLoading={this.props.createBookmarkIsLoading}/>
                        </div>
                    </div>
        } else if (this.props.addCategory) {
            form =  <div className="my-modal form-modal" ref={this.setWrapperRef}>
                        <div className="btn-grid bookmk-btn-container">
                            <button className="bookmk-btn bookmk-btn-left" onClick={this.handleBookmarkClick}>Bookmark</button>
                            <button className="bookmk-btn-selected bookmk-btn-right" onClick={this.handleCategoryClick}>Category</button>
                        </div>
                        <h2>New Category</h2>
                        <form className="signup-form">
                            <div className="form-group">
                                <label>Name:</label>
                                <input className= "form-control" name= "title" type="text" onChange={this.onChange} value={this.state.title}/>
                            </div>
                        </form>
                        <div className="align-center">
                            <MyButton myStyle="btn btn-primary btn-lg fixed-size" text="Create" onClick={this.handleCategorySubmit} isLoading={this.props.createCategoryIsLoading}/>
                        </div>
                    </div>
        }
        return (
        <div className= "not-hidden modal-bg">
            {form}
        </div>
    )
  }
}
