import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

import { withTranslation } from "../../../services/CustomWrappers";

class ItemOverviewCard extends React.Component {
    render() {
        const { element, t } = this.props;

        return (
            <Card className="mb-2">
                <Card.Body>
                    <Card.Title>
                        <Link to={`/items/${element._id}`}>
                            {element.name}
                        </Link>
                    </Card.Title>

                    <Card.Subtitle className="text-muted">{t('common.lastUpdatedAt')}: {new Date(element.updatedAt).toLocaleString()} {t('common.oClock')}</Card.Subtitle>

                    <Card.Text>

                    </Card.Text>
                </Card.Body>

                <Card.Footer>
                    <Button variant="secondary" size="sm">
                        <MdOutlineModeEdit size="20" className="me-1" />
                        {t('common.edit')}
                    </Button>
                    <Button variant="danger" size="sm" className="ms-2">
                        <MdOutlineDelete size="20" className="me-1" />
                        {t('common.delete')}
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default withTranslation(ItemOverviewCard);