import axios from 'axios';


//these are all the axios calls for the api//
export function getAllRecipes() {
    return axios.get('/api/search')
}

export function searchAllRecipes(term) {
    return axios.get(`/api/search?term=${term}`)
}

export function getRecipeDetail(id){
    return axios.get(`/api/recipe/${id}`)
}


//these will be all the calls for the back-end authorization and database//

export function getUserInfo(){
    return axios.get(`/auth/me`)
}

//this is the spot for other api calls.. i.e to get a user's favotire recipes
