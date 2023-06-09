import { ChangeEvent, useState } from "react";
import { IUseForm } from "./useForm.interface";


export const useForm = (initialForm: IUseForm = {email: '', password: '', birthDate: ''}) => {

    const [formState, setFormState] = useState(initialForm);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onReset = () => {
        setFormState(initialForm)
    };  

  return {
    ...formState,
    formState,
    onInputChange,
    onReset
  }
}
