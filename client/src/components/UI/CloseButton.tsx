import CloseIcon from "../Icons/CloseIcon";
import classes from './CloseButton.module.css'

export default function CloseButton(props: any) {
    return (
        <button className = {classes['close-button']} onClick = {props.onClick}>
            <CloseIcon/>
        </button>
    )
}