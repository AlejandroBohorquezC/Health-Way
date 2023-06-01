import { ChangeEvent, useState } from "react";


export const useForm = (initialForm = {}) => {

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
