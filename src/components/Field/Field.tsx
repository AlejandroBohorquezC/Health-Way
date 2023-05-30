import styled from "styled-components"
import { IField, IFieldStyle } from "./Field.interface"

const FieldStyle = styled.div<IFieldStyle>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 60%;
    font-size: 18px;
    border-radius: 10px;
    margin: 10px;
    background-color: #88d84e;
    color: #e0f763;
    padding: 10px;
`;

const Field = ({label, type, htmlForName}: IField) => {
  return (
    <FieldStyle>
        <label htmlFor={htmlForName}>{label}</label>
        <input id={htmlForName} type={type} />
    </FieldStyle>
  )
}

export default Field;