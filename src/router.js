import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeDetail from './Components/RecipeDetail/RecipeDetail';
import Profile from './Components/Profile/Profile';
import ProfileDetail from './Components/ProfileDetail/ProfileDetail';
import App from './App';

export default (
    <div>
        <Switch>
            {/* <Route exact path='/' component={App} />
            <Route path='/recipe/detail/' component={RecipeDetail} /> */}
            <Route path='/profile/edit' component={ProfileDetail} />
            <Route path='/profile' component={Profile} />
        </Switch>
    </div>
)