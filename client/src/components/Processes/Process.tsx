import { Link } from "react-router-dom";
import classes from './Process.module.css'
import { ICONS } from "../../utils/constants";
import SvgIcon from "../Icons/SvgIcon";
import ItemWrapper from "../UI/ItemWrapper";

export default function Process(props: any) {
    const process = props.process;
    return (
        <ItemWrapper>
            <div className={classes.process}>
                <Link to = {`/${props.process._id}`} state = {{process}}>{props.process.name}</Link>
                <button onClick={() => props.onClickEditHandler(process)} style={{backgroundColor: 'white', border: 'none'}}>
                    <SvgIcon style = {{fill: "#8a996c", width: 15, height: 15}}path = {ICONS.path.edit_icon} viewBox = {ICONS.viewBox.edit_icon}/>
                </button>
            </div>
        </ItemWrapper>
    )
}