import axios, { AxiosError } from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { trackPromise } from 'react-promise-tracker';

import { ItemCondition } from '../services/ItemCondition';
import { withTranslation } from '../../../services/CustomWrappers';

class FilterItemsModal extends React.Component {
    constructor(props) {
        super(props);
        const { filterConditions, filterCategories } = this.props;

        this.state = {
            filterConditions: filterConditions,
            conditions: [],
            filterCategories: filterCategories,
            categories: []
        }
    }

    componentDidMount() {
        trackPromise(axios.get(
            'http://localhost:5000/itemCategories'
        ).then(
            res => this.setState({ categories: res.data.itemCategories })
        ).catch(
            error => console.log(error)
        ));

        this.setState({
            conditions: Object.keys(ItemCondition)
        });
    }
    
    render() {
        const { filter, show, onHide, t } = this.props;

        return (
            <Modal
                show={show}
                onHide={onHide}
                backdrop="static"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title>{t('items.filterItemsTitle')}</Modal.Title>
                </Modal.Header>

                <Form>
                    <Modal.Body>
                        <Tabs
                            defaultActiveKey='conditionsTab'
                            justify
                            className="mb-3"
                        >
                            <Tab eventKey='conditionsTab' title={t('items.condition')}>
                                {
                                    this.state.conditions.map(
                                        condition => (
                                            <Form.Check
                                                type='checkbox'
                                                id={`conditionFilter_${condition}`}
                                                key={`conditionFilter_${condition}`}
                                                label={t(ItemCondition[condition])}
                                            />
                                        )
                                    )
                                }
                            </Tab>

                            <Tab eventKey='categoriesTab' title={t('common.category')}>
                                {
                                    this.state.categories.map(
                                        category => (
                                            <Form.Check
                                                type='checkbox'
                                                id={`categoryFilter_${category._id}`}
                                                key={`categoryFilter_${category._id}`}
                                                label={category.name}
                                            />
                                        )
                                    )
                                }
                            </Tab>

                            
                            <Tab eventKey='locationTab' title={t('common.location')}>

                            </Tab>
                        </Tabs>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            name="filterButton"
                            variant="success"
                        >
                            ...filter...
                        </Button>

                        <Button
                            name="cancelButton"
                            variant="danger"
                            onClick={onHide}
                        >
                            ...cancel...
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default withTranslation(FilterItemsModal);