import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateComment } from '../actions';
import FormField from './FormField';

/**
**EditComment component renders the form to edit a comment.
**  Props
**      onCancel - The function to be called when the cancel button is clicked.
**      onUpdate - the function to be called when the save button is called.
**/
class EditComment extends Component {
    constructor(props) {
        console.log('EditComment Constructor props: ', props);
        super(props);

        //state will hold the comment fields, as it gets edited.
        this.state = {
            currentComment: this.props.comment
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
        event.preventDefault(); //prevent the default form cancel event handling
        this.props.onCancel() //calls the onCancel function passed as the prop.
    }

    /**
    **Called when the save button is clicked.
    **/
    saveComment = (event) => {
        event.preventDefault();//prevent the default form save event handling

        //update the comment if there is any change
        if (this.state.currentComment.body !== this.props.comment.body) {
            this.props.dispatch(updateComment(this.state.currentComment));
        }

        this.props.onUpdate(); //calls the onUpdate function passed as the prop.
    }

    render() {
        console.log('EditComment render props: ', this.props);
        console.log('EditComment render state: ', this.state);
        return (
            <div>
                <form>
                    <FormField
                        label="Author"
                        id="commentAuthor"
                        name="author"
                        value={this.state.currentComment.author}
                        placeholder="Author"
                        disabled={true}
                    />
                    <FormField
                        label="Comment Body"
                        id="commentBody"
                        name="body"
                        value={this.state.currentComment.body}
                        placeholder="Enter comment body"
                        handleFieldChange = {this.handleInputChange}
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
export default withRouter(connect()(EditComment));