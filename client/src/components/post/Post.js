import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommentItem from '../post/CommentItem';
import CommentForm from '../post/CommentForm';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <Link to='/posts' className='btn btn-primary'>
        Back to posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />

      {post.comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          postId={post._id}
        ></CommentItem>
      ))}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
