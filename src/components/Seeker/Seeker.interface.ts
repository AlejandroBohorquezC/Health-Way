import { Dispatch, SetStateAction } from "react";
import { Hits } from "../RecipeList/RecipeList.interface";

export interface ISeekerStyle {
    display?: string;
    justifyContent?: string;
    alignItems?: string;
    margin?: string;
    gap?: string;
}

export interface ISeeker {
    setHits: Dispatch<SetStateAction<Hits[] | undefined>>;
}