import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getMyPost } from "../../actions/post";
import PostDisplay from "./PostDisplay";


const MyPosts = ({
    auth: { token, loading },
    myposts,
    getMyPost
}) => {

    useEffect(() => { getMyPost() }, [getMyPost]);



    return token ? (
        loading ? (
            <Spinner />
        ) : (
                <Fragment>
                    <h2 className='my-2' >
                        My Posts
                    </h2>

                    <div>
                        {myposts.map(mypost => (
                            <PostDisplay key={mypost._id} myposts={mypost} />
                        ))}
                    </div>
                </Fragment>
            )
    ) : (
            <Redirect to='/login'></Redirect>
        );
};

MyPosts.propTypes = {
    auth: PropTypes.object.isRequired,
    myposts: PropTypes.array.isRequired,
    getMyPost: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    auth: state.auth,
    myposts: state.post.myposts
});

export default connect(mapStateToProps, { getMyPost })(MyPosts);
