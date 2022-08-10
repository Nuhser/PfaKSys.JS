import axios from "axios";
import React from 'react';

import Main from "../../../components/Main";
import { setActiveSidebarItem } from '../../../components/Sidebar/service';
import { withRouterAndTranslation } from "../../../services/CustomWrappers";

class ItemList extends React.Component {
    componentDidMount() {
        setActiveSidebarItem('itemsOverviewSidebarItem');
    }

    render() {
        const { queryParams, t } = this.props;
        const page = queryParams.get('page');

        return (
            <Main title={t('common.material')}>
                <Main.Header>
                </Main.Header>

                <Main.Body>
                    <p>Hello World!</p>
                </Main.Body>
            </Main>
        );
    }
}

export default withRouterAndTranslation(ItemList);