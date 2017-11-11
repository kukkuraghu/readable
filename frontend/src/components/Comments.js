import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import AddComment  from './AddComment';
import EditComment  from './EditComment';
import { upVoteComment, downVoteComment, deleteComment } from '../actions';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';
import MdDelete from 'react-icons/lib/md/delete';

/**
**  Comments component lists the comments for a post
**  Props
**      postId - the post id  of the post for which comments are listed
**  It has provisions for upvote, downvote, edit and delete a comment.
**  Also the users can add a new comment.
**  It uses modals to add and edit comments.
**/
class Comments extends Component {
    constructor(props) {
        super(props);

        //this.editedComment is used to pass the comment information to EditComment component
        this.editedComment = null;

        //state is initialized with two switches for AddComment and Edit Comment
        this.state = {
            addCommentModalOpen: false,
            editCommentModalOpen: false
        };
    }

    /**
    **Set the switch on for the Add Comment modal
    **/
    openAddCommentModal = () => {
        this.setState(() => ({
            addCommentModalOpen: true
        }))
    }

    /**
    **Set the switch on for the Edit Comment modal
    **/
    openEditCommentModal = () => {
        this.setState(() => ({
            editCommentModalOpen: true
        }))
    }

    /**
    **Set the switch off for the Add Comment modal
    **/
    closeAddCommentModal = () => {
        this.setState(() => ({
          addCommentModalOpen: false
        }))
    }

    /**
    **Set the switch off for the Edit Comment modal
    **/
    closeEditCommentModal = () => {
        this.setState(() => ({
          editCommentModalOpen: false
        }))
    }

    /**
    **Deletes the comment
    **/
    deleteComment = (comment) => {
        this.props.dispatch(deleteComment(comment))
    };

    render() {
        const { addCommentModalOpen, editCommentModalOpen} = this.state;
        const { postId, comments } = this.props;
        //filter the comments to include only the comments for the selectedPost.
        //also sort the comments on voteScore (Descending).
        const postComments = comments.filter(comment => comment.parentId === postId).sort((comment1, comment2) => comment2.voteScore - comment1.voteScore);

        return (
            <div>
                <div className="container-fluid">
                    <div className = "row">
                        <div className="col">
                        </div>
                        <div className="col">
                            <h4>Comments</h4>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
                <div className="list-group">
                    {
                        postComments.map(comment => (
                            <div key={comment.id} className="list-group-item  flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                  <small>{new Date(comment.timestamp).toString()}</small>
                                </div>
                                <p className="mb-1 text-left">{comment.body}</p>
                                <div className="row">
                                    <div className="col text-left">
                                        <small className="mb-1">Author: {comment.author}</small>
                                    </div>
                                    <div className="col">
                                        <small>votes: {comment.voteScore}</small>
                                        <FaThumbsUp size={20} onClick={() => this.props.dispatch(upVoteComment(comment.id))} className="ml-2 cursorPointer"/>
                                        <FaThumbsDown size={20} onClick={() => this.props.dispatch(downVoteComment(comment.id))} className="ml-2 cursorPointer"/>
                                    </div>
                                    <div className="col">
                                        <FaEdit
                                            size={20}
                                            className="ml-1 cursorPointer"
                                            onClick={ () => {
                                                this.editedComment = comment;
                                                this.openEditCommentModal();
                                            }}
                                        />
                                        <MdDelete size={20} className="ml-1 cursorPointer" onClick={() => this.deleteComment(comment.id)}/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button
                    className="mt-2"
                    onClick={this.openAddCommentModal}
                >
                    Add Comment
                </button>
                <Modal
                    className='my-modal'
                    overlayClassName='my-overlay'
                    isOpen={addCommentModalOpen}
                    onRequestClose={this.closeAddCommentModal}
                    contentLabel='Modal'
                >
                    <AddComment
                        postId={postId}
                        onSave={() => {this.closeAddCommentModal()}}
                        onCancel={() => {this.closeAddCommentModal()}}
                    />
                </Modal>
                <Modal
                    className='my-modal'
                    overlayClassName='my-overlay'
                    isOpen={editCommentModalOpen}
                    onRequestClose={this.closeEditCommentModal}
                    contentLabel='Modal'
                >
                    <EditComment
                        comment={this.editedComment}
                        onUpdate={() => {this.closeEditCommentModal()}}
                        onCancel={() => {this.closeEditCommentModal()}}
                    />
                </Modal>
            </div>
        )
    }
}

function mapStateToProps({ comments }) {
    console.log('Comments mapStateToProps comments: ', comments);
    return {
        comments
    }
}
export default withRouter(connect(mapStateToProps)(Comments));