import { useSelector } from "react-redux";
import Process from "./Process";

export default function Processes(props: any) {
    const storeData: any = useSelector(state => state);
    return (
        <ul>
            {storeData.processes.map((process: any) => (
                <Process onClickEditHandler = {(process: any) => props.onClickOpenEditHandler(process)} process = {process}/>
            ))}
        </ul>
    )
}