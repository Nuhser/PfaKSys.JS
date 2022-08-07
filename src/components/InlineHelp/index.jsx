import React from "react";
import Button from "react-bootstrap/button";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Row from "react-bootstrap/Row";
import { withTranslation } from "react-i18next";
import { BsQuestionCircle } from "react-icons/bs";

import "./style.css";

class InlineHelp extends React.Component {
    render() {
        const { helpTitle = '', helpText, trigger = 'hover', helpLeft = false, t } = this.props;

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
                            <Button className="inline-help" variant="light">
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
                            <Button className="inline-help" variant="light">
                                <BsQuestionCircle size="18" />
                            </Button>
                        </OverlayTrigger>
                    </Col>
                )}
            </Row>
        );
    }
}

export default withTranslation() (InlineHelp);