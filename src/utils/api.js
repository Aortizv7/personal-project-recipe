import axios from 'axios';

export function getAllRecipes() {
    return axios.get('/api/search')
}

export function searchAllRecipes(term) {
    return axios.get(`/api/search?term=${term}`)
}

export function getRecipeDetail(id){
    return axios.get(`/api/recipe/${id}`)
}
