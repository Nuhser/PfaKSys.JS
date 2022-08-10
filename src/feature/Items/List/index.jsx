import React from 'react';
import { withTranslation } from 'react-i18next';

import Main from "../../../components/Main";
import { setActiveSidebarItem } from '../../../components/Sidebar/service';

class ItemList extends React.Component {
    componentDidMount() {
        setActiveSidebarItem('itemsOverviewSidebarItem');
    }

    render() {
        const { t } = this.props;

        return (
            <Main title={t('common.material')}>
                <Main.Header />

                <Main.Body>
                    <p>Hello World!</p>
                </Main.Body>
            </Main>
        );
    }
}

export default withTranslation()(ItemList);