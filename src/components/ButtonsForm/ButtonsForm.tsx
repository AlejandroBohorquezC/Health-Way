import styled from "styled-components"
import { IButtons } from "./ButtonsForm.interface";
import Button from '@mui/material/Button';

const Buttons = styled.div<IButtons>`
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 20px;
    margin: 8px -8px;
`;

const ButtonsForm = () => {
  return (
    <Buttons>
        <Button variant="text">Registrarse</Button>
        <Button variant="text">Ingresar</Button>
    </Buttons>
  )
}

export default ButtonsForm;