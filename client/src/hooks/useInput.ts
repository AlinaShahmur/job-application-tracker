import { useState } from "react";


export default function useInput(validatorFunc: any) {
    const [inputState, setInputState] = useState({value: '', touched: false});
    let isInputValid = validatorFunc(inputState.value);

    const setValue = (value: string) => {
        setInputState({value: value, touched: false});
    }

    const reset = () => {
        setInputState({value: '', touched: false});
    }

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setInputState({value: e.target.value, touched:true})
    }

    return {
        enteredValue: inputState.value,
        isTouched: inputState.touched,
        isInputValid,
        inputChangeHandler,
        setValue,
        reset
    }
}