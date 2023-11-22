import { useForm } from "@/hooks/useForm";
import { TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { ISeeker, ISeekerStyle } from "./Seeker.interface";
import { baseURL } from "@/utils/axiosBaseUrl";

const SeekerStyle = styled.form<ISeekerStyle>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 13px 0px;
    gap: 5px;
`;

const Seeker = ({setHits}: ISeeker) => {

    const {onInputChange, onReset, formState} = useForm();
    const [error, setError] = useState('');

    const {recipe} = formState;

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const {data, ...response} = await baseURL.get(`v2?type=public&app_id=${process.env.NEXT_PUBLIC_EDAMAN_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAN_KEY}&q=${recipe}`);
            if(response.status === 404) {
                setError('Ha ocurrido un error. Intente nuevamente.');
                onReset();
                return;
            };
            if (data.count === 0) {
                setError('No se encontraron recetas con el nombre indicado. Intente otra vez.');
                onReset();
                return;
            };
            const {hits} = data;
            setHits(hits);
            onReset();
        } catch (error) {
            console.error(error);
        };
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
            />
            <Button type="submit" variant="contained">Buscar</Button>
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