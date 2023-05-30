import styled from "styled-components"
import { IButtons } from "./ButtonsForm.interface";

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
        <button>Iniciar Sesion</button>
        <button>Registrarse</button>
    </Buttons>
  )
}

export default ButtonsForm;