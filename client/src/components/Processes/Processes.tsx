import React from "react";
import { useSelector } from "react-redux";
import Process from "./Process";

const Processes = React.memo(() => {
    const processes: any = useSelector((state: any) => state.process.processes);
    return (
        <ul>
            {processes.map((process: any) => (
                <Process 
                    key = {process._id}  
                    process = {process}
                />
            ))}
        </ul>
    )
})

export default Processes