import React, { Component } from 'react';
import './RecipeDetail.css';
import { getRecipeDetail } from '../../utils/api';

export default class RecipeDetail extends Component {
   constructor(props){
       super(props)
       this.state={
        recipe:[]
       }
   }

componentWillMount() {
    getRecipeDetail(this.props.match.params.id).then(res=>{
        this.setState({recipe:this.state.recipe.concat([{ ...res.data.recipe }]) })
    })
    console.log(`this is the individual recipe call ${this.state.recipe}`)
}


   render(){
       console.log(this.props)
       var individualRecipe=this.state.recipe.map((e,i)=>{
           console.log(e.ingredients)
           var ingredients=e.ingredients.map((e,i)=>{
            return (
                <li key={i}>{e}</li>
            )
           })
           return (
               <div key={i}>
               <img src={e.image_url} alt ='food'/>
               <h2>{e.title}</h2>
               {<p>ingredients:{ingredients}</p>}
               </div>
           )
       })
       return(
           <div>this is the place for recipe details
            {individualRecipe}
           </div>
       )
   }
}
