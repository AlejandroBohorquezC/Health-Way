import { useState } from "react";
import Link from "next/link";
import styled from "styled-components"
import { IFormStyle } from "./Form.interface";
import {Button, OutlinedInput, InputLabel, InputAdornment, IconButton, FormControl}from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from "@/hooks/useForm";


const FormStyle = styled.form<IFormStyle>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 8px -8px;
    height: 200px;
`;

const Form = () => {

    const [showPassword, setShowPassword] = useState(false);
    const {onInputChange} = useForm();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

  return (
    <FormStyle
        onSubmit={handleSubmit}
    >
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Correo</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type='text'
                label="Correo"
                name="correo"
                onChange={onInputChange}
            />
        </FormControl>
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
                name="password"
                onChange={onInputChange}
            />
        </FormControl>
        <Link href={'/recipes'}>
            <Button type="submit" variant="contained">Iniciar Sesión</Button>
        </Link>
    </FormStyle>
  )
}

export default Form;
