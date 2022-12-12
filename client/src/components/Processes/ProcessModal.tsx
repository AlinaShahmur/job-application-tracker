import { useAuth0 } from "@auth0/auth0-react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { addProcess, updateProcess } from "../../store/process-actions";
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
    const dispatch = useDispatch();
    

    useEffect(() => {
        if (props.isEdit && localStorage.getItem("editingProcess")) {
            const process: any = localStorage.getItem("editingProcess")
            const parsedProcess: any = JSON.parse(process);
            setProcessNameValue(parsedProcess.name)
        }       
    },[])

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (isFormAddProcessValid) {
            setIsFormSending(true);
            let email  = user?.email;

            const processToSend =  {
                name: processNameValue,
                user: email,
            };
            const token = await getIdTokenClaims();

            if (!props.isEdit) {
                dispatch(addProcess(processToSend, token?.__raw))
            } else {
                dispatch(updateProcess(processToSend, token?.__raw))
            }
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