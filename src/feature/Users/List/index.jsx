import React from 'react';

import { setActiveSidebarItem } from '../../../components/Sidebar/service';

export default class UserList extends React.Component {
    componentDidMount() {
        setActiveSidebarItem('usersSidebarItem');
    }

    render() {
        return (
            <div>
                <p>This is the UserList component!</p>
            </div>
        );
    }
}
