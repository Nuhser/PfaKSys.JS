import React from "react";

import { withTranslation } from "../../services/CustomWrappers";
import { Alert, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

class ItemOverviewTable extends React.Component {
    render() {
        const { columnTitles, columnKeys, elements, detailPagePath, t } = this.props;

        if (columnTitles === undefined || columnKeys === undefined || columnTitles.length !== columnKeys.length) {
            return (
                <Alert variant="danger">
                    Fehler!
                </Alert>
            );
        }

        return (
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        {columnTitles.map(
                            (title) => (
                                <th>{title}</th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        elements.map(
                            (element) => (
                                <tr key={element._id}>
                                    {
                                        columnKeys.map(
                                            (key, index) => (
                                                <td key={index}>
                                                    {index === 0 && detailPagePath !== undefined ? (
                                                        <b>
                                                            <Link to={detailPagePath + element._id}>
                                                                {element[key]}
                                                            </Link>
                                                        </b>
                                                    ) : (
                                                        (() => {
                                                            const dateValue = new Date(element[key]);

                                                            if (isNaN(element[key]) && dateValue.toLocaleString() !== "Invalid Date") {
                                                                return new Date(element[key]).toLocaleString() + " " + t("common.oClock");
                                                            }
                                                            else {
                                                                return element[key];
                                                            }
                                                        })()
                                                    )}
                                                </td>
                                            )
                                        )
                                    }
                                </tr>
                            )
                        )
                    }
                </tbody>
            </Table>
        );
    }
}

export default withTranslation(ItemOverviewTable);