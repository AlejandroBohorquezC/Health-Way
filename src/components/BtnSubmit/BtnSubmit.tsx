import React from 'react'
import { IBtnSubmit } from './BtnSubmit.interface'
import styled from 'styled-components'

const ButtonStyle = styled.input`
    padding: 15px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    background-color: #e0f763;
    color: #fff;
    font-weight: 600;
`;

const BtnSubmit = ({value, type}: IBtnSubmit) => {
  return (
    <ButtonStyle type={type} value={value} />
  )
}

export default BtnSubmit;
