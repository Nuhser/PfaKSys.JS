import axios, { AxiosError } from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { trackPromise } from "react-promise-tracker";

import InlineHelp from "../../../components/InlineHelp";
import Main from "../../../components/Main";
import { showErrorToast, showSuccessToast } from "../../../components/Toast/service";
import { setActiveSidebarItem } from '../../../components/Sidebar/service';
import { ItemCondition } from "../services/ItemCondition";
import { withRouterAndTranslation } from "../../../services/CustomWrappers";

// TODO: Move this to modal
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

        const { navigate, t } = this.props;

        const newItem = {
            name: this.state.name,
            no_quantity: this.state.no_quantity,
            quantity: this.state.no_quantity ? 0 : this.state.quantity,
            condition: this.state.condition,
            description: this.state.description
        };

        console.log('POST: /items/add\n', newItem);

        trackPromise(axios.post(
            'http://localhost:5000/items/add',
            newItem
        ).then(
            res => {
                console.log(res.data.message);
                showSuccessToast({
                    title: t('items.addedSuccess'),
                    body: (
                        <div>{res.data.message}</div>
                    )
                })

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
        const { t } = this.props;

        return (
            <Main title={t("items.newItemTitle")}>
                <Main.Header>
                </Main.Header>

                <Main.Body>
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
                </Main.Body>
            </Main>
        );
    }
}

export default withRouterAndTranslation(AddItemForm);
