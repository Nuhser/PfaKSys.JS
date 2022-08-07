import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { withTranslation } from "react-i18next";
import { trackPromise } from "react-promise-tracker";

import { ItemCondition } from "../services/ItemCondition";

class AddItemForm extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeCondition = this.onChangeCondition.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            quantity: 0,
            condition: "",
            description: "",
    
            conditions: []
        };
    }

    // gets called as soon as the component is mounted (directly before the first render)
    componentDidMount() {
        this.setState({
            conditions: Object.keys(ItemCondition),
            condition: 'UNKNOWN'
        });
    }

    onChangeName(e) {
        this.setState({ name: e.target.value });
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
            quantity: this.state.quantity,
            condition: this.state.condition,
            description: this.state.description
        };
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
                        <Form.Label>{t('common.name')}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={this.state.name}
                            maxLength={100}
                            onChange={this.onChangeName} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formQuantity">
                        <Form.Label>{t('items.quantity')}</Form.Label>
                        <InputGroup>
                            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                            <Form.Control
                                type="number"
                                value={this.state.quantity}
                                min={-1}
                                onChange={this.onChangeQuantity} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCondition">
                        <Form.Label>{t('items.condition')}</Form.Label>
                        <Form.Select
                            value={this.state.condition}
                            onChange={this.onChangeCondition}>

                            {this.state.conditions.map(
                                (condition) => {
                                    return (
                                        <option key={condition} value={condition}>
                                            {t(ItemCondition[condition])}
                                        </option>
                                    )
                                }
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>{t('common.description')}</Form.Label>
                        <Form.Control 
                            as="textarea"
                            value={this.state.description}
                            rows={5}
                            maxLength={1000}
                            onChange={this.onChangeDescription} />
                    </Form.Group>

                    <Button name="saveButton" variant="success" type="submit" onClick={this.onSubmit}>
                        {t('common.save')}
                    </Button>

                    <Button className="ms-2" name="saveAndDetailsButton" variant="success" type="submit" onClick={this.onSubmit}>
                        {t('common.saveAndDetails')}
                    </Button>
                </form>
            </div>
        );
    }
}

export default withTranslation()(AddItemForm);
