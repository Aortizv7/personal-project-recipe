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
            // console.log(response)
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
            <div>
                <img src={user.img} alt='avatar' className='profile_img' />
                <p>{user.user_name}</p>
            </div>
            : null
        let favoriteRecipes = this.state.recipes.map((e, i) => {
            return (
                <div key={i} className='profile_recipe_card'>
                    <h2>{e.title}</h2>
                    <img src={e.image_url} alt='recipePic' className='mainPage_recipe_img' />
                    <button className='remove_button'
                        onClick={() => this.handleRemoveFromFavorites(e.recipe_id)}>
                    </button>
                </div>
            )
        })
        return (
            <div className='profile_background'>
                <nav className='profileNav'>
                    {userInfo}
                    <h1 className='profile_header'>Profile</h1>
                    <a href={process.env.REACT_APP_LOGOUT}>
                        <button className='logout'></button>
                    </a>
                    <Link to='/search'>
                        <button className='back-button'></button>
                    </Link>
                </nav>

                <section className='favorite_recipes'>
                    {favoriteRecipes}
                </section>
            </div>
        )
    }
}