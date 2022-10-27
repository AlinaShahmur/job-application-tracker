import { useReducer } from "react";

interface InputState {
    value: string;
    touched: boolean;
}

const initialInputState: InputState = {
    value: "",
    touched: false
}

function inputStateReducer(state: any, action: any): InputState {
    switch (action.type) {
        case 'SET_VALUE': {
            return {value: action.val, touched: false};
        }
        case 'CHANGE': {
            return {value: action.val, touched: state.touched};
        }
        case 'RESET':
        default : {
            return {value: "", touched: false};
        }
        case 'BLUR': {
            return {value: state.value, touched: true};
        }
    }
}

export default function useInput(validatorFunc: any) {
    const [inputState, dispatchInput] = useReducer(inputStateReducer, initialInputState);
    

    let isInputValid = validatorFunc(inputState.value);
    
    let hasError = !isInputValid && inputState.touched;

    const setValue = (value: string) => {
        dispatchInput({type:"SET_VALUE", val: value})
    }

    const reset = () => {
        dispatchInput({type:"RESET"})
    }

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

        dispatchInput({type:"CHANGE", val: e.target.value})
    }

    const inputBlurHandler = () => {
        dispatchInput({type:"BLUR"})
    }

    return {
        enteredValue: inputState.value,
        inputBlurHandler,
        isInputValid,
        hasError,
        inputChangeHandler,
        setValue,
        reset
    }
}