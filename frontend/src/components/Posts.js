import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';
import FaExpand from 'react-icons/lib/fa/expand';
import MdDelete from 'react-icons/lib/md/delete';
import Modal from 'react-modal';
import AddPost from './AddPost';

import { upVotePost, downVotePost, deletePost } from '../actions';

/**
**  Posts component lists the posts
**  Props
**      category - the category for which the posts to be listed. Optional.
**      If a category is mentioned in props.category, it will list the posts associated with that category.
**      If no category is mentioned in props.category, it will list all the posts.
**
**  Each post lists the post info and has provisions to vote up/down, to delete the post and to get into the post detail.
**  It also has the provision to add a new post.
**/
class Posts extends Component {
    constructor(props) {
        super(props);
        //initialize the state for default sort order and Addpost modal controller
        this.state = {
          postsOrder:'voteScore',
          modalAddPostOpen: false
        }
    }

    /**
    **  sortPosts sort the this.props.posts.
    **  sort order is decided by this.state.postOrder.
    **/
    sortPosts() {
        const orderBy = this.state.postsOrder;
        this.props.posts.sort((post1, post2) => {
            switch (orderBy) {
                case 'timestamp'    :   return post1.timestamp - post2.timestamp;
                case 'voteScore'    :   return post2.voteScore - post1.voteScore;
                case 'category'     :   return post1.category.localeCompare(post2.category);
                default             :   return post2.voteScore - post1.voteScore;
            }
        });
    }

    /**
    **  filterPosts filters and returns posts in this.props.posts for a category
    **  Category name should be mentioned in this.props.category.
    **  If no category is mentioned, it returns a copy of this.props.posts
    **/
    filterPosts() {
        if (this.props.category) {
            return this.props.posts.filter(post => post.category === this.props.category);
        }
        return [...this.props.posts];
    }

    /**
    **  Event handler for the posts sort order select control
    **  Sets the state with the selected post order
    **/
    changePostsOrder = (event) => {
        const orderBy = event.target.value;
        this.setState({postsOrder: orderBy});
    };

    /**
    **  Deletes the post
    **  Sets the state with the selected post order
    **/
    deletePost = (post) => this.props.dispatch(deletePost(post));

    /**
    **  Set the AddPost modal state to false.
    **  This will cause the renderer to remove the AddPost modal
    **/
    closeAddPostModal = () => this.setState({modalAddPostOpen: false});

    render() {
        console.log('Posts render props: ', this.props);
        this.sortPosts();
        const posts = this.filterPosts();
        const { history } = this.props;
        const { modalAddPostOpen } = this.state;
        return (
            <div>
                <br/>
                <div className="container-fluid">
                    <div className = "row">
                        <div className="col">
                        </div>
                        <div className="col">
                            <h3>Posts</h3>
                        </div>
                        <div className="col text-right">
                                Sort By
                                <select className="ml-1" value={this.state.postsOrder} onChange={this.changePostsOrder}>
                                    <option value="voteScore">voteScore</option>
                                    <option value="timestamp">timestamp</option>
                                    <option value="category">category</option>
                                </select>
                        </div>
                    </div>
                </div>
                <div className="list-group">
                    {
                        posts.map(post => (
                            <div key={post.id} className="list-group-item  flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                  <h5 className="mb-1">{post.title}</h5>
                                  <small>{new Date(post.timestamp).toString()}</small>
                                </div>
                                <p className="mb-1 text-left">{post.body}</p>
                                <div className="row">
                                    <div className="col text-left">
                                        <small className="justify-left">Author: {post.author}</small>

                                    </div>
                                    <div className="col">
                                        <small>votes: {post.voteScore}</small>
                                        <FaThumbsUp size={20} onClick={() => this.props.dispatch(upVotePost(post.id))} className="ml-2 cursorPointer"/>
                                        <FaThumbsDown size={20} onClick={() => this.props.dispatch(downVotePost(post.id))} className="ml-2 cursorPointer"/>
                                    </div>
                                    <div className="col text-right">
                                        <small className="mr-3">{post.commentCount} comments</small>
                                        <small>Category: {post.category}</small>
                                        <FaExpand
                                            size={20}
                                            className="ml-1 cursorPointer"
                                            onClick={ () => history.push(`/${post.category}/${post.id}`) }
                                        />
                                        <MdDelete size={20} className="ml-1 cursorPointer" onClick={() => this.deletePost(post.id)}/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button
                    className="mt-2"
                    onClick={ () => this.setState({modalAddPostOpen: true})}
                >
                    Add Post
                </button>
                <Modal
                    className='my-modal'
                    overlayClassName='my-overlay'
                    isOpen={modalAddPostOpen}
                    onRequestClose={this.closeAddPostModal}
                    contentLabel='Modal'
                    shouldCloseOnOverlayClick={true}
                >
                    {modalAddPostOpen &&
                        (<AddPost
                            category={this.props.category}
                            onCancel={this.closeAddPostModal}
                            onSave={this.closeAddPostModal}
                        />)
                    }
                </Modal>
            </div>
        );
    }
}
function mapStateToProps({posts}) {
    console.log('Posts mapStateToProps posts: ', posts);
    return {
        posts
    }
}

export default withRouter(connect(mapStateToProps)(Posts));