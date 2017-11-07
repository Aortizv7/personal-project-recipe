import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { getUserInfo, getFavorites, removeFromFavorites, getRecipeDetail } from '../../utils/api';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            userData: null,
            recipes: []
        }
        this.handleRemoveFromFavorites = this.handleRemoveFromFavorites.bind(this);
    }

    componentDidMount() {
        getUserInfo().then(res => {
            this.setState({ userData: res.data })
        })
        getFavorites().then(res => {
            res.data.forEach((e, i) => {
                getRecipeDetail(e.recipe_id).then(response => {
                    this.setState({
                        recipes: [...this.state.recipes, response.data.recipe]
                    })
                })
            })
        })
    }

    handleRemoveFromFavorites(id) {
        removeFromFavorites(id).then((response) => {
            console.log(response)
            //     getFavorites().then(res => {
            //         res.data.forEach((e, i) => {
            //             getRecipeDetail(e.recipe_id).then(resp => {
            //                 this.setState({
            //                     recipes: [...this.state.recipes, resp.data.recipe]
            //                 })
            //             })
            //         })
            //     })
        })
    }

    render() {
        console.log(this.state.recipes)
        let user = this.state.userData
        let userInfo = this.state.userData ?
            <div className='user_info' >
                <img src={user.img} alt='avatar' />
                <p>Username:{user.user_name}</p>
                <p>Email:{user.email}</p>
            </div>
            : null
        let favoriteRecipes = this.state.recipes.map((e, i) => {
            return (
                <div key={i}>
                    <img src={e.image_url} alt='recipePic' />
                    <h2>{e.title}</h2>
                    <button className='remove_button'
                    onClick={() => this.handleRemoveFromFavorites(e.recipe_id)}>
                    </button>
                </div>
            )
        })
        return (
            <div>
                {userInfo}
                <a href='http://localhost:3535/logout'>
                    <button className='logout'></button>
                </a>
                <Link to='/search'>
                    <button>Back to Search</button>
                </Link>
                <section className='favorite recipes'>
                    <div>
                        <h2>Your Favorite Recipes</h2>
                        {favoriteRecipes}
                    </div>
                </section>
            </div>
        )
    }
}