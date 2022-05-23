import classes from './Modal.module.css'

function Modal(props: any) {
    return (
        <div>
            <div className = {classes.backdrop} onClick = {props.onClose}></div>
            <div className = {classes.modal}>
                <div className = {classes.content}>{props.children}</div>
            </div>
        </div>
    )
}

export default Modal