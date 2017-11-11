import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../actions';
import _ from 'lodash-uuid'; //to generate unique id for post
import FormField from './FormField';

/**
**AddPost component renders the form to create a new post.
**  Props
**      category - mentions the category to which the post is added.
**                 If category is not mentioned, the AddPost form will have a drop down to select the category.
**                 If category is mentioned, the new post will be added to the mentioned category.
**      onCancel - The function to be called when the cancel button is clicked.
**      onSave - the function to be called when the save button is called.
**/
class AddPost extends Component {
    constructor(props) {
        console.log('AddPost Constructor props: ', props);
        super(props);
        this.currentPost = {};
        //get a unique id for the new post
        this.currentPost.id = _.uuid();
        this.currentPost.body = '';
        this.currentPost.title = '';
        this.currentPost.author = '';
        this.currentPost.category = this.props.category;

        //state will hold the post fields, as it gets edited.
        this.state = {
            currentPost: this.currentPost
        }
    }

    /**
    **Each form field will have a corresponding field in the state.
    **The field name is same as the name of the form field.
    **/
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({currentPost: {
            ...this.state.currentPost,
            [name] : value
        }});
    }

    /**
    **Called when the cancel button clicked.
    **/
    cancelPost = (event) => {
        event.preventDefault(); //prevent the default form cancel event handling
        this.props.onCancel(); //calls the onCancel function passed as the prop.
    }

    /**
    **Called when the save button clicked.
    **/
    savePost = (event) => {
        event.preventDefault(); //prevent the default form submit event handling
        const newPost = {
            ...this.state.currentPost,
            timestamp : Date.now() //add timestamp to the new post.
        };
        //save the new post
        this.props.dispatch(addPost(newPost));
        this.props.onSave(); //calls the onSave function passed as the prop.
    }

    render() {
        console.log('AddPost render props: ', this.props);
        console.log('AddPost render state: ', this.state);
        return (
            <div>
                <form>
                    {
                        this.props.category ?
                        (
                            <FormField
                                label="Category"
                                id="category"
                                name="category"
                                value={this.props.category}
                                disabled={true}
                            />
                        )
                        :
                        (
                            <FormField
                                fieldType="select"
                                label="Select Category"
                                id="categorySelect"
                                name="category"
                                value={this.state.currentPost.category}
                                options={this.props.categories.map(category => (<option key={category.name}>{category.name}</option>))}
                                placeholder="Enter post body"
                                handleFieldChange={this.handleInputChange}
                            />
                        )
                    }
                    <FormField
                        label="Post Title"
                        id="postTitle"
                        name="title"
                        value={this.state.currentPost.title}
                        placeholder="Enter post title"
                        handleFieldChange={this.handleInputChange}
                    />
                    <FormField
                        fieldType="textarea"
                        label="Post Body"
                        id="postBody"
                        name="body"
                        value={this.state.currentPost.body}
                        placeholder="Enter post body"
                        handleFieldChange={this.handleInputChange}
                    />
                    <FormField
                        label="Author"
                        id="postAuthor"
                        name="author"
                        value={this.state.currentPost.author}
                        placeholder="Author"
                        handleFieldChange={this.handleInputChange}
                    />
                    <div className="text-center">
                        <button  className="btn btn-primary mt-3" onClick={this.savePost}>Save</button>
                        <button  className="btn btn-primary mt-3 ml-3" onClick={this.cancelPost}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}
function mapStateToProps({ categories }) {
    return {
        categories //required for the category dropdown.
    }
}
export default withRouter(connect(mapStateToProps)(AddPost));