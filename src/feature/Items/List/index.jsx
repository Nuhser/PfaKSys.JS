import axios from "axios";
import React from 'react';
import Button from 'react-bootstrap/Button';
import { trackPromise } from "react-promise-tracker";

import AddItemModal from "../AddModal/";
import ItemOverviewCard from "../OverviewCard";
import Main from "../../../components/Main";
import PaginatedOverview from "../../../components/PaginatedOverview";
import { setActiveSidebarItem } from '../../../components/Sidebar/service';
import { withRouterAndTranslation } from "../../../services/CustomWrappers";

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.enableAddItemModal = this.enableAddItemModal.bind(this);
        this.disableAddItemModal = this.disableAddItemModal.bind(this);

        this.state = {
            items: [],
            total: 0,
            page: 0,
            limit: 10,

            showAddItemModal: false
        };
    }

    getItemList() {
        const { queryParams } = this.props;
        const params = {
            limit: queryParams.get('limit') || 10,
            page: queryParams.get('page') || 0
        };

        this.setState({ page: params.page, limit: params.limit });

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

    render() {
        const { t } = this.props;

        return (
            <Main title={t('common.material')}>
                <Main.Header>
                    <Button variant="success" size="sm" onClick={this.enableAddItemModal}>
                        TEST - New Item
                    </Button>
                </Main.Header>

                <Main.Body largeHeader>
                    <AddItemModal
                        show={this.state.showAddItemModal}
                        onClose={this.disableAddItemModal}
                    />

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