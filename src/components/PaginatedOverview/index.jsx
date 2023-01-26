import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { withRouter } from "../../services/CustomWrappers";

class PaginatedOverview extends React.Component {
    render() {
        const { url, elements, total, page, limit, OverviewCardComponent, navigate } = this.props;
        const pageCount = Math.ceil(total / limit);

        return (
            <div>
                        {
                            elements.map(
                                (element) => (
                                    <OverviewCardComponent
                                        key={element.id}
                                        element={element}
                                    />
                                )
                            )
                        }

                <div className="d-flex justify-content-center mt-5">
                    <ButtonGroup>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                navigate(`${url}?page=${Math.max(0, parseInt(page)-1)}`);
                            }}
                            disabled={page == 0}
                        >
                            <FaChevronLeft size="18" />
                        </Button>

                        {
                            [...Array(pageCount)].map(
                                (e, i) => (
                                    <Button
                                        variant={page == i ? 'primary' : 'secondary'}
                                        onClick={() => {
                                            navigate(`${url}?page=${i}`);
                                        }}
                                        disabled={page == i}
                                    >
                                        {i+1}
                                    </Button>
                                )
                            )
                        }

                        <Button
                            variant="secondary"
                            onClick={() => {
                                navigate(`${url}?page=${Math.min(pageCount-1, parseInt(page)+1)}`);
                            }}
                            disabled={page == pageCount-1}
                        >
                            <FaChevronRight size="18" />
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default withRouter(PaginatedOverview);