import React, { Component } from 'react'

import MyButton from './MyButton';

export default class EditCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.currentCategoryObj.name,
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
        if (this.props.editCategory && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.toggleEditCategory(false)
        }
    }

    handleCategorySubmit() {
        if (this.props.currentCategoryObj.name !== this.state.title) {
            this.props.updateCategory(this.props.currentCategoryObj.id,this.state.title,this.props.currentCategoryObj.children,this.props.currentCategoryObj.bookmarkorder,this.props.currentCategoryObj.order,this.props.currentCategoryObj.categoryloc)
            .then( () => this.props.updateCategoryInfo(this.state.title))
        }
    }

  render() {
    return (
    <div className= "not-hidden modal-bg">
        <div className="my-modal form-modal" ref={this.setWrapperRef}>
            <h2>Edit Category</h2>
            <form className="signup-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input className= "form-control" name= "title" type="text" onChange={this.onChange} value={this.state.title}/>
                </div>
            </form>
            <div className="align-center">
                <MyButton myStyle="btn btn-primary btn-lg fixed-size" text="Submit" onClick={() => this.handleCategorySubmit()}/>
            </div>
        </div>
    </div>
    )
  }
}
