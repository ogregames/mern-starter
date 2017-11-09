import { ADD_POST, ADD_POSTS, DELETE_POST } from './PostActions';
import { ADD_COMMENT, LIKE_COMMENT } from './CommentActions';

import update from 'immutability-helper';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        data: action.posts,
      };

    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };
    case ADD_COMMENT : {
      let postIndex;
      for (let i = 0; i < state.data.length; ++i) {
        if (state.data[i].cuid === action.comment.cuid) {
          postIndex = i;
          break;
        }
      }
      if (postIndex === undefined) return state;
      return update(state, { data: { [postIndex]: { comments: { $push: [action.comment.newComment] } } } });
    }
    case LIKE_COMMENT : {
      let postIndex;
      let commentIndex;
      for (let i = 0; i < state.data.length; ++i) {
        if (state.data[i].cuid === action.comment.cuid) {
          postIndex = i;
          for (let j = 0; j < state.data[i].comments.length; ++j) {
            if (state.data[i].comments[j]._id === action.comment._id) {
              commentIndex = j;
              break;
            }
          }
          break;
        }
      }
      if (postIndex === undefined || commentIndex === undefined) return state;
      return update(state, { data: { [postIndex]: { comments: { [commentIndex]: { rating: { $apply: x => x + action.comment.direct } } } } } });
    }
    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Get all comments for post
export const getComments = (state, cuid) => {
  const result = state.posts.data.filter(post => post.cuid === cuid)[0];
  return result && result.comments ? result.comments : [];
};
// Export Reducer
export default PostReducer;
