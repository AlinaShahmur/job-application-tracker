import { Link } from "react-router-dom";
import EditIcon from "../Icons/EditIcon";
import classes from './Process.module.css'

export default function Process(props: any) {
    const process = props.process;
    return (
        <li className={classes.process}> 
            <Link to = {`/${props.process._id}/applications`} state = {{process}}>{props.process.name}</Link>
            <button onClick={() => props.onClickEditHandler(process)} style={{backgroundColor: 'white', border: 'none'}}>
                <EditIcon style = {{fill: "#8a996c", width: 15, height: 15}}/>
            </button>
        </li>
    )
}