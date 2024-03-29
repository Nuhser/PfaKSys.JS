import React from "react";
import Button from "react-bootstrap/button";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Row from "react-bootstrap/Row";
import { BsQuestionCircle } from "react-icons/bs";

import { withTranslation } from "../../services/CustomWrappers";

import "./style.css";

class InlineHelp extends React.Component {
    render() {
        const { helpTitle = '', helpText, clickToTrigger = false, helpLeft = false, t } = this.props;
        const trigger = clickToTrigger ? ['click'] : ['hover', 'focus'];

        return (
            <Row>
                {helpLeft && (
                    <Col xs="auto">
                        <OverlayTrigger
                            trigger={trigger}
                            placement="right"
                            overlay={
                                <Popover>
                                    {helpText.length > 0 && (
                                        <Popover.Header as="h3">
                                            {t(helpTitle)}
                                        </Popover.Header>
                                    )}
                                    <Popover.Body>
                                        {t(helpText)}
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <Button className="inline-help" variant="light" tabIndex={-1}>
                                <BsQuestionCircle size="18" />
                            </Button>
                        </OverlayTrigger>
                    </Col>
                )}

                <Col>
                    {this.props.children}
                </Col>
                
                {!helpLeft && (
                    <Col xs="auto">
                        <OverlayTrigger
                            trigger={trigger}
                            placement="left"
                            overlay={
                                <Popover>
                                    {helpText.length > 0 && (
                                        <Popover.Header as="h3">
                                            {t(helpTitle)}
                                        </Popover.Header>
                                    )}
                                    <Popover.Body>
                                        {t(helpText)}
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <Button className="inline-help" variant="light" tabIndex={-1}>
                                <BsQuestionCircle size="18" />
                            </Button>
                        </OverlayTrigger>
                    </Col>
                )}
            </Row>
        );
    }
}

export default withTranslation(InlineHelp);