import React, { Component } from 'react';


export default class Profile extends Component {
    render() {


        return (
            <div>
               <div> <nav>
                    <ul>
                        <li>Home</li>
                        <li>Profile</li>
                        <li>LogIn/LogOut</li>

                    </ul>
                </nav>
                </div>
                <section className='user_info'>
                <img alt='user_avatar'/>
                <h2>Name:</h2>
                <h4>email:</h4>
                <button>Edit</button>
                </section>
                <section className='favorite recipes'>
                    <div>
                        <h2>Your Favorite Recipes</h2>
                    </div>
                </section>

            </div>
        )
    }
}