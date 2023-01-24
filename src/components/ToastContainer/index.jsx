import React from "react";
import ToastContainer from "react-bootstrap/ToastContainer";

// TODO: Make container stick to bottom when scrolling
export default class PfaksysToastContainer extends React.Component {
    constructor(props) {
        super(props);

        this.addToast = this.addToast.bind(this);
        this.removeToast = this.removeToast.bind(this);

        this.state = {
            toasts: []
        }
    }

    getToastKey(title) {
        return this.state.toasts.length + '-' + title + '-toast';
    }

    addToast(key, toast) {
        this.setState({ toasts: this.state.toasts.concat([{key: key, toast: toast}])});
    }

    removeToast(key) {
        this.setState({
            toasts: this.state.toasts.filter(
                entry => (entry.key !== key)
            ) 
        })
    }

    render() {
        return (
            <ToastContainer position="bottom-end" className="p-3">
                {this.state.toasts.map(
                    (entry) => (entry.toast)
                )}
            </ToastContainer>
        );
    }
}