import { useSelector } from "react-redux";
import ErrorBoundary from "../../utils/error-boundary";
import Process from "./Process";

export default function Processes(props: any) {
    const processes: any = useSelector((state: any) => state.process.processes);
    
    return (
        <ErrorBoundary>
        <ul>
            {processes.map((process: any) => (
                <Process 
                    key = {process._id} 
                    onClickEditHandler = {(process: any) => props.onClickOpenEditHandler(process)} 
                    process = {process}
                />
            ))}
        </ul>
        </ErrorBoundary>
    )
}