import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

class PaginatedOverview extends React.Component {
    render() {
        const { elements, total, page, setPageMethod, limit, OverviewCardComponent } = this.props;
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

                {pageCount > 1 && (
                    <div className="d-flex justify-content-center mt-5">
                        <ButtonGroup>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setPageMethod(Math.max(0, parseInt(page)-1));
                                }}
                                disabled={Number(page) === 0}
                            >
                                <FaChevronLeft size="18" />
                            </Button>

                            {
                                [...Array(pageCount)].map(
                                    (e, i) => (
                                        <Button
                                            variant={Number(page) === i ? 'primary' : 'secondary'}
                                            onClick={() => {
                                                setPageMethod(i);
                                            }}
                                        >
                                            {i+1}
                                        </Button>
                                    )
                                )
                            }

                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setPageMethod(Math.min(pageCount-1, parseInt(page)+1));
                                }}
                                disabled={Number(page) === pageCount-1}
                            >
                                <FaChevronRight size="18" />
                            </Button>
                        </ButtonGroup>
                    </div>
                )}
            </div>
        );
    }
}

export default PaginatedOverview;