import { SyntheticEvent, useRef } from "react";
import { BASE_URL } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";
import CloseButton from "../UI/CloseButton";
import Modal from "../UI/Modal";
import classes from './ProcessModal.module.css'

export default function ProcessModal(props: any) {
    const inputRef: any = useRef()
    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        let user: any = sessionStorage.getItem('user')
        let user_id: any = JSON.parse(user)._id
        const process = {
            name: inputRef.current.value,
            user_id
        }
        const method = props.isEdit ? 'PUT' : 'POST';
        await fetchData(method,process,`${BASE_URL}/processes`)
    }
    return (
        <Modal onClose = {props.onClose}>
            <div className = {classes['process-modal']}>
                <CloseButton onClick = {props.onClose}/>
                <h2>{props.isEdit? "Edit" : "Add a New"} Process</h2>
                <form onSubmit = {submitHandler}>
                    <input type="text" id = "processName" placeholder="Process Name" ref={inputRef}></input>
                    <button type="submit">{props.isEdit? "Edit" : "Create"}</button>
                </form>
            </div>
        </Modal>
    )
}