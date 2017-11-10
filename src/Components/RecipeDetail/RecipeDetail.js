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
                    <h2 className='title'>{e.title}</h2>

                    <img src={e.image_url} alt='food' className='recipeDetail_img' />
                    <button
                        onClick={this.addToFavoriteRecipes}
                        className='add_button'>
                    </button>
                    <Link to='/search'>
                        <button className='back_button'></button>
                    </Link>
                    <h2 >Published By : {e.publisher}</h2>
                    <h2>Ingredients : {ingredients}</h2>
                    <div className='forwarding'>
                        <h2>Show me Detailed Instructions</h2>
                        <a href={e.source_url} target='_blank'><h2 className='forward_button'></h2></a>

                    </div>
                </div>
            )
        })
        return (
            <div className='recipeDetail_background'>
                <nav className='recipeDetail_nav'>
                    <div className='recipeDetail_logo'>
                        <div className='fork_and_spoon_logo'></div>
                        <div className='mainPage_title'>Recipe Jar</div>
                    </div>
                    <div className='recipeDetail_middle_title'>
                        <h1>Recipe Details</h1>
                    </div>
                    <div className='recipeDetail_logos'>
                        <Link to='/profile'>
                            <div className='cook'></div>
                        </Link>
                        <a href={process.env.REACT_APP_LOGOUT}>
                            <div className='logout'></div>
                        </a>
                    </div>
                </nav>
                {individualRecipe}
            </div>
        )
    }
}
