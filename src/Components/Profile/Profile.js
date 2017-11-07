import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { getUserInfo,getFavorites,removeFromFavorites} from '../../utils/api';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: null
        }
        this.handleRemoveFromFavorites=this.handleRemoveFromFavorites.bind(this);
    }

    componentDidMount() {
        getUserInfo().then(res => {
            this.setState({ userData: res.data })
        })
        getFavorites().then(res=>{
            console.log('this is the res from favorites',res)
        })
       
    }
    
  
    handleRemoveFromFavorites(id){
        removeFromFavorites(id).then((res)=>{
            this.setState({favoriteRecipes:res.data})
            console.log(this.state.favoriteRecipes)
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
                        <button onClick={()=>this.handleRemoveFromFavorites}>Remove from Favorites</button>
                    </div>
                </section>
            </div>
        )
    }
}