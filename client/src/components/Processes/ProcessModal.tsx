import { useAuth0 } from "@auth0/auth0-react";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import useInput from "../../hooks/useInput";
import { BASE_URL } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import { textValidator } from "../../utils/utils";
import Loader from "../UI/Loader";
import Modal from "../UI/Modal";
import TextInput from "../UI/TextInput";
import classes from './ProcessModal.module.css'

export default function ProcessModal(props: any) {
    const { getIdTokenClaims } = useAuth0();
    const {
        enteredValue: processNameValue,
        isInputValid: isProcessNameValid,
        setValue: setProcessNameValue,
        inputChangeHandler: processNameInputChangeHandler,
        hasError: processNameHasError,
        reset: resetProcessNameInput
    } = useInput(textValidator);

    const { user} = useAuth0();
    const [isFormSending, setIsFormSending] = useState(false);
    const [process, setProcess] = useState({_id:"", name: ""});

    useEffect(() => {
        if (props.isEdit && localStorage.getItem("editingProcess")) {
            const process: any = localStorage.getItem("editingProcess")
            const parsedProcess: any = JSON.parse(process);
            setProcess(parsedProcess);
            setProcessNameValue(parsedProcess.name)
        }
        console.log("Process Modal");
        
    },[])

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (isFormAddProcessValid) {
            setIsFormSending(true);
            let email  = user?.email;

            const createdProcess =  {
                name: processNameValue,
                user: email
            };
            const token = await getIdTokenClaims();
            const method = props.isEdit ? 'PUT' : 'POST';
            
            const URI = props.isEdit && process
                            ? `${BASE_URL}/processes/${process._id}`
                            : `${BASE_URL}/processes`
            await fetchData(method,JSON.stringify(createdProcess),URI, token?.__raw);
            setIsFormSending(false);
            resetProcessNameInput();
        }
    }

    const formAddProcessClasses = isFormSending ? "_sending" : "";
    const isFormAddProcessValid = isProcessNameValid;
    const modalContent = isFormSending 
                            ? <Loader size = {5}/> 
                            : <form onSubmit = {submitHandler} className = {formAddProcessClasses}>
                                <TextInput
                                    id = "newProcessInput"
                                    label = "Process Name"
                                    type = "text"
                                    value = {processNameValue}
                                    onChange = {processNameInputChangeHandler}
                                    hasError = {processNameHasError}
                                />
                                <button type="submit">{props.isEdit? "Edit" : "Create"}</button>
                               </form>

    return (
        <Modal onClose = {props.onClose}>
            <div className = {classes['process-modal']}>
                <h2>{props.isEdit? "Edit" : "Add a New"} Process</h2>
                {modalContent}
            </div>
        </Modal>
    )
}