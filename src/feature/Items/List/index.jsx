import axios from "axios";
import React from 'react';
import { trackPromise } from "react-promise-tracker";

import ItemOverviewCard from "../OverviewCard";
import Main from "../../../components/Main";
import PaginatedOverview from "../../../components/PaginatedOverview";
import { setActiveSidebarItem } from '../../../components/Sidebar/service';
import { withRouterAndTranslation } from "../../../services/CustomWrappers";

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            total: 0,
            page: 0,
            limit: 10
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
                </Main.Header>

                <Main.Body>
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