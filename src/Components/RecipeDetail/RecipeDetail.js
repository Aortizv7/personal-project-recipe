import React, { Component } from 'react';
import './RecipeDetail.css';
import { getRecipeDetail } from '../../utils/api';

export default class RecipeDetail extends Component {
   constructor(props){
       super(props)
       this.state={
        recipe:[],
       }
   }


componentDidMount() {
    getRecipeDetail(this.props.recipeId).then(res=>{
        this.state({recipe:res.data.recipe})
    })
}


   render(){
       var ingredients=this.state.recipe.map((e,i)=>{
           return (
               <div key={i}>
               <p>ingredients:{e.ingredients}</p>
               </div>
           )
       })
       return(
           <div>this is the place for recipe details
               {ingredients}
           </div>
       )
   }
}
