import { useAuth0 } from "@auth0/auth0-react";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import useInput from "../../hooks/useInput";
import { BASE_URL } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import { textValidator } from "../../utils/utils";
import Modal from "../UI/Modal";
import TextInput from "../UI/TextInput";
import classes from './ProcessModal.module.css'

export default function ProcessModal(props: any) {
    const {
        enteredValue: processNameValue,
        isTouched: isProcessNameTouched,
        isInputValid: isProcessNameValid,
        setValue: setProcessNameValue,
        inputChangeHandler: processNameInputChangeHandler,
        reset: resetProcessNameInput
    } = useInput(textValidator);

    const {isAuthenticated, user} = useAuth0();
    console.log({user});
    console.log(props.isEdit);
    
    
    const [isFormSending, setIsFormSending] = useState(false);
    const [process, setProcess] = useState({_id:"", name: ""});

    useEffect(() => {
        if (props.isEdit && localStorage.getItem("editingProcess")) {
            const process: any = localStorage.getItem("editingProcess")
            const parsedProcess: any = JSON.parse(process);
            setProcess(parsedProcess);
            setProcessNameValue(parsedProcess.name)
        }
    },[])

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (isFormAddProcessValid && isFormAddProcessTouched) {
            let email  = user?.email;

            const createdProcess =  {
                name: processNameValue,
                user: email
            };
            console.log({processNameValue});
            
            const method = props.isEdit ? 'PUT' : 'POST';
            
            const URI = props.isEdit && process
                            ? `${BASE_URL}/processes/${process._id}`
                            : `${BASE_URL}/processes`
            await fetchData(method,createdProcess,URI);
            resetProcessNameInput();
        }
    }

    const formAddProcessClasses = isFormSending ? "_sending" : "";
    const isFormAddProcessTouched = isProcessNameTouched;
    const isFormAddProcessValid = isProcessNameValid;

    return (
        <Modal onClose = {props.onClose}>
            <div className = {classes['process-modal']}>
                <h2>{props.isEdit? "Edit" : "Add a New"} Process</h2>
                <form onSubmit = {submitHandler} className = {formAddProcessClasses}>
                        <TextInput
                            id = "newProcessInput"
                            label = "Process Name"
                            type = "text"
                            value = {processNameValue}
                            onChange = {processNameInputChangeHandler}
                        />
                    
                    <button type="submit">{props.isEdit? "Edit" : "Create"}</button>
                </form>
            </div>
        </Modal>
    )
}