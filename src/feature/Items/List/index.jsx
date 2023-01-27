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

import AddItemModal from "../Add/";
import ItemOverviewCard from "../OverviewCard";
import Main from "../../../components/Main";
import PaginatedOverview from "../../../components/PaginatedOverview";
import { setActiveSidebarItem } from '../../../components/Sidebar/service';
import { withRouterAndTranslation } from "../../../services/CustomWrappers";

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeNameFilter = this.onChangeNameFilter.bind(this);
        this.enableAddItemModal = this.enableAddItemModal.bind(this);
        this.disableAddItemModal = this.disableAddItemModal.bind(this);

        this.state = {
            items: [],
            total: 0,
            page: 0,
            limit: 10,

            filter: {},

            showAddItemModal: false
        };
    }

    getItemList() {
        const params = {
            limit: this.state.limit || 10,
            page: this.state.page || 0
        };

        if (this.state.filter.name && this.state.filter.name !== '') {
            params.name = this.state.filter.name;
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

    enableAddItemModal() {
        this.setState({ showAddItemModal: true });
    }

    disableAddItemModal() {
        this.setState({ showAddItemModal: false });
    }

    onChangeNameFilter(e) {
        let filter = this.state.filter;
        filter.name = e.target.value;

        this.setState({
            page: 0,
            filter: { name: e.target.value }
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
                    <Button variant="success" size="sm" onClick={this.enableAddItemModal}>
                        <IoMdAdd size="20" className="me-1" />
                        {t('common.createNew')}
                    </Button>
                </Main.Header>

                <Main.Body largeHeader>
                    <AddItemModal
                        show={this.state.showAddItemModal}
                        onClose={this.disableAddItemModal}
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

                        <Button variant="primary" className="ms-2">
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
                        OverviewCardComponent={ItemOverviewCard}
                    />
                </Main.Body>
            </Main>
        );
    }
}

export default withRouterAndTranslation(ItemList);