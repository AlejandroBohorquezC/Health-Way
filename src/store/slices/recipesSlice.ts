import { Recipe, Hits } from '@/components/RecipeList/RecipeList.interface'; // Removed IRecipeList
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecipesState {
  hits: Hits[];
  selectedRecipe: Recipe | null;
  loading: boolean;
  searchAttempted: boolean;
}

const initialState: RecipesState = {
    hits: [],
    selectedRecipe: null,
    loading: false,
    searchAttempted: false,
};

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes: (state, action: PayloadAction<Hits[]>) => {
            state.hits = action.payload;
            state.loading = false; // Ensure loading is false when recipes are set
            state.searchAttempted = true; // A search was completed
        },
        setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
            state.selectedRecipe = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setSearchAttempted: (state, action: PayloadAction<boolean>) => {
            state.searchAttempted = action.payload;
        },
    },
})


export const { setRecipes, setSelectedRecipe, setLoading, setSearchAttempted } = recipesSlice.actions

export default recipesSlice.reducer