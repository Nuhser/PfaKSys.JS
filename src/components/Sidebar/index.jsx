import React from "react";
import Button from "react-bootstrap/Button";
import { withTranslation } from "react-i18next";
import { BiBox } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./style.css";

class Sidebar extends React.Component {
    componentDidMount() {
        enableSidebarDropdowns();
    }

    componentDidUpdate() {
        enableSidebarDropdowns();
    }

    render() {
        const { t } = this.props;

        return (
            <div className="sidebar">
                <SidebarDropdown
                    id="itemsSidebarDropdown"
                    icon={<BiBox className="sidebar-icon" size="24" />}
                    text={t('common.material')}
                    dropdownItems={[
                        <SidebarItem
                            id="itemsOverviewSidebarItem"
                            key="items.overview"
                            text={t('common.overview')}
                            link="/items"
                        />,
                        <SidebarItem
                            id="itemsAddSidebarItem"
                            key="items.add"
                            text={t('common.add')}
                            link="/items/add"
                        />
                    ]}
                />

                <SidebarItem
                    id="usersSidebarItem"
                    icon={<FiUsers className="sidebar-icon" size="24" />}
                    text={t("common.users")}
                    link="/users"
                />

                <div className="sidebar-bottom">
                    <SidebarItem
                        icon={<FiUsers className="sidebar-icon" size="24" />}
                        text="Foo Bar"
                        link="#"
                    />
                </div>
            </div>
        );
    }
}

class SidebarItem extends React.Component {
    render() {
        const { id, icon = '', text, link = '/' } = this.props;

        return (
            <Link id={id} className="sidebar-item" to={link}>
                {icon}
                <span className="whitespace-nowrap p-2">{text}</span>
            </Link>
        );
    }
}

class SidebarDropdown extends React.Component {
    render() {
        const { id, icon, text, dropdownItems } = this.props;

        return (
            <div>
                <Button id={id} className="sidebar-item sidebar-dropdown">
                    {icon}
                    <span className="whitespace-nowrap p-2">{text}</span>
                    <i className="fa fa-caret-down"></i>
                </Button>
                <div className="dropdown-container">
                    {dropdownItems}
                </div>
            </div>
        );
    }
}

function enableSidebarDropdowns() {
    //* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
    var dropdown = document.getElementsByClassName("sidebar-dropdown");
    var i;

    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function () {
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
}

export default withTranslation()(Sidebar);
