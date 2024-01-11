import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { IRecipeList, Recipe } from './RecipeList.interface';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const RecipeList = () => {

  const router = useRouter();
  const {hits} = useSelector((state: RootState) => state.recipes)

  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    // setHits(storedHits)
    console.log(hits)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hits])
  

  if (recipe) {
    console.log(recipe)
    router.push('/recipeDetail');
  };

  return (
    <div>
        {hits?.map(({recipe}) => (
            <Card onClick={() => setRecipe(recipe)} key={recipe.label} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1.5 }}>
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
                  alt="Recipe image"
                />
              </Box>
            </Card>
        ))}
    </div>
  )
}

export default RecipeList