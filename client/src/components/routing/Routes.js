import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Reset from '../auth/Reset';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import UploadImages from '../dashboard/UploadImages';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';

const Routes = () => {
    return (
        <section className='container'>
            <Alert />
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/reset' component={Reset} />

                <Route exact path='/profiles' component={Profiles} />
                <Route exact path='/profile/:id' component={Profile} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute
                    exact
                    path='/create-profile'
                    component={CreateProfile}
                />
                <PrivateRoute
                    exact
                    path='/edit-profile'
                    component={EditProfile}
                />
                <PrivateRoute
                    exact
                    path='/add-experience'
                    component={AddExperience}
                />
                <PrivateRoute
                    exact
                    path='/add-education'
                    component={AddEducation}
                />
                <PrivateRoute
                    exact
                    path='/upload-images'
                    component={UploadImages}>
                </PrivateRoute>
                <PrivateRoute
                    exact
                    path='/posts'
                    component={Posts}
                ></PrivateRoute>
                <PrivateRoute
                    exact
                    path='/posts/:id'
                    component={Post}
                ></PrivateRoute>
                <Route component={NotFound}></Route>
            </Switch>
        </section>
    )
}

export default Routes
