import { useSelector } from "react-redux";
import Process from "./Process";

export default function Processes(props: any) {
    const processes: any = useSelector((state: any) => state.process.processes);
    
    return (
        <ul>
            {processes.map((process: any) => (
                <Process onClickEditHandler = {(process: any) => props.onClickOpenEditHandler(process)} process = {process}/>
            ))}
        </ul>
    )
}