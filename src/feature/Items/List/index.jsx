import React from 'react';

import { setActiveSidebarItem } from '../../../components/Sidebar/service';

export default class ItemList extends React.Component {
    componentDidMount() {
        setActiveSidebarItem('itemsOverviewSidebarItem');
    }

    render() {
        return (
            <div>
                <p>This is the ItemList component!</p>
            </div>
        );
    }
}
