import { SyntheticEvent, useRef } from "react";
import { BASE_URL } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import CloseButton from "../UI/CloseButton";
import Modal from "../UI/Modal";
import classes from './CreateProcess.module.css'

function CreateProcess(props: any) {
    const inputRef: any = useRef()
    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        let user: any = sessionStorage.getItem('user')
        let user_id: any = JSON.parse(user)._id
        const createdProcess = {
            name: inputRef.current.value,
            user_id
        }
        await fetchData('POST',createdProcess,`${BASE_URL}/processes`)
    }
    return (
        <Modal onClose = {props.onClose}>
                <div className = {classes['create-process']}>
                    <CloseButton onClick = {props.onClose}/>
                    <h2>Add a new Process</h2>
                    <form onSubmit = {submitHandler}>
                        <input type="text" id = "processName" placeholder="Process Name" ref={inputRef}></input>
                        <button type="submit">Create</button>
                    </form>
                </div>
        </Modal>
    )
}

export default CreateProcess