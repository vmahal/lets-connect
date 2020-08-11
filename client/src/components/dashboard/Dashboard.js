import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';
import DashboardActions from './DashboardActions';
import MyPosts from './MyPosts';

const Dashboard = ({
  auth: { token, user },
  getCurrentProfile,
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);


  return token ? (loading && profile === null ? (
    <Spinner />
  ) : (
      <Fragment>
        <div className='profile-top bg-primary p-2' className='box'>
          <div className='my-1'>
            {' '}

            {/* //             {profile === null && <img className='round-img' className='imgb' src={user && user.avatar} alt='' />}
            {profile !== null && <img className='round-img' className='imgb' src={profile.images.picture ? profile.images.picture : user.avatar} alt='' />} */}

            {profile !== null ? (
              <img
                className='round-img my-1'
                style={{ width: '200px', borderRadius: '150%' }}
                src={
                  profile.images.picture ? profile.images.picture : user.avatar
                }
                alt=''
              />
            ) : (
                <img
                  className='round-img my-1'
                  style={{ width: '150px' }}
                  src={user && user.avatar}
                  alt=''
                />
              )}

          </div>
          <div>
            {' '}
            <p className='lead' style={{ color: 'white' }}>
              <b> Welcome, {user && user.name}</b>
            </p>
          </div>
          {profile !== null && <p>

            <Link className='ava-style' style={{ color: "white", border: "1px solid", borderColor: "white", padding: '5px' }} to='/upload-images'>
              Add avatar
</Link>

          </p>}

        </div>

        {profile !== null ? (
          <Fragment>
            <div>
              <DashboardActions />
            </div>

            <div style={{ borderBottom: "1px #ccc solid", paddingBottom: "30px" }}>
              <MyPosts></MyPosts>
            </div>
            <div style={{ borderBottom: "1px #ccc solid", paddingBottom: "30px" }}>
              <Experience experience={profile.experience}></Experience>
            </div>
            <div style={{ borderBottom: "1px #ccc solid", paddingBottom: "30px" }}>
              <Education education={profile.education}></Education>
            </div>

            <div className='my-2'>
              <button className='btn btn-danger' onClick={() => deleteAccount()}>
                <i className='fas fa-user-minus'></i>
                Delete My Account
            </button>
            </div>
          </Fragment>
        ) : (
            <Fragment>
              <p>You have not yet setup a profile , Please add some info</p>
              <Link to='/create-profile' className='btn btn-primary my-1'>
                Create profile
          </Link>
              <div className='my-2'>
                <button className='btn btn-danger' onClick={() => deleteAccount()}>
                  <i className='fas fa-user-minus'></i>
                  Delete My Account
            </button>
              </div>
            </Fragment>
          )}
      </Fragment>
    )) : (
      <Redirect to='/login'></Redirect>
    );


};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
