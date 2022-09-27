import { SyntheticEvent, useState } from "react";
import { FileObject } from "../types";
import { fileValidator } from "../utils/utils";

interface FileInputValue {
    value: FileObject;
    touched: boolean;
}

export default function useFileInput() {
    const [file, setFile] = useState
                                        <FileInputValue>({
                                            value: {
                                                name: "", 
                                                type: "", 
                                                base64:""
                                            },
                                            touched: false});

    let isInputValid = fileValidator(file.value);

    const setValue = (value: FileObject) => {
        setFile({value: value, touched: false});
    }

    const reset = () => {
        setFile({ value:{
                            name: "", 
                            type: "", 
                            base64:""
                        }, 
                        touched: false
                       });
    }

    const inputChangeHandler = (fileObj: FileObject) => {
        setFile({value: fileObj, touched:true})
    }

    return {
        enteredValue: file.value,
        isTouched: file.touched,
        isInputValid,
        inputChangeHandler,
        setFile,
        reset
    }
}