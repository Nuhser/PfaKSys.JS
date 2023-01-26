import axios from "axios";
import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
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
        this.onSubmitFilter = this.onSubmitFilter.bind(this);
        this.enableAddItemModal = this.enableAddItemModal.bind(this);
        this.disableAddItemModal = this.disableAddItemModal.bind(this);

        this.state = {
            items: [],
            total: 0,
            page: 0,
            limit: 10,
            name: null,

            showAddItemModal: false
        };
    }

    getItemList() {
        const { queryParams } = this.props;
        const params = {
            limit: queryParams.get('limit') || 10,
            page: queryParams.get('page') || 0
        };

        if (queryParams.get('name') && queryParams.get('name') !== '') {
            params.name = queryParams.get('name');
        }

        this.setState({ page: params.page, limit: params.limit, name: params.name });

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

    componentDidMount() {
        setActiveSidebarItem('itemsOverviewSidebarItem');
        this.getItemList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.queryParams !== prevProps.queryParams) {
            this.getItemList();
        }
    }

    onChangeNameFilter(e) {
        this.setState({ name: e.target.value });
    }

    onSubmitFilter(e) {
        e.preventDefault();

        const { navigate } = this.props;
        let queryParams = [];

        if (this.state.limit) {
            queryParams.push('limit=' + this.state.limit);
        }
        if (this.state.name && this.state.name !== '') {
            queryParams.push('name=' + this.state.name);
        }

        navigate('/items?' + queryParams.join('&'));
    }

    render() {
        const { t } = this.props;

        return (
            <Main title={t('common.material')}>
                <Main.Header>
                    <Button variant="success" size="sm" onClick={this.enableAddItemModal}>
                        <IoMdAdd size="20" className="me-1" />
                        {t('items.createNew')}
                    </Button>
                </Main.Header>

                <Main.Body largeHeader>
                    <AddItemModal
                        show={this.state.showAddItemModal}
                        onClose={this.disableAddItemModal}
                    />

                    <Form onSubmit={this.onSubmitFilter}>
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

                            <Dropdown className="ms-2">
                                <Dropdown.Toggle variant="secondary">
                                    <FiFilter size="20" className="me-1" />
                                    {t('common.filter')}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        
                                    </Dropdown.Item>

                                    <Dropdown.Item href="#">
                                        <Form.Check
                                            id="custom-switch"
                                            label="Check this switch"
                                        />
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Button 
                                variant="primary"
                                type="submit"
                            >
                                {t('common.search')}
                            </Button>
                        </ButtonToolbar>
                    </Form>

                    <PaginatedOverview
                        url="/items"
                        elements={this.state.items}
                        total={this.state.total}
                        page={this.state.page}
                        limit={this.state.limit}
                        OverviewCardComponent={ItemOverviewCard}
                    />
                </Main.Body>
            </Main>
        );
    }
}

export default withRouterAndTranslation(ItemList);