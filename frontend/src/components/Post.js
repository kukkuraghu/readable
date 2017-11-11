import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';

import Comments  from './Comments';
import FormField from './FormField';
import { upVotePost, downVotePost, deletePost } from '../actions';
import EditPost  from './EditPost';

/**
**Post component renders the post in detail.
**  Props
**      postId - the post id  of the post.
**  It uses the Comments component to render the comments associated with the post.
**  It has a provision to add and delete a post.
**  The user can upVote/downVote the post
**  It uses a modal to edit the post. The modal uses the component EditPost
**/
class Post extends Component {
    constructor(props) {
        console.log('Post Constructor props: ', props);
        super(props);

        //pick the current post id from the path param "id".
        this.currentPostId = this.props.postId;

        //get the current post detail from this.props.posts
        this.currentPost = this.props.posts.find(item => item.id === this.currentPostId);

        //Initializes the state.
        //currentPost will hold the current post detail.
        //modalEditPostOpen - switch for the edit post modal
        this.state = {
            currentPost: this.currentPost,
            modalEditPostOpen: false
        }
    }

    /**
    **  Updates the state with the current post
    **/
    componentWillReceiveProps(nextProps) {
        //get the current post detail from nextProps.posts
        this.currentPost = nextProps.posts.find(item => item.id === this.currentPostId);

        //set the state with the current post
        this.setState({currentPost: this.currentPost});
    }

    /**
    **  Switches on the edit post modal.
    **/
    editPost = (event) => {
        //call preventDefault to avoid auto form submission
        event.preventDefault();
        this.setState({modalEditPostOpen: true});
    };

    /**
    **  Deletes the post.
    **/
    deletePost = (event) => {
        //call preventDefault to avoid auto form submission
        event.preventDefault();
        //delete the post
        this.props.dispatch(deletePost(this.currentPostId));
        //the current post is deleted. Go back to the previous page
        this.props.history.goBack();
    }

    /**
    **  Switches off the edit post modal.
    **/
    closeEditPostModal = () => this.setState({modalEditPostOpen: false});

    render() {
        console.log('Post render props: ', this.props);
        console.log('Post render state: ', this.state);
        const { modalEditPostOpen } = this.state;
        return (
            <div>
                <form>
                    <br></br>
                    <FormField
                        label="Category"
                        id="postAuthor"
                        name="category"
                        value={this.state.currentPost.category}
                        disabled={true}
                    />
                    <FormField
                        label="Post Title"
                        id="postTitle"
                        name="title"
                        value={this.state.currentPost.title}
                        disabled={true}
                    />
                    <FormField
                        fieldType="textarea"
                        label="Post Body"
                        id="postBody"
                        name="body"
                        value={this.state.currentPost.body}
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
                    <div>
                        <small>votes: {this.state.currentPost.voteScore}</small>
                        <FaThumbsUp size={20}  className="ml-2 cursorPointer" onClick={(event) => this.props.dispatch(upVotePost(this.state.currentPost.id))}/>
                        <FaThumbsDown size={20}  className="ml-2 cursorPointer" onClick={() => this.props.dispatch(downVotePost(this.state.currentPost.id))}/>
                        <small className="ml-3">{this.state.currentPost.commentCount} comments</small>
                    </div>

                  <button  className="btn btn-primary mt-3" onClick={this.editPost}>Edit</button>
                  <button  className="btn btn-primary mt-3 ml-2" onClick={this.deletePost}>Delete</button>
                </form>
                <Comments
                    postId={this.currentPostId}
                />


                <Modal
                    className='my-modal'
                    overlayClassName='my-overlay'
                    isOpen={modalEditPostOpen}
                    onRequestClose={this.closeEditPostModal}
                    contentLabel='Modal'
                    shouldCloseOnOverlayClick={true}
                >
                    {modalEditPostOpen &&
                        (<EditPost
                            post={{...this.state.currentPost}}
                            onCancel={this.closeEditPostModal}
                            onUpdate={this.closeEditPostModal}
                        />)
                    }
                </Modal>
            </div>
        )
    }
}
function mapStateToProps({ posts }) {
    return {
        posts
    }
}
export default withRouter(connect(mapStateToProps)(Post));