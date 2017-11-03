import React, { Component } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { getAllRecipes, searchAllRecipes} from '../../utils/api';

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
                <div className='margin' key={i}>
                    <h1>ID:{e.recipe_id}</h1>
                    <h2>Title: {e.title}</h2>
                    <Link to ={`/recipe/detail/${e.recipe_id}`}>
                    <img className='img'
                        src={e.image_url}
                        alt='recipe pic' />
                    </Link>
                    <h3>Rank: {Math.floor(e.social_rank)}</h3>
                </div>
            )
        })

        return (
            <main className='background'>
                <div className='navPositioning'>
                    <input type='text'
                        placeholder='Search by Ingredients or Recipe Name'
                        className='input_box'
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button className='search_button'
                        onClick={this.handleClick}>Search</button>
                </div>
                <div className='wrap'>
                    <div className='main_content'>
                        {filteredRecipes}
                    </div>
                </div>
            </main>
        )
    }
}
