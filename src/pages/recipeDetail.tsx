import NavBar from '@/components/NavBar/NavBar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Recipe } from '@/components/RecipeList/RecipeList.interface';
import { auth, db } from '../../config/firebaseAuth';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { Box, Typography, List, ListItem, ListItemText, CardMedia, Button, CircularProgress, Alert } from '@mui/material'; // Added Alert
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const RecipeDetail = () => {
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(true);
    const [firestoreError, setFirestoreError] = useState<string | null>(null); // New state for Firestore errors
    const { recipeUri } = router.query;

    const { hits } = useSelector((state: RootState) => state.recipes);
    const selectedHit = hits.find(hit => hit.recipe.uri === recipeUri);
    const recipe: Recipe | undefined = selectedHit?.recipe;

    // Effect for auth redirect (existing)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/');
            }
        });
        return () => unsubscribe();
    }, [router]);

    // Effect for checking favorite status
    useEffect(() => {
        if (!recipe || !auth.currentUser) {
            setFavoriteLoading(false);
            setIsFavorite(false);
            setFirestoreError(null); // Clear any previous error
            return;
        }
        setFavoriteLoading(true);
        setFirestoreError(null); // Clear previous error on new check
        const sanitizedRecipeUri = recipe.uri.replace(/[.#$\[\]\/]/g, '_');
        const favDocRef = doc(db, "users", auth.currentUser.uid, "favorites", sanitizedRecipeUri);

        getDoc(favDocRef)
            .then((docSnap) => {
                setIsFavorite(docSnap.exists());
            })
            .catch(error => {
                console.error("Error checking favorite status:", error);
                setIsFavorite(false);
                setFirestoreError("Could not check favorite status. Please try again later.");
            })
            .finally(() => {
                setFavoriteLoading(false);
            });
    }, [recipe, auth.currentUser]);

    const handleToggleFavorite = async () => {
        if (!recipe || !auth.currentUser) return;

        setFavoriteLoading(true);
        setFirestoreError(null); // Clear previous error
        const sanitizedRecipeUri = recipe.uri.replace(/[.#$\[\]\/]/g, '_');
        const favDocRef = doc(db, "users", auth.currentUser.uid, "favorites", sanitizedRecipeUri);

        try {
            if (isFavorite) {
                await deleteDoc(favDocRef);
                setIsFavorite(false);
            } else {
                const recipeDataToSave = {
                    uri: recipe.uri,
                    label: recipe.label,
                    image: recipe.image, // This is the primary image string
                    images: recipe.images, // This contains REGULAR, SMALL, THUMBNAIL etc.
                    ingredientLines: recipe.ingredientLines,
                    calories: recipe.calories,
                    cuisineType: recipe.cuisineType || [],
                    url: recipe.url || '',
                    // Add any other fields from the Recipe interface you want to save
                    dietLabels: recipe.dietLabels || [],
                    healthLabels: recipe.healthLabels || [],
                    cautions: recipe.cautions || [],
                    totalNutrients: recipe.totalNutrients || {},
                };
                await setDoc(favDocRef, recipeDataToSave);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            // Potentially revert UI state or show error to user
        } finally {
            setFavoriteLoading(false);
        }
    };

    if (!recipe) {
        // This loading state is for the recipe itself from Redux, not favorite status
        // We can show a generic loading or the existing "Recipe not found" if it's truly not found after Redux state settles
        const globalLoading = useSelector((state: RootState) => state.recipes.loading);
        if (globalLoading && hits.length === 0) {
             return (
                <>
                    <Head>
                        <title>Loading Recipe - Health Way</title>
                        <meta name="description" content="Loading recipe details" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                    </Head>
                    <NavBar arrowBack={true} logout={true} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
                        <CircularProgress />
                    </Box>
                </>
            );
        }
        return (
            <>
                <Head>
                    <title>Recipe Not Found - Health Way</title>
                    <meta name="description" content="Recipe not found" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <NavBar arrowBack={true} logout={true} />
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Recipe not found
                    </Typography>
                    <Typography variant="body1">
                        This might be because you navigated directly to this page or the recipe data is no longer available. Please try selecting a recipe from the list again.
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{recipe.label} - Health Way</title>
                <meta name="description" content={`Details for ${recipe.label}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <NavBar arrowBack={true} logout={true} />

            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    {recipe.label}
                </Typography>

                {recipe.image && (
                    <CardMedia
                        component="img"
                        sx={{
                            height: 300,
                            width: 'auto',
                            maxWidth: '100%',
                            objectFit: 'cover',
                            marginBottom: 2,
                        }}
                        image={recipe.image}
                        alt={recipe.label}
                    />
                )}

                <Typography variant="h5" gutterBottom component="h2">
                    Ingredients:
                </Typography>
                <List dense>
                    {recipe.ingredientLines.map((ingredient, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={ingredient} />
                        </ListItem>
                    ))}
                </List>

                <Typography variant="body1" gutterBottom>
                    Calories: {Math.round(recipe.calories)}
                </Typography>

                {recipe.cuisineType && recipe.cuisineType.length > 0 && (
                    <Typography variant="body1" gutterBottom>
                        Cuisine Type: {recipe.cuisineType.join(', ')}
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default RecipeDetail;