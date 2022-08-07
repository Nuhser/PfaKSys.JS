import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import { withTranslation } from "react-i18next";
import { BsQuestionCircle } from "react-icons/bs";
import { trackPromise } from "react-promise-tracker";

import { setActiveSidebarItem } from '../../../components/Sidebar/service';
import { ItemCondition } from "../services/ItemCondition";

class AddItemForm extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNoQuantity = this.onChangeNoQuantity.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeCondition = this.onChangeCondition.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            no_quantity: false,
            quantity: 0,
            condition: "",
            description: "",
    
            conditions: []
        };
    }

    // gets called as soon as the component is mounted (directly before the first render)
    componentDidMount() {
        setActiveSidebarItem('itemsAddSidebarItem')

        this.setState({
            conditions: Object.keys(ItemCondition),
            condition: 'UNKNOWN'
        });
    }

    onChangeName(e) {
        this.setState({ name: e.target.value });
    }

    onChangeNoQuantity(e) {
        this.setState({ no_quantity: e.target.checked });
    }

    onChangeQuantity(e) {
        this.setState({ quantity: e.target.value });
    }

    onChangeCondition(e) {
        this.setState({ condition: e.target.value });
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newItem = {
            name: this.state.name,
            no_quantity: this.state.no_quantity,
            quantity: this.state.no_quantity ? 0 : this.state.quantity,
            condition: this.state.condition,
            description: this.state.description
        };

        console.log(newItem);

        trackPromise(axios.post(
            'http://localhost:5000/items/add',
            newItem
        ).then(
            res => {
                console.log(res.data.message);

                if (e.target.name === 'saveButton') {
                    window.location = '/items/add';
                }
                else {
                    window.location = `/items/${res.data.id}`;
                }
        }).catch(
            error => {
                if (error.response) {
                    console.log(error.response.data);
                }
        }));
    }

    render() {
        const { t } = this.props;

        return (
            <div>
                <h3>Create New Item</h3>

                <form onSubmit={this.onSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>{t("common.name")}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={this.state.name}
                            maxLength={100}
                            onChange={this.onChangeName}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formQuantity">
                        <Form.Label>{t("items.quantity")}</Form.Label>
                            <Row>
                                <Col>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            value={this.state.quantity}
                                            min={-1}
                                            onChange={this.onChangeQuantity}
                                            disabled={this.state.no_quantity}
                                        />
                                        <InputGroup.Text>{t('items.noQuantity')}</InputGroup.Text>
                                        <InputGroup.Checkbox
                                            checked={this.state.no_quantity}
                                            onChange={this.onChangeNoQuantity}
                                            aria-label="Item's quantity is unknown"
                                        />
                                    </InputGroup>
                                </Col>

                                <Col xs="auto">
                                    <OverlayTrigger
                                        className="ms-2"
                                        trigger="hover"
                                        placement="left"
                                        overlay={
                                            <Popover>
                                                <Popover.Header as="h3">
                                                    {t('items.noQuantityPopoverTitle')}
                                                </Popover.Header>
                                                <Popover.Body>
                                                    {t('items.noQuantityPopoverBody')}
                                                </Popover.Body>
                                            </Popover>
                                        }
                                    >
                                        <Button className="inline-help" variant="light">
                                            <BsQuestionCircle size="20" />
                                        </Button>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCondition">
                        <Form.Label>{t("items.condition")}</Form.Label>
                        <Form.Select
                            value={this.state.condition}
                            onChange={this.onChangeCondition}
                        >
                            {this.state.conditions.map((condition) => {
                                return (
                                    <option key={condition} value={condition}>
                                        {t(ItemCondition[condition])}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>{t("common.description")}</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={this.state.description}
                            rows={5}
                            maxLength={1000}
                            onChange={this.onChangeDescription}
                        />
                    </Form.Group>

                    <Button
                        name="saveButton"
                        variant="success"
                        type="submit"
                        onClick={this.onSubmit}
                    >
                        {t("common.save")}
                    </Button>

                    <Button
                        className="ms-2"
                        name="saveAndDetailsButton"
                        variant="success"
                        type="submit"
                        onClick={this.onSubmit}
                    >
                        {t("common.saveAndDetails")}
                    </Button>
                </form>
            </div>
        );
    }
}

export default withTranslation()(AddItemForm);
