import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentListItem.css';

function CommentListItem(props) {
  function setLike() {
    props.likeComment(props.cuid, props.item._id, 1);
  }
  function setDislike() {
    props.likeComment(props.cuid, props.item._id, -1);
  }
  let classes = 'content-normal-rating';
  if (Math.abs(props.item.rating) >= 2) {
    classes = (props.item.rating > 0) ? 'content-high-rating' : 'content-low-rating';
  }
  return (
    <li key={props.item._id} className={`${styles['single-comment']} ${styles[classes]}`}>
      <div className={styles['comment-header']}>
        <div className={styles['comment-name']}>{props.item.name}</div>
        <div className={styles['comment-date']}>Добавлено: {props.item.dateAdded}</div>
      </div>
      <div className={styles['comment-content']}>{props.item.content}</div>
      <div className={styles['comment-footer']}>
        <div className={styles['comment-buttons']}>
          <a className={styles['comment-submit-button']} onClick={setLike}><FormattedMessage id="setLike" /></a>
          <a> {props.item.rating} </a>
          <a className={styles['comment-submit-button']} onClick={setDislike}><FormattedMessage id="setDislike" /></a>
        </div>
      </div>
    </li>
  );
}
CommentListItem.propTypes = {
  likeComment: PropTypes.func.isRequired,
  cuid: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};

export default CommentListItem;
