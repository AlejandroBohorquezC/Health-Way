import { Dispatch, SetStateAction } from "react";


export interface IButtons {
    display?: string;
    justifyContent?: string;
    gap?: string;
    padding?: string;
    margin?: string;
}

export interface IButtonsForm {
    setIsLogin: Dispatch<SetStateAction<boolean>>
}