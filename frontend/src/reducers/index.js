import { combineReducers } from 'redux';
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
} from '../actions/actionTypes'

/**
**	Sets the categories in redux store.
**/
function categories (state = [], action) {
	let categories = [...state]; //initalize the categories with previos categories.
	switch (action.type) {
		case RECEIVE_CATEGORIES :
			//Initial list of categories
			categories = action.categories;
			break;

		default :
			break;
	}
	return categories;
}

/**
**	Sets the posts in redux store.
**/
function posts (state = [], action) {
	let posts = [...state]; //initalize the posts with previos list of posts
	let changedPost;
	let changedPostIndex;
	switch (action.type) {
		case RECEIVE_POSTS :
			//Initial list of posts
			posts = action.posts;
			break;

		case UPDATE_VOTE_POST :
			//Post is either upvoted or downvoted. update the voteScore.
			changedPost = posts.find((post) => post.id === action.post.id);
			changedPost.voteScore = action.post.voteScore;
			break;

		case POST_DELETED :
			//Post is deleted. Remove the post from list of posts
			posts = posts.filter(post => post.id !== action.post.id);
			break;

		case POST_ADDED :
			//Post is added. Add that post to the list of posts.
			posts = [...posts, action.post];
			break;

		case POST_UPDATED :
			//Post is updated. Update that post in the list.
			changedPostIndex = posts.findIndex((post) => post.id === action.post.id);
			posts[changedPostIndex] = action.post;
			break;

		case COMMENT_ADDED :
			//A comment is added to a post.
			//Identify the post to which the comment is added.
			changedPost = posts.find((post) => post.id === action.comment.parentId);

			//Increment the commentCount for that post
			changedPost.commentCount++;
			break;

		case COMMENT_DELETED :
			//A comment is deleted from a post
			//Identify the post for which the comment is added.
			changedPost = posts.find((post) => post.id === action.comment.parentId);

			//Decrement the commentCount for that post
			changedPost.commentCount--;
			break;

		default :
			break;
	}
	return posts;
}

/**
**	Sets the comments in redux store.
**/
function comments (state = [], action) {
	let comments = [...state]; //initalize the comments with previos list of comments
	switch (action.type) {
		case RECEIVE_COMMENTS :
			//A new list of comments arrived.
			//Comments are fetched per post. so each list should be appended to the previos list of comments
			comments = [...comments, ...action.comments];
			break;

		case UPDATE_VOTE_COMMENT :
			//Comment is either upvoted or downvoted.
			//Identify the comment which is upvoted or downvoted
			const changedComment = comments.find((comment) => comment.id === action.comment.id);

			//Update the voteScore for that comment.
			changedComment.voteScore = action.comment.voteScore;
			break;

		case COMMENT_ADDED :
			//A new comment added. Append the new comment to the previous list of comments.
			comments = [...comments, action.comment];
			break;

		case COMMENT_UPDATED :
			//A comment is updated. Update the comment in the list.
			const changedCommentIndex = comments.findIndex((comment) => comment.id === action.comment.id);
			comments[changedCommentIndex] = action.comment;
			break;

		case COMMENT_DELETED :
			//A comment is deleted. Remove that comment from the list.
			comments = comments.filter(comment => comment.id !== action.comment.id);
			break;

		default :
			break;
	}
	return comments;
}

export default combineReducers ({
	categories,
	posts,
	comments
})