import React, { Component } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { getAllRecipes, searchAllRecipes, addToFavorites } from '../../utils/api';

export default class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            userInput: '',
            recipes: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAddToFavorites = this.handleAddToFavorites.bind(this);
    }

    handleChange(e) {
        this.setState({
            userInput: e.target.value,
        })
    }

    handleClick() {
        searchAllRecipes(this.state.userInput).then(res => {
            this.setState({
                recipes: res.data.recipes
            })
        })
    }

    handleAddToFavorites(id) {
        addToFavorites(id).then((res) => {
            console.log(res)
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
                <RecipeCard key={i} title={e.title} recipe_id={e.recipe_id}
                    image_url={e.image_url} social_rank={e.social_rank}
                    handleAddToFavorites={this.handleAddToFavorites} />
            )
        })

        return (
            <main className='mainPage_background'>
                <nav className='mainPage_navBackground'>
                    <div className='fork_and_spoon_logo'></div>
                    <header className='mainPage_header'>Recipe Jar</header>
                    <input type='text'
                            /* value={this.state.userInput} */
                        placeholder='Search by Ingredients/Recipe Name'
                        className='input_box'
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button className='search_button'
                        onClick={this.handleClick}>Search</button>
                    <section className='mainPage_menu'>
                        <div className='mainPage_menu_options'>
                            <Link to='/profile'>
                                <div className='cook'></div>
                            </Link>
                            <a href='http://localhost:3535/logout'>
                                <div className='logout'></div>
                            </a>
                        </div>
                    </section>
                </nav>
                <div className='wrap'>
                    <div className='mainPage_main_content'>
                        {filteredRecipes}
                    </div>
                </div>
            </main>
        )
    }
}

function RecipeCard(props) {
    return (
        <div className='mainPage_recipe_info'>
            <h1>{props.title}</h1>
            <Link to={`/recipe/detail/${props.recipe_id}`}>
                <img className='mainPage_recipe_img'
                    src={props.image_url}
                    alt='recipe pic' />
            </Link>
            <h2>Social Rank: {Math.floor(props.social_rank)}</h2>
            <button
                onClick={() => props.handleAddToFavorites(props.recipe_id)}
                className='add_button'>
            </button>
        </div>
    )
}