import axios, { AxiosError } from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { trackPromise } from "react-promise-tracker";

import InlineHelp from "../../../components/InlineHelp";
import { showErrorToast, showSuccessToast } from "../../../components/Toast/service";
import { ItemCondition } from "../services/ItemCondition";
import { withRouterAndTranslation } from "../../../services/CustomWrappers";

class AddItemModal extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeInventoryId = this.onChangeInventoryId.bind(this);
        this.onChangeNoQuantity = this.onChangeNoQuantity.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeCondition = this.onChangeCondition.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            inventory_id: "",
            no_quantity: false,
            quantity: 0,
            category: "",
            condition: "",
            description: "",
    
            conditions: [],
            categories: []
        };
    }

    // gets called as soon as the component is mounted (directly before the first render)
    componentDidMount() {
        trackPromise(axios.get(
            'http://localhost:5000/itemCategories'
        ).then(
            res => this.setState({ categories: [''].concat(res.data.itemCategories) })
        ).catch(
            error => console.log(error)
        ));

        this.setState({
            category: '',
            conditions: Object.keys(ItemCondition),
            condition: 'UNKNOWN'
        });
    }

    onChangeName(e) {
        this.setState({ name: e.target.value });
    }

    onChangeInventoryId(e) {
        this.setState({ inventory_id: e.target.value })
    }

    onChangeNoQuantity(e) {
        this.setState({ no_quantity: e.target.checked });
    }

    onChangeQuantity(e) {
        this.setState({ quantity: e.target.value });
    }

    onChangeCategory(e) {
        this.setState({ category: e.target.value });
    }

    onChangeCondition(e) {
        this.setState({ condition: e.target.value });
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const { onClose, navigate, t } = this.props;

        const newItem = {
            name: this.state.name,
            inventory_id: this.state.inventory_id,
            no_quantity: this.state.no_quantity,
            quantity: this.state.no_quantity ? 0 : this.state.quantity,
            condition: this.state.condition,
            description: this.state.description
        };

        if (this.state.category !== '') {
            newItem.category = this.state.category;
        }

        console.log('POST: /items/add\n', newItem);

        trackPromise(axios.post(
            'http://localhost:5000/items/add',
            newItem
        ).then(
            res => {
                console.log('Response:\n', res.data);
                showSuccessToast({
                    title: t('items.addedSuccess'),
                    body: (
                        <div>{res.data.message}</div>
                    )
                })

                onClose();

                if (e.target.name === 'saveButton') {
                    navigate('/items');
                }
                else {
                    navigate(`/items/${res.data.id}`);
                }
        }).catch(
            error => {
                if (error instanceof AxiosError) {
                    console.log(error);
                    showErrorToast({
                        title: error.name,
                        body: (
                            <div>
                                <b>{error.code}</b><br/>
                                {error.response.data ? error.response.data : error.message}
                            </div>
                        )
                    })
                }
                else if (error.response) {
                    console.log(error);
                    showErrorToast({
                        title: `Unexpected Error: ${error.name}`,
                        body: (
                            <div>
                                <b>{error.code}</b><br/>
                                Message: {error.message}<br/>
                                {error.response.data && 'Data: '}{error.response.data}
                            </div>
                        )
                    })
                }
        }));
    }

    render() {
        const { show, onClose, t } = this.props;

        return (
            <Modal
                size="lg"
                show={show}
                onHide={onClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("items.newItemTitle")}</Modal.Title>
                </Modal.Header>

                <form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>{t("common.name")}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={this.state.name}
                                maxLength={100}
                                onChange={this.onChangeName}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formInventoryId">
                            <Form.Label>{t("items.inventoryId")}</Form.Label>
                            <InlineHelp
                                helpText="items.inventoryIdHelpText"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Enter inventory ID"
                                    value={this.state.inventory_id}
                                    maxLength={32}
                                    onChange={this.onChangeInventoryId}
                                />
                            </InlineHelp>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Label>{t("items.quantity")}</Form.Label>
                            <InlineHelp
                                helpTitle="items.noQuantityHelpTitle"
                                helpText="items.noQuantityHelpText"
                            >
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
                            </InlineHelp>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>{t("common.category")}</Form.Label>
                            <Form.Select
                                value={this.state.category?._id}
                                onChange={this.onChangeCategory}
                            >
                                {this.state.categories.map(category => {
                                    if (category === ''){
                                        return (
                                            <option key="" value="" />
                                        );
                                    }
                                    else {
                                        return (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        );
                                    }
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCondition">
                            <Form.Label>{t("items.condition")}</Form.Label>
                            <Form.Select
                                value={this.state.condition}
                                onChange={this.onChangeCondition}
                            >
                                {this.state.conditions.map(condition => {
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
                    </Modal.Body>

                    <Modal.Footer>
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
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default withRouterAndTranslation(AddItemModal);
