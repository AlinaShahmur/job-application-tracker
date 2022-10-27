import { useAuth0 } from "@auth0/auth0-react";
import { SyntheticEvent, useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import { BASE_URL } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import { dateValidator, formatDate, textValidator } from "../../utils/utils";
import Loader from "../UI/Loader";
import Modal from "../UI/Modal";
import TextInput from "../UI/TextInput";

function AddStepModal(props: any){
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setStatus(props.status);
    },[]);
    const {
        enteredValue: eventNameInputValue,
        inputBlurHandler: eventNameInputBlurHandler,
        isInputValid: eventNameInputValid,
        hasError: eventNameInputHasError,
        inputChangeHandler: eventNameInputChangeHandler,
        setValue: setEventNameInputValue,
        reset: resetEventNameInput
    } = useInput(textValidator);
    const {
        enteredValue: dateInputValue,
        inputBlurHandler:dateInputBlurHandler,
        isInputValid:dateInputValid,
        hasError: dateInputHasError,
        inputChangeHandler: dateInputChangeHandler,
        setValue: setDateInputValue,
        reset: resetDateInput
    } = useInput(dateValidator);

    const { getIdTokenClaims } = useAuth0()

    const submitAddEventFormHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        const token = await getIdTokenClaims();
        if (isFormAddEventValid) {
            
            setIsLoading(true);
            const newEvent = {
                date: dateInputValue,
                stage_name: eventNameInputValue
            }
            const body = {
                status,
                history: [
                    ...props.history,
                    newEvent
                ]
            }    
            
            await fetchData('PUT', JSON.stringify(body), `${BASE_URL}/api/applications/${props.application_id}`, token?.__raw);    
            resetForm();
            setIsLoading(false);
        }
    }
    const resetForm = () => {
        resetEventNameInput();
        resetDateInput();  
    }
    const isFormAddEventValid = eventNameInputValid && dateInputValid;
    const modalContent = isLoading 
                            ? <Loader size = {10}/>
                            : <div>
                                <form className="form" onSubmit={submitAddEventFormHandler}>
                                    <h2>Add new event</h2>
                                    <TextInput
                                        id = "stepName"
                                        label = "Step Name"
                                        type = "text"
                                        value = {eventNameInputValue}
                                        onChange = {eventNameInputChangeHandler}
                                        hasError = {eventNameInputHasError}
                                        onBlur = {eventNameInputBlurHandler}
                                    />
                                    <div className={ `${dateInputHasError ?  "invalid form-group" : "form-group"}`}>
                                        <label htmlFor="startDateInput">The date of the event</label> <br></br>
                                        <input type = "date" id = "startDateInput" max={formatDate(new Date())} onChange={dateInputChangeHandler} onBlur = {dateInputBlurHandler} value = {dateInputValue}></input>
                                    </div>
                                    <div>
                                        <p>Set status</p>
                                        <input 
                                            type="radio" 
                                            name="statusInput" 
                                            value="pending" 
                                            checked = {status === "pending"}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.target.value)}
                                        />Pending
                                        <input 
                                            type="radio" 
                                            name="statusInput" 
                                            value="fulfilled" 
                                            checked = {status === "fulfilled"}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.target.value)}
                                        /> Fullfilled
                                        <input 
                                            type="radio" 
                                            name="statusInput" 
                                            value="rejected" 
                                            checked = {status === "rejected"}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.target.value)}
                                        /> Rejected
                                    </div>
                                    <button>Add</button>
                                </form>
                            </div>
    return (
        <Modal onClose = {props.onClose}>
            {modalContent}
        </Modal>
    )
}

export default AddStepModal;