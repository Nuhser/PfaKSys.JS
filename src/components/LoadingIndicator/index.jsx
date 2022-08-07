import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { usePromiseTracker } from "react-promise-tracker";

import "./style.css";

export default function LoadingIndicator() {
    const { promiseInProgress } = usePromiseTracker();

    useEffect(() => {
        document.body.style.pointerEvents = promiseInProgress ? 'none' : 'auto';
    });

    return (
        promiseInProgress &&
        <div>
            <div className="loading-grayout" />
            <Spinner className="loading-indicator" animation="border" variant="primary" />
        </div>
    );
}