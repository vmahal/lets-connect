import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deletePost } from '../../actions/post';
import mypost from '../layout/mypost.png';
import other from '../layout/otheruser.png';
import my from '../layout/record.PNG';
const PostDisplay = ({
  myposts: { _id, text, date, likes, user, avatar, picture, comments },
  auth,
  deletePost
}) => {

  const [showLikes, toggleLikes] = useState(false);

  const userid = auth.user._id;

  return (

    <div className='post bg-white p-1 my-1' style={{ gridGap: "0px" }}>
      <div>
        <Link to={`/profile/${userid}`}>
          <img style={{ width: "70px" }} src={mypost} alt='' />
        </Link>
      </div>
      <div>
        <p className='my-1 mytext'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button onClick={e => toggleLikes(!showLikes)} type='button'
          className='btn btn-light'>
          <p>
            <i className='fas fa-thumbs-up'></i>
            {'      '}
            {likes.length > 0 && <span>{likes.length}</span>}{' '}
          </p>
        </button>

        <Link
          style={{ marginLeft: '10px' }}
          className='btn btn-primary'
          to={`/posts/${_id}`}
        >
          {' '}
          Discussion{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {' '}
        <button
          onClick={(e) => deletePost(_id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times'></i>
        </button>
      </div>
      <div >
        {showLikes && <Fragment>
          <p style={{ marginBottom: '6px' }}>Liked By </p>
          {likes.map(like => (<div className='bg-white p-1 my-1' style={{
            width: '284px',
            height: '55px',
            borderWidth: '0px 0px 1px 0px',
            margin: '0px 0px 0px 0px',
            padding: '3px'
          }} >
            <div>
              <Link to={`/profile/${like.user}`}>
                {!auth.loading && like.user === auth.user._id ? <img className='round-img' style={{ width: "45px" }} src={my} alt='' /> :
                  <img className='round-img' style={{ width: "45px" }} src={other} alt='' />}
              </Link>

              {' '}
              {like.name} {' '}
            </div>
          </div>))}
        </Fragment>}
      </div>

    </div>


  );
};

PostDisplay.propTypes = {
  myposts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost })(PostDisplay);
