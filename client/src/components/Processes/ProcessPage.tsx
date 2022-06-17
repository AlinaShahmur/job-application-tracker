import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL_DEV } from "../../utils/constants";
import { fetchData } from "../../utils/request_client";

export default function ProcessPage(props: any) {
    const location: any = useLocation();
    const { process } = location.state

    return (
        <div>
            <Link to = {`${location.pathname}/applications`} state = {{process}}>Applications</Link>
            <Link to = {`${location.pathname}/dashboard`} state = {{process}}>Dashboard</Link>
        </div>
    )
}