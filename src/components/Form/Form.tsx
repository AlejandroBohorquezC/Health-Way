import { useState } from "react";
import styled from "styled-components"
import { IForm, IFormStyle } from "./Form.interface";
import {Button, OutlinedInput, InputLabel, InputAdornment, IconButton, FormControl, TextField, Alert}from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from "@/hooks/useForm";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth, db } from "../../../config/firebaseAuth";
import { useRouter } from "next/router";
import { addDoc, collection } from "firebase/firestore";


const FormStyle = styled.form<IFormStyle>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 8px -8px;
    height: auto;
`;

const Form = ({isLogin}: IForm) => {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({
        isError: false,
        message: ''
    });
    const {onInputChange, formState} = useForm();
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const {email, password, verifyPassword, name, birthDate, phone} = formState;
        try {
            if (isLogin) {
                const {user} = await signInWithEmailAndPassword(auth, email, password);
                if(user.uid) return router.push('/recipes');
            };
            
            if (password.length < 6) return setError({ isError: true, message: 'Contraseña mínimo de 6 carácteres'});
            if (verifyPassword !== password) return setError({ isError: true, message: 'Las contraseñas no coinciden'});
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, {
                displayName: name
            });
            await addDoc(collection(db, "users"), {
                name,
                phone,
                birthDate: birthDate.toString(),
                email,
                uid: user.uid
            });
            if(user.uid) return  router.push('/recipes');
        } catch (error) {
            console.error(error);
        };
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

  return (
    <FormStyle
        onSubmit={handleSubmit}
    >
        {!isLogin && 
        <>
            <TextField
                required
                id="outlined-basic" 
                label="Nombre" 
                variant="outlined" 
                type='text'
                name="name"
                onChange={onInputChange} 
            />
            <TextField
                id="outlined-basic" 
                label="Celular" 
                variant="outlined" 
                type='number'
                name="phone"
                onChange={onInputChange} 
            />
            <TextField
                required
                sx={{ width: '26ch' }}
                id="outlined-basic" 
                label="Fecha de Nacimiento" 
                variant="outlined" 
                InputLabelProps={{
                    shrink: true,
                }}
                type='date'
                name="birthDate"
                onChange={onInputChange} 
            />
        </>
        }   
        <TextField
            required
            id="outlined-basic"
            label="Correo" 
            variant="outlined" 
            type='email'
            name="email"
            onChange={onInputChange} 
        />
        <FormControl required sx={{ width: '26ch' }} variant="outlined">
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
        {!isLogin && 
        <FormControl required sx={{ width: '26ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Verify Password</InputLabel>
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
                label="Verify Password"
                name="verifyPassword"
                onChange={onInputChange}
            />
        </FormControl>}
        {error.isError &&
            <Alert variant="outlined" severity="error">
                {error.message}
            </Alert>
        }
        <Button type="submit" variant="contained">{!isLogin ? 'Registrarse' : 'Iniciar Sesión'}</Button>
    </FormStyle>
  )
}

export default Form;
