import { IRecipeList } from '@/components/RecipeList/RecipeList.interface'
import { createSlice } from '@reduxjs/toolkit'


const initialState: IRecipeList = {
    hits: [],
}

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes: (state, action) => {
                state.hits = action.payload
        },
    },
})


export const { setRecipes } = recipesSlice.actions

export default recipesSlice.reducer