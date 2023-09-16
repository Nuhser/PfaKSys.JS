import axios from "axios";
import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import { trackPromise } from "react-promise-tracker";

import AddItemModal from "../AddModal";
import FilterItemModal from "../FilterModal";
import Main from "../../../components/Main";
import PaginatedOverview from "../../../components/PaginatedOverview";
import { setActiveSidebarItem } from '../../../components/Sidebar/service';
import { withRouterAndTranslation } from "../../../services/CustomWrappers";

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeNameFilter = this.onChangeNameFilter.bind(this);
        this.onChangeConditionFilter = this.onChangeConditionFilter.bind(this);
        this.onChangeCategoryFilter = this.onChangeCategoryFilter.bind(this);

        this.state = {
            items: [],
            total: 0,
            page: 0,
            limit: 20,

            filter: {
                name: '',
                conditions: [],
                categories: []
            },

            showAddItemModal: false,
            showFilterItemModal: false
        };
    }

    getItemList() {
        const params = {
            limit: this.state.limit || 20,
            page: this.state.page || 0
        };

        if (this.state.filter.name && this.state.filter.name !== '') {
            params.name = this.state.filter.name;
        }
        if (this.state.filter.conditions && this.state.filter.conditions.length > 0) {
            params.conditions = this.state.filter.conditions.join(',');
        }
        if (this.state.filter.categories && this.state.filter.categories.length > 0) {
            params.categories = this.state.filter.categories.join(',');
        }

        console.log('GET: /items', params);

        trackPromise(axios.get(
            'http://localhost:5000/items',
            { params: params }
        ).then(
            res => {
                this.setState({ items: res.data.items, total: res.data.total });
            }
        ).catch(
            error => {
                console.log(error);
            }
        ));
    }

    onChangeNameFilter(e) {
        let filter = structuredClone(this.state.filter);
        filter.name = e.target.value;

        this.setState({
            page: 0,
            filter: filter
        });
    }

    onChangeConditionFilter(condition, selected) {
        let filter = structuredClone(this.state.filter);

        if (filter.conditions.includes(condition) && !selected) {
            filter.conditions.splice(filter.conditions.indexOf(condition), 1);
        }
        else if (!filter.conditions.includes(condition) && selected) {
            filter.conditions.push(condition);
        }

        this.setState({
            page: 0,
            filter: filter
        });
    }

    onChangeCategoryFilter(category, selected) {
        let filter = structuredClone(this.state.filter);

        if (filter.categories.includes(category) && !selected) {
            filter.categories.splice(filter.categories.indexOf(category), 1);
        }
        else if (!filter.categories.includes(category) && selected) {
            filter.categories.push(category);
        }

        this.setState({
            page: 0,
            filter: filter
        });
    }

    componentDidMount() {
        setActiveSidebarItem('itemsOverviewSidebarItem');
        this.getItemList();
    }

    componentDidUpdate(_prevProps, prevState) {
        if (this.state.filter !== prevState.filter
            || this.state.page !== prevState.page
            || this.state.limit !== prevState.limit) {

            this.getItemList();
        }
    }

    render() {
        const { t } = this.props;

        return (
            <Main title={t('common.material')}>
                <Main.Header>
                    <Button
                        variant="success"
                        size="sm"
                        onClick={() => this.setState({ showAddItemModal: true })}
                    >
                        <IoMdAdd size="20" className="me-1" />
                        {t('common.createNew')}
                    </Button>
                </Main.Header>

                <Main.Body largeHeader>
                    <AddItemModal
                        show={this.state.showAddItemModal}
                        onHide={() => this.setState({ showAddItemModal: false })}
                    />

                    <FilterItemModal
                        show={this.state.showFilterItemModal}
                        onHide={() => this.setState({ showFilterItemModal: false })}
                        conditionFilter={this.state.filter.conditions}
                        onChangeConditionFilter={this.onChangeConditionFilter}
                        categoryFilter={this.state.filter.categories}
                        onChangeCategoryFilter={this.onChangeCategoryFilter}
                    />

                    <ButtonToolbar className="d-flex justify-content-center mb-3">
                        <InputGroup style={{minWidth: '50%'}}>
                            <InputGroup.Text>
                                <AiOutlineSearch size="20" />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder={t('common.searchPlaceholder')}
                                onChange={this.onChangeNameFilter}
                            />
                        </InputGroup>

                        <Button 
                            variant="primary"
                            onClick={() => this.setState({ showFilterItemModal: true })}
                            className="ms-2"
                        >
                            <FiFilter size="20" className="me-1" />
                            {t('common.filter')}
                        </Button>
                    </ButtonToolbar>

                    <PaginatedOverview
                        elements={this.state.items}
                        total={this.state.total}
                        page={this.state.page}
                        setPageMethod={(value) => this.setState({ page: value })}
                        limit={this.state.limit}
                        columnTitles={[
                            t("common.name"),
                            t("items.inventoryId"),
                            t("items.quantity"),
                            t("items.condition"),
                            t("common.lastUpdatedAt")
                        ]}
                        columnKeys={[
                            "name",
                            "inventory_id",
                            "quantity",
                            "condition",
                            "updatedAt"
                        ]}
                        detailPagePath="/items/"
                    />
                </Main.Body>
            </Main>
        );
    }
}

export default withRouterAndTranslation(ItemList);