import { useForm } from "@/hooks/useForm";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ISeekerStyle } from "./Seeker.interface"; // Assuming ISeeker is not used
import { baseURL } from "@/utils/axiosBaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes, setLoading, setSearchAttempted } from "@/store/slices/recipesSlice";
import { RootState } from "@/store/store";

const SeekerStyle = styled.form<ISeekerStyle>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 13px 0px;
    gap: 5px;
`;

const Seeker = () => {
    const { onInputChange, onReset, formState } = useForm();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.recipes); // Get loading state

    const { recipe } = formState;

    useEffect(() => {
        setTimeout(() => {
            setError('');
        }, 3000);
    }, [error]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!recipe || recipe.trim() === "") {
            setError('Please enter an ingredient to search.');
            return;
        }

        dispatch(setLoading(true));
        dispatch(setSearchAttempted(true));

        try {
            const { data, ...response } = await baseURL.get(`v2?type=public&app_id=${process.env.NEXT_PUBLIC_EDAMAN_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAN_KEY}&q=${recipe}`);

            // The response object itself might not have a status property directly in axios response.data
            // For Edamam, a 200 OK with data.count === 0 is a valid "no results" scenario.
            // Errors like 404 would typically throw and be caught by the catch block.
            // However, keeping the explicit error for "Ha ocurrido un error" if specific conditions met.

            if (data.count === 0) {
                setError('No se encontraron recetas con el nombre indicado. Intente otra vez.');
                dispatch(setRecipes([]));
                // onReset(); // Keep text for user
                // return; // No need to return here, finally will run.
            } else {
                 const { hits } = data;
                 dispatch(setRecipes(hits));
                 setError(''); // Clear previous errors if any
            }
            onReset(); // Reset form on successful search or no results
        } catch (err) { // Changed error to err to avoid conflict with useState error
            console.error(err);
            setError('Ha ocurrido un error. Intente nuevamente.');
            dispatch(setRecipes([])); // Clear recipes on error
        } finally {
            dispatch(setLoading(false));
        }
    };

  return (
    <>
        <SeekerStyle onSubmit={handleSubmit}>
            <TextField
                id="outlined-basic" 
                label="Ingresar ingrediente" 
                variant="outlined" 
                type='text'
                name="recipe"
                value={recipe}
                onChange={onInputChange}
                disabled={loading} // Disable input while loading
            />
            <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Buscar"}
            </Button>
        </SeekerStyle>
        {error &&
            <Alert variant="outlined" severity="error">
                {error}
            </Alert>
        }
    </>
  )
}

export default Seeker