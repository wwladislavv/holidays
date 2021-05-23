import React, {
    useMemo, useRef, useCallback,
    useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
    Col, Card, Table,
} from 'react-bootstrap';
import moment from 'moment';

import EventsByYear from './events-by-year';

const DivisionCard = ({
    divisionTitle, eventsByYear,
}) => {
    const eventsScrollContainerRef = useRef(null);
    const currentYearRowRef = useRef(null);
    const getCurrentYearRowRef = useCallback(
        (ref) => {
            currentYearRowRef.current = ref;
        },
        []
    );
    const currentYear = useMemo(
        () => moment().format('YYYY'),
        []
    );
    const scrollCurrentYearToView = useCallback(
        () => {
            const rowTopPos = currentYearRowRef.current.offsetTop;
            const scrollableContainerEl = eventsScrollContainerRef.current || {};
            scrollableContainerEl.scrollTop = rowTopPos;
        },
        []
    );
    useEffect(() => scrollCurrentYearToView(), [scrollCurrentYearToView]);
    return (
        <Col className="mb-4">
            <Card>
                <Card.Header>
                    <Card.Title>{divisionTitle}</Card.Title>
                </Card.Header>
                <Card.Body ref={eventsScrollContainerRef}>
                    <Table
                        borderless
                        hover
                    >
                        <tbody>
                            <EventsByYear
                                getCurrentYearRowRef={getCurrentYearRowRef}
                                data={eventsByYear}
                                currentYear={currentYear}
                            />
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Col>
    );
};

DivisionCard.propTypes = {
    divisionTitle: PropTypes.string.isRequired,
    eventsByYear: PropTypes.object.isRequired,
};

export default DivisionCard;
