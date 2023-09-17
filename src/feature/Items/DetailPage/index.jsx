import axios from "axios";
import React from "react";
import { trackPromise } from "react-promise-tracker";

import Main from "../../../components/Main";
import { withRouterAndTranslation } from "../../../services/CustomWrappers";
import { Tab, Tabs } from "react-bootstrap";

class ItemDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: undefined
        };
    }

    getItem() {
        const { urlParams } = this.props;
        const itemId = urlParams.id;

        trackPromise(axios.get(
            'http://localhost:5000/items/' + itemId
        ).then(
            res => {
                this.setState({ item: res.data });
            }
        ).catch(
            error => {
                console.log(error);
            }
        ));
    }

    componentDidMount() {
        this.getItem();
    }

    render() {
        const { t } = this.props;
        var item = this.state.item;

        return (
            item !== undefined &&
            <Main title={item.name}>
                <Main.Header
                    backButtonText={t("common.back")}
                    backButtonLink="/items"
                />

                <Main.Body>
                    <Tabs defaultActiveKey={0} className="mb-3">
                        <Tab eventKey={0} title={t('Allgemeine Informationen')}>
                            ID: {item.inventory_id}
                        </Tab>

                        <Tab eventKey={1} title={t('Andere Informationen')}>
                            ID: {item.inventory_id}
                        </Tab>
                    </Tabs>
                </Main.Body>
            </Main>
        );
    }
}

export default withRouterAndTranslation(ItemDetailPage);