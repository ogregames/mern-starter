import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentCreateWidget.css';

export class CommentCreateWidget extends Component {
  commentCreate = () => {
    const nameRef = this.refs.name;
    const contentRef = this.refs.content;
    if (nameRef.value && contentRef.value) {
      this.props.addComment(this.props.cuid, nameRef.value, contentRef.value);
      nameRef.value = contentRef.value = '';
    }
  };

  render() {
    return (
      <div>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="addComment" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="content" />
          <a className={styles['post-submit-button']} onClick={this.commentCreate}><FormattedMessage id="submit" /></a>
        </div>
      </div>);
  }
}
// need update info
CommentCreateWidget.propTypes = {
  addComment: PropTypes.func.isRequired,
  cuid: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentCreateWidget);
