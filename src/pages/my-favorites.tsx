import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Grid, Button, Alert } from '@mui/material'; // Added Alert
import NavBar from '@/components/NavBar/NavBar';
import { auth, db } from '@/config/firebaseAuth';
import { collection, getDocs } from 'firebase/firestore'; // Removed unused query, where. Renamed firestoreQuery back if not used.
import { Recipe } from '@/components/RecipeList/RecipeList.interface';

const MyFavoritesPage = () => {
    const router = useRouter();
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [firestoreError, setFirestoreError] = useState<string | null>(null); // New state for Firestore errors
    // const currentUser = auth.currentUser; // Not strictly needed here as effect uses user from onAuthStateChanged

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => { // Made async
            if (!user) {
                router.push('/');
                setLoadingFavorites(false); // Ensure loading is false if redirected
                setFavoriteRecipes([]); // Clear recipes
                setFirestoreError(null);
            } else {
                setLoadingFavorites(true);
                setFirestoreError(null); // Clear previous error
                const favsCollectionRef = collection(db, "users", user.uid, "favorites");
                try {
                    const querySnapshot = await getDocs(favsCollectionRef);
                    const favs: Recipe[] = [];
                    querySnapshot.forEach((doc) => {
                        favs.push(doc.data() as Recipe);
                    });
                    setFavoriteRecipes(favs);
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                    setFirestoreError("Could not load your favorite recipes. Please try again later.");
                    setFavoriteRecipes([]); // Clear recipes on error
                } finally {
                    setLoadingFavorites(false);
                }
            }
        });
        return () => unsubscribe();
    }, [router]);

    if (loadingFavorites) {
        return (
            <>
                <Head>
                    <title>Loading Favorites - Health Way</title>
                </Head>
                <NavBar arrowBack={false} logout={true} /> {/* Adjust NavBar props as needed */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
                    <CircularProgress />
                </Box>
            </>
        );
    }

    if (!currentUser && !loadingFavorites) { // Check again after loading, though redirect should handle
        return (
            <>
                <Head>
                    <title>My Favorites - Health Way</title>
                </Head>
                <NavBar arrowBack={false} logout={true} />
                <Box sx={{ textAlign: 'center', marginTop: 4, padding: 2 }}>
                    <Typography variant="h6">Please log in to see your favorites.</Typography>
                    <Button variant="contained" onClick={() => router.push('/')} sx={{marginTop: 2}}>Go to Login</Button>
                </Box>
            </>
        );
    }

    if (favoriteRecipes.length === 0) {
        return (
            <>
                <Head>
                    <title>My Favorites - Health Way</title>
                </Head>
                <NavBar arrowBack={false} logout={true} />
                <Box sx={{ textAlign: 'center', marginTop: 4, padding: 2 }}>
                    <Typography variant="h6">You have no favorite recipes yet.</Typography>
                    <Typography variant="body1" sx={{marginTop: 1}}>
                        Start exploring and save your favorite recipes to see them here!
                    </Typography>
                     <Button variant="contained" onClick={() => router.push('/recipes')} sx={{marginTop: 2}}>Find Recipes</Button>
                </Box>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>My Favorites - Health Way</title>
                <meta name="description" content="Your saved favorite recipes" />
            </Head>
            <NavBar arrowBack={false} logout={true} /> {/* Adjust NavBar props as needed */}
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    My Favorite Recipes
                </Typography>
                <Grid container spacing={2}>
                    {favoriteRecipes.map((recipe) => (
                        <Grid item xs={12} sm={6} md={4} key={recipe.uri}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    // Use recipe.image (primary string) or a specific one from recipe.images
                                    image={recipe.image || recipe.images?.SMALL?.url || recipe.images?.THUMBNAIL?.url || '/default-recipe-image.png'}
                                    alt={recipe.label}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {recipe.label}
                                    </Typography>
                                    {/* Optionally, display other info like calories or cuisine type */}
                                    <Typography variant="body2" color="text.secondary">
                                        Calories: {Math.round(recipe.calories)}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ padding: 1, textAlign: 'center' }}>
                                    <Link href={`/recipeDetail?recipeUri=${encodeURIComponent(recipe.uri)}`} passHref>
                                        <Button component="a" variant="outlined" size="small">
                                            View Recipe
                                        </Button>
                                    </Link>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default MyFavoritesPage;
