import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    images: { picture },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className='profile bg-light' style={{ marginBottom: "1.5rem" }}>
      <img src={picture === '' ? avatar : picture} alt='' className='round-img'></img>
      <div>
        <h2>{name}</h2>
        <span>
          {status} {company && <span> at {company}</span>}
        </span>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skills, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i>
            {skills}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
