import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../utils/api';

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            userData: null
        }
    }

    componentDidMount() {
        getUserInfo().then(res => {
            console.log(res)
            this.setState({ userData: res.data })
        })
    }

    render() {
        let user = this.state.userData
        let userInfo = this.state.userData ?
            <div className='user_info' >
                <img src={user.img} alt='avatar' />
                <p>Username:{user.user_name}</p>
                <p>Email:{user.email}</p>
            </div>
            : null


        return (
            <div>
                {userInfo}
                <a href='http://localhost:3535/logout'>
                    <button>Log Out</button>
                </a>
                <Link to='/search'>
                    <button>Back to Search</button>
                </Link>
                <section className='favorite recipes'>
                    <div>
                        <h2>Your Favorite Recipes</h2>
                        <button>Remove from Favorites</button>
                    </div>
                </section>
            </div>
        )
    }
}