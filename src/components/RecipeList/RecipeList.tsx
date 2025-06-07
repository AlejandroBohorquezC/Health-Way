import { useRouter } from 'next/router';
import { Recipe } from './RecipeList.interface';
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setSelectedRecipe } from '@/store/slices/recipesSlice';

const RecipeList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { hits, loading, searchAttempted } = useSelector((state: RootState) => state.recipes);

  const handleRecipeClick = (recipe: Recipe) => {
    dispatch(setSelectedRecipe(recipe));
    router.push({ pathname: '/recipeDetail', query: { recipeUri: recipe.uri } });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (searchAttempted && hits && hits.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Typography variant="h6">No recipes found.</Typography>
        <Typography variant="body1">Try a different search term.</Typography>
      </Box>
    );
  }

  return (
    <div>
        {hits?.map(({recipe}) => (
            <Card onClick={() => handleRecipeClick(recipe)} key={recipe.uri} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {recipe.label}
                  </Typography>
                </CardContent>
              </Box>
              <Box sx={{ display: 'flex', width: 150 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150 }}
                  image={recipe.images.THUMBNAIL.url}
                  alt={recipe.label} // Use recipe.label for alt text
                />
              </Box>
            </Card>
        ))}
    </div>
  )
}

export default RecipeList