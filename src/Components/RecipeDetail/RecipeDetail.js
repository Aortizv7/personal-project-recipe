import React, { Component } from 'react';
import './RecipeDetail.css';
import { getRecipeDetail, addToFavorites } from '../../utils/api';
import { Link } from 'react-router-dom';

export default class RecipeDetail extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            recipe: []
        }
        this.addToFavoriteRecipes = this.addToFavoriteRecipes.bind(this)
    }

    addToFavoriteRecipes() {
        addToFavorites(this.props.match.params.id).then(res => {
            console.log(res)
        })
    }

    componentWillMount() {
        getRecipeDetail(this.props.match.params.id).then(res => {
            this.setState({ recipe: this.state.recipe.concat([{ ...res.data.recipe }]) })
        })
    }


    render() {
        var individualRecipe = this.state.recipe.map((e, i) => {
            var ingredients = e.ingredients.map((e, i) => {
                return (
                    <li key={i}>{e}</li>
                )
            })
            return (
                <div key={i} className='recipe_info'>
                    <h1>{e.title}</h1>
                    <button
                        onClick={this.addToFavoriteRecipes}
                        className='add_button'>
                    </button>
                    <img src={e.image_url} alt='food' />
                    <Link to='/search'>
                        <button className='back_button'></button>
                    </Link>
                    <h2>Published By:{e.publisher}</h2>
                    <p>Ingredients:{ingredients}</p>
                    <h2>For Detailed Instructions Please Click
                     <a href={e.source_url} target='_blank'> Here</a>
                    </h2>
                </div>
            )
        })
        return (
            <div className='recipeDetail_background'>
                <nav className='recipeDetail_nav'>
                    <ul>
                        <Link to='/profile'>
                            <div className='cook'></div>
                        </Link>
                        <a href='http://localhost:3535/logout'>
                            <div className='logout'></div>
                        </a>
                    </ul>
                </nav>
                {individualRecipe}
            </div>
        )
    }
}
