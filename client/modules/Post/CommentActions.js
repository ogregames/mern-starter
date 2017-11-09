import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const LIKE_COMMENT = 'LIKE_COMMENTS';

// Export Actions
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comment', 'post', {
      post: {
        cuid: comment.cuid,
        name: comment.name,
        content: comment.content,
      },
    }).then(res => dispatch(addComment({ cuid: comment.cuid, newComment: res.newComment })));
  };
}

export function likeComment(comment) {
  return {
    type: LIKE_COMMENT,
    comment,
  };
}

export function likeCommentRequest(comment) {
  // console.log('Like comment call: '+JSON.stringify(comment));
  // return;
  return (dispatch) => {
    return callApi('likecomment', 'post', {
      post: {
        cuid: comment.cuid,
        _id: comment._id,
        direct: comment.direct,
      },
    }).then(() => dispatch(likeComment(comment)));
  };
}
