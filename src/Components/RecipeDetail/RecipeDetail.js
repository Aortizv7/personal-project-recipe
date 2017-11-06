import React, { Component } from 'react';
import './RecipeDetail.css';
import { getRecipeDetail } from '../../utils/api';
import { Link } from 'react-router-dom';

export default class RecipeDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe: []
        }
        //    this.addToFavorites=this.addToFavorites.bind(this)
    }
    // addToFavorites(){

    // }
    componentWillMount() {
        getRecipeDetail(this.props.match.params.id).then(res => {
            this.setState({ recipe: this.state.recipe.concat([{ ...res.data.recipe }]) })
        })
        console.log(`this is the individual recipe call ${this.state.recipe}`)
    }


    render() {
        console.log(this.props)
        var individualRecipe = this.state.recipe.map((e, i) => {
            console.log(e)
            var ingredients = e.ingredients.map((e, i) => {
                return (
                    <li key={i}>{e}</li>
                )
            })
            return (
                <div key={i}>
                    <img src={e.image_url} alt='food' />
                    <h2>{e.title}</h2>
                    <h3>{e.publisher}</h3>
                    <h3>For Detailed Instructions Please Click
                  <a href={e.source_url} target='_blank'> Here</a>
                    </h3>
                    <p>ingredients:{ingredients}</p>


                </div>
            )
        })
        return (
            <div className='recipeDetail_background'>
                {individualRecipe}
                <Link to='/search'><button>Back</button></Link>
                <button /*onClick={this.addToFavorites}*/>Add to Favorites</button>
            </div>
        )
    }
}
