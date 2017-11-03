import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeDetail from './Components/RecipeDetail/RecipeDetail';
import Profile from './Components/Profile/Profile';
import ProfileDetail from './Components/ProfileDetail/ProfileDetail';
import MainPage from './Components/MainPage/MainPage';

export default (
    <div>
        <Switch>
            <Route path='/search' component={MainPage} />
            <Route path='/recipe/detail/:id' component={RecipeDetail} />
            <Route path='/profile/edit' component={ProfileDetail} />
            <Route path='/profile' component={Profile} />
        </Switch>
    </div>
)