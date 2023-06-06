import styled from "styled-components"
import { IButtons, IButtonsForm } from "./ButtonsForm.interface";
import Button from '@mui/material/Button';

const Buttons = styled.div<IButtons>`
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 20px;
    margin: 8px -8px;
`;

const ButtonsForm = ({setIsLogin}: IButtonsForm) => {
  return (
    <Buttons>
        <Button 
          variant="text"
          onClick={() => setIsLogin(true)}
        >
          Inicio de Sesión
        </Button>
        <Button 
          variant="text"
          onClick={() => setIsLogin(false)}
        >
          Registrar
        </Button>
    </Buttons>
  )
}

export default ButtonsForm;