import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import CommentCreateWidget from '../../components/CommentCreateWidget/CommentCreateWidget';
import CommentList from '../../components/CommentList';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';
import { addCommentRequest, likeCommentRequest } from '../../CommentActions';

// Import Selectors
import { getPost, getComments } from '../../PostReducer';

class PostDetailPage extends Component {
  componentDidMount() {
  }
  handleAddComment = (cuid, name, content) => {
    this.props.dispatch(addCommentRequest({ cuid, name, content }));
  };
  handleLikeEvent= (cuid, _id, direct) => {
    this.props.dispatch(likeCommentRequest({ cuid, _id, direct }));
  };

  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
        </div>
        <CommentCreateWidget
          cuid={this.props.post.cuid}
          addComment={this.handleAddComment}
        />
        <CommentList
          cuid={this.props.post.cuid}
          comments={this.props.comments}
          likeComment={this.handleLikeEvent}
        />
      </div>
    );
  }
}
// Actions required to provide data for this component to render in sever side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    comments: getComments(state, props.params.cuid),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
