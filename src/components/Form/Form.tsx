import styled from "styled-components"
import { IFormStyle } from "./Form.interface";
import Field from "../Field/Field";
import BtnSubmit from "../BtnSubmit/BtnSubmit";
import Link from "next/link";


const FormStyle = styled.form<IFormStyle>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 8px -8px;
    height: 200px;
`;

const Form = () => {

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
  return (
    <FormStyle
        onSubmit={handleSubmit}
    >
        <Field 
            label="Correo"
            type="text"
            htmlForName="email"
        />
        <Field 
            label="Contraseña"
            type="password"
            htmlForName="password"
        />
        <Link href={'/recipes'}>
            <BtnSubmit 
                value="Iniciar Sesión"
                type="submit"
                />
            </Link>
    </FormStyle>
  )
}

export default Form;
