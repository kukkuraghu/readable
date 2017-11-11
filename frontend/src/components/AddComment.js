import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../actions';
import _ from 'lodash-uuid'; //to generate unique id for the new comment
import FormField from './FormField';

/**
**AddComment component renders the form to create a new comment.
**  Props
**      postId - id of the post to which the comment to be added
**      onCancel - The function to be called when the cancel button is clicked.
**      onSave - the function to be called when the save button is called.
**/
class AddComment extends Component {
    constructor(props) {
        console.log('AddComment Constructor props: ', props);
        super(props);
        this.currentComment = {};
        this.currentComment.id = _.uuid(); //uniques id for the comment
        this.currentComment.body = '';
        this.currentComment.author = '';
        this.currentComment.parentId = this.props.postId; //sets the parent post id

        //state will hold the comment fields, as it gets edited.
        this.state = {
            currentComment: this.currentComment
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
        this.setState({currentComment: {
            ...this.state.currentComment,
            [name] : value
        }});
    }

    /**
    **Called when the cancel button is clicked.
    **/
    cancelComment = (event) => {
        event.preventDefault();//prevent the default form cancel event handling
        this.props.onCancel(); //calls the onCancel function passed as the prop.
    }

    /**
    **Called when the save button is clicked.
    **/
    saveComment = (event) => {
        event.preventDefault(); //prevent the default form save event handling

        const newComment = {
            ...this.state.currentComment,
            timestamp : Date.now() // add time stamp
        };

        //add the post
        this.props.dispatch(addComment(newComment));
        this.props.onSave(); //calls the onSave function passed as the prop.
    }

    render() {
        console.log('AddComment render props: ', this.props);
        console.log('AddComment render state: ', this.state);
        return (
            <div>
                <form>
                    <FormField
                        label="Comment Body"
                        id="commentBody"
                        name="body"
                        value={this.state.currentComment.body}
                        placeholder="Enter comment body"
                        handleFieldChange={this.handleInputChange}
                    />
                    <FormField
                        label="Author"
                        id="commentAuthor"
                        name="author"
                        value={this.state.currentComment.author}
                        placeholder="Author"
                        handleFieldChange={this.handleInputChange}
                    />
                    <div className="text-center">
                        <button  className="btn btn-primary mt-3" onClick={this.saveComment}>Save</button>
                        <button  className="btn btn-primary mt-3 ml-3" onClick={this.cancelComment}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(connect()(AddComment));