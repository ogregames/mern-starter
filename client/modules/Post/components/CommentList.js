import React, { PropTypes } from 'react';

// Import Components
import CommentListItem from './CommentListItem/CommentListItem';

function CommentList(props) {
  return !props.comments.length ?
  (
    <ul className="listView">
      No comments yet, will be first!
    </ul>
  ) :
  (
    <div className="listView">
      <ul>
          {props.comments.map((item) =>
            <CommentListItem
              item={item}
              cuid={props.cuid}
              likeComment={props.likeComment}
            />
          )}
      </ul>
    </div>
  );
}

CommentList.propTypes = {
  likeComment: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  cuid: PropTypes.string.isRequired,
};

export default CommentList;
