import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { removeComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, avatar, name, text, date, user },
  auth,
  removeComment,
}) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <div>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => removeComment(postId, _id)}
              type='button'
              class='btn btn-danger'
            >
              <i class='fas fa-times'></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
