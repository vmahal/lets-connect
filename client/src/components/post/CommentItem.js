import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { removeComment } from '../../actions/post';
import other from '../layout/otheruser.png';
import my from '../layout/record.PNG';

const CommentItem = ({
  postId,
  comment: { _id, avatar, picture, name, text, date, user },
  auth,
  removeComment,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          {!auth.loading && user === auth.user._id ? <img className='round-img' src={my} alt='' /> :
            <img className='round-img' src={other} alt='' />}
          {/* <img className='round-img' src={picture === '' ? avatar : picture} alt='' />
          */}
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <div>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => removeComment(postId, _id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times'></i>
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
