import { ICONS } from "../../utils/constants";
import SvgIcon from "../Icons/SvgIcon";
import classes from './CloseButton.module.css'

export default function CloseButton(props: any) {
    return (
        <button className = {classes['close-button']} onClick = {props.onClick}>
            <SvgIcon className="svg-inline--fa fa-times fa-w-11" fill="currentColor" path = {ICONS.path.close_icon} viewBox = {ICONS.viewBox.close_icon} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"  role="img"/>
        </button>
    )
}