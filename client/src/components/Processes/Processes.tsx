import { useSelector } from "react-redux";
import Process from "./Process";
import classes from './Processes.module.css'

export default function Processes(props: any) {
    const storeData: any = useSelector(state => state);
    return (
        <ul className={classes["process-list"]}>
            {storeData.processes.map((process: any) => (
                <Process onClickEditHandler = {(process: any) => props.onClickOpenEditHandler(process)} process = {process}/>
            ))}
        </ul>
    )
}