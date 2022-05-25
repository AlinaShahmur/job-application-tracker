import { Link } from "react-router-dom";
import { ICONS } from "../../utils/constants";
import SvgIcon from "../Icons/SvgIcon";
import classes from './Process.module.css'

export default function Process(props: any) {
    const process = props.process;
    return (
        <li className={classes.process}> 
            <Link to = {`/${props.process._id}/applications`} state = {{process}}>{props.process.name}</Link>
            <button onClick={() => props.onClickEditHandler(process)} style={{backgroundColor: 'white', border: 'none'}}>
                <SvgIcon style = {{fill: "#8a996c", width: 15, height: 15}}path = {ICONS.path.edit_icon} viewBox = {ICONS.viewBox.edit_icon}/>
            </button>
        </li>
    )
}