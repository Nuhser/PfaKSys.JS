import React from "react";
import Toast from "react-bootstrap/Toast";
import { withTranslation } from "react-i18next";
import { AiOutlineInfoCircle } from "react-icons/ai"
import { BiErrorAlt } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { MdNotes } from "react-icons/md";

import "./style.css";

class PfaksysToast extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeShow = this.onChangeShow.bind(this);

        this.state = {
            toastkey: props.toastKey,
            show: true
        }
    }

    onChangeShow(e) {
        this.setState({ toastkey: this.state.toastkey, show: e.target.value });
    }

    render() {
        const {
            title,
            body,
            timestamp,
            variant = '',
            delay = 10000,
            closeable = true,
            animation = true,
            t
        } = this.props;

        let bg;
        switch(variant) {
            case 'error':
                bg = 'danger';
                break;
            case 'info':
                bg = 'primary';
                break;
            case 'success':
                bg = 'success';
                break;
            case 'warning':
                bg = 'warning';
                break;
            default:
                bg = '';
        }

        return (
            <Toast 
                bg={bg}
                show={this.state.show}
                animation={animation}
                delay={delay}
                autohide={delay > 0}
                onClose={
                    () => {
                        this.setState({show: false});
                        window.toastContainer.removeToast(this.state.toastkey)
                    }
                }
            >
                <Toast.Header closeButton={closeable}>
                    {variant === '' && (
                        <MdNotes className="me-2" size="25" />
                    )}
                    {variant === 'error' && (
                        <BiErrorAlt className="me-2 error-icon" size="25" />
                    )}
                    {variant === 'info' && (
                        <AiOutlineInfoCircle className="me-2 info-icon" size="22" />
                    )}
                    {variant === 'success' && (
                        <BsCheckCircle className="me-2 success-icon" size="22" />
                    )}
                    {variant === 'warning' && (
                        <IoWarningOutline className="me-2 warning-icon" size="25" />
                    )}

                    <strong className="me-auto">{t(title)}</strong>

                    {timestamp && (
                        <small>{timestamp}</small>
                    )}

                </Toast.Header>

                <Toast.Body>{body}</Toast.Body>
            </Toast>
        );
    }
}

export default withTranslation()(PfaksysToast);