import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadAvatar } from '../../actions/profile';

const UploadImages = ({ uploadAvatar, history }) => {
    let images1 = { picture: '' };
    let myWidget1 = window.cloudinary.createUploadWidget(
        {
            cloudName: 'vmdc',
            uploadPreset: 'dev-connect',
            cropping: 'server'
        },
        (error, result) => {
            if (!error && result && result.event === 'success') {
                //console.log('result: ', result);
                images1.picture = result.info.secure_url;
                uploadAvatar(images1, history);
            }
        }
    );


    return (
        <Fragment>
            <h1 className='large text-primary'>Upload Avatar</h1>{' '}
            <p className='lead'>For best results, crop image into a square.</p>
            <button
                className='btn btn-primary my-1'
                onClick={() => {
                    myWidget1.open();
                }}
            >
                Upload Avatar
      </button>
        </Fragment>
    );
};

UploadImages.propTypes = {
    uploadAvatar: PropTypes.func.isRequired,
};

export default connect(
    null,
    {
        uploadAvatar
    }
)(withRouter(UploadImages));