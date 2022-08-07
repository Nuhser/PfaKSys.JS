import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { usePromiseTracker } from "react-promise-tracker";

import "./style.css";

export default function LoadingIndicator() {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <Spinner className="loading-indicator" animation="border" variant="primary" />
    );
}