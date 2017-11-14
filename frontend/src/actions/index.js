import {
    RECEIVE_CATEGORIES,
    RECEIVE_POSTS,
    RECEIVE_COMMENTS,
    UPDATE_VOTE_POST,
    POST_DELETED,
    POST_ADDED,
    POST_UPDATED,
    UPDATE_VOTE_COMMENT,
    COMMENT_DELETED,
    COMMENT_ADDED,
    COMMENT_UPDATED
} from './actionTypes'

export function receiveCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    }
}
export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}
export function receiveComments(comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}
export function updateVotePost(post) {
    return {
        type: UPDATE_VOTE_POST,
        post
    }
}
export function postDeleted(post) {
    return {
        type: POST_DELETED,
        post
    }
}
export function postAdded(post) {
    return {
        type: POST_ADDED,
        post
    }
}
export function postUpdated(post) {
    return {
        type: POST_UPDATED,
        post
    }
}
export function updateVoteComment(comment) {
    return {
        type: UPDATE_VOTE_COMMENT,
        comment
    }
}
export function commentDeleted(comment) {
    return {
        type: COMMENT_DELETED,
        comment
    }
}
export function commentAdded(comment) {
    return {
        type: COMMENT_ADDED,
        comment
    }
}
export function commentUpdated(comment) {
    return {
        type: COMMENT_UPDATED,
        comment
    }
}

/**
**  Fetches the categories by calling the server api.
**/
export function fetchCategories() {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/categories`;
        fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
        .then(res => res.json())
        .then(data => {
            //categories received. Dispatch action receiveCategories so that redux store can be updated with the list of categories.
            dispatch(receiveCategories(data.categories));
        });
    }
}

/**
**  Fetches the posts by calling the server api.
**/
export function fetchPosts() {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts`;
        fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
        .then(res => res.json())
        .then(posts => {
            //posts are received. Dispatch the action receivePosts to update the redux store with the list posts.
            dispatch(receivePosts(posts));

            //dispatch the action fetchComments to get the comments for all posts.
            dispatch(fetchComments(posts));
        });
    }
}

/**
**  Adds a post by calling the server api.
**/
export function addPost(post) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts`;
        fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            },
        )
        .then(res => res.json())
        .then(post => {
            //post is added in the server. Dispatch the action postAdded to update the redux store with the added post.
            dispatch(postAdded(post));
        });
    }
}

/**
**  Updates a post by calling the server api.
**/
export function updatePost(post) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${post.id}`;
        fetch(
            url,
            {
                method: 'PUT',
                headers: {
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: post.title, body:post.body})
            },
        )
        .then(res => res.json())
        .then(post => {
            //post updated. Dispatch the action postUpdated to update the redux store.
            dispatch(postUpdated(post));
        });
    }
}

/**
**  Deletes a post by calling the server api.
**/
export function deletePost(postId) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}`;
        fetch(
            url,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                }
            },
        )
        .then(res => res.json())
        .then(data => {
            //post deleted. Dispatch the action postDeleted to update the redux store.
            dispatch(postDeleted(data));
        });
    }
}

/**
**  Upvotes a post by calling the server api.
**/
export function upVotePost(postId) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}`;
        fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({option: "upVote"})
            },
        )
        .then(res => res.json())
        .then(post => {
            //post upvoted. Dispatch action updateVotePost to update redux store.
            dispatch(updateVotePost(post));
        });
    }
}

/**
**  Downvotes a post by calling the server api.
**/
export function downVotePost(postId) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}`;
        fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({option: "downVote"})
            },
        )
        .then(res => res.json())
        .then(post => {
            //post downvoted. Dispatch action updateVotePost to update redux store.
            dispatch(updateVotePost(post));
        });
    }
}

/**
**  Fetches comments for a list of posts by calling the server api.
**/
export function fetchComments(posts) {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_BACKEND}/posts`;
        //fetch comments for each of the post in posts.
        posts.forEach(post => {
            const finalUrl = url + `/${post.id}/comments`;
            fetch(finalUrl, { headers: { 'Authorization': 'whatever-you-want' }} )
            .then(res => res.json())
            .then(data => {
                //comments fetched for a post. Dispatch action receiveComments to append the fetched comments to redux store.
                dispatch(receiveComments(data));
            });
        });
    }
}

/**
**  Adds a comment by calling the server api.
**/
export function addComment(comment) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/comments`;
        fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            },
        )
        .then(res => res.json())
        .then(comment => {
            //comment added. Dispatch the action commentAdded to update the redux store.
            dispatch(commentAdded(comment));
        });
    }
}

/**
**  Deletes a comment by calling the server api.
**/
export function deleteComment(commentId) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/comments/${commentId}`;
        fetch(
            url,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                }
            },
        )
        .then(res => res.json())
        .then(comment => {
            //Comment deleted. Dispatch the action commentDeleted to update the redux store.
            dispatch(commentDeleted(comment));
        });
    }
}

/**
**  Upvotes a comment by calling the server api.
**/
export function upVoteComment(commentId) {
    return (dispatch) => {
        console.log('updating server');
        const url = `${process.env.REACT_APP_BACKEND}/comments/${commentId}`;
        fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({option: "upVote"})
            },
        )
        .then(res => res.json())
        .then(comment => {
            //comment upvoted. Dispatch the action updateVoteComment to update redux store.
            dispatch(updateVoteComment(comment));
        });
    }
}

/**
**  Downvotes a comment by calling the server api.
**/
export function downVoteComment(commentId) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/comments/${commentId}`;
        fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({option: "downVote"})
            },
        )
        .then(res => res.json())
        .then(comment => {
            //comment downvoted. Dispatch the action updateVoteComment to update redux store.
            dispatch(updateVoteComment(comment));
        });
    }
}

/**
**  Updates a comment by calling the server api.
**/
export function updateComment(comment) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/comments/${comment.id}`;
        fetch(
            url,
            {
                method: 'PUT',
                headers: {
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({body:comment.body})
            },
        )
        .then(res => res.json())
        .then(comment => {
            //comment updated. Dispatch the action commentUpdated to update the redux store.
            dispatch(commentUpdated(comment));
        });
    }
}