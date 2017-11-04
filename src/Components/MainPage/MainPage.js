import React, { Component } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { getAllRecipes, searchAllRecipes } from '../../utils/api';

export default class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            userInput: '',
            recipes: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            userInput: e.target.value
        })
    }

    handleClick() {
        searchAllRecipes(this.state.userInput).then(res => {
            this.setState({
                recipes: res.data.recipes
            })
        })
    }

    componentWillMount() {
        getAllRecipes().then(res => {
            this.setState({
                recipes: res.data.recipes
            })
        })
    }
    render() {
        var filteredRecipes = this.state.recipes.map((e, i) => {
            return (
                <div className='mainPage_recipe_info' key={i}>
                    <h2>Title: {e.title}</h2>
                    <Link to={`/recipe/detail/${e.recipe_id}`}>
                        <img className='mainPage_recipe_img'
                            src={e.image_url}
                            alt='recipe pic' />
                    </Link>
                    <h3>Rank: {Math.floor(e.social_rank)}</h3>
                </div>
            )
        })

        return (
            <main className='mainPage_background'>
                <div className='mainPage_navBackground'>
                    <input type='text'
                        placeholder='Search by Ingredients or Recipe Name'
                        className='input_box'
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button className='search_button'
                        onClick={this.handleClick}>Search</button>
                    <div className='mainPage_menu'>
                        <ul className='mainPage_menu_options'>
                            <li>Profile</li>
                            <li>Log Out</li>
                        </ul>
                    </div>
                </div>

                <div className='wrap'>
                    <div className='mainPage_main_content'>
                        {filteredRecipes}
                    </div>
                </div>
            </main>
        )
    }
}
