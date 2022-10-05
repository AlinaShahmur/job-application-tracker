import Modal from "./Modal";

export default function Alert(props: any) {
    return (
        <Modal onClose = {props.onClose}>
            <div>
                <h2>{props.title}</h2>
            </div>
            <div>
                <p>{props.message}</p>
                <button onClick={props.onBtnClick}>{props.btnLabel}</button>
            </div>
        </Modal>
    )
}