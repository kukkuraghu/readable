import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePost } from '../actions';
import FormField from './FormField';

/**
**EditPost component renders the form to edit a  post.
**  Props
**      post - The post to be edited/
**      onCancel - The function to be called when the cancel button is clicked.
**      onUpdate - the function to be called when the save button is called.
**/
class EditPost extends Component {
    constructor(props) {
        console.log('EditPost Constructor props: ', props);
        super(props);

        //state will hold the post fields, as it gets edited.
        this.state = {
            currentPost: this.props.post
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
        event.preventDefault();
        this.props.onCancel()
    }

    /**
    **Called when the save button clicked.
    **/
    savePost = (event) => {
        event.preventDefault(); //prevent the default form submit event handling

        //update the post if the body or title changed
        if (this.state.currentPost.body !== this.props.post.body || this.state.currentPost.title !== this.props.post.title) {
            this.props.dispatch(updatePost(this.state.currentPost));
        }

        this.props.onUpdate();//calls the onUpdate function passed as the prop.
    }

    render() {
        console.log('EditPost render props: ', this.props);
        console.log('EditPost render state: ', this.state);
        return (
            <div>
                <form>
                    <FormField
                        label="Category"
                        id="postAuthor"
                        name="author"
                        value={this.props.post.category}
                        disabled={true}
                    />
                    <FormField
                        label="Author"
                        id="postAuthor"
                        name="author"
                        value={this.state.currentPost.author}
                        placeholder="Author"
                        disabled={true}
                    />
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
                    <div className="text-center">
                        <button  className="btn btn-primary mt-3" onClick={this.savePost}>Save</button>
                        <button  className="btn btn-primary mt-3 ml-3" onClick={this.cancelPost}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(connect()(EditPost));