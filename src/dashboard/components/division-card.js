import React from 'react';
import PropTypes from 'prop-types';
import {
    Col, Card, Table,
} from 'react-bootstrap';
import DisivionEventTableRow from './division-event-table-row';

const DivisionCard = ({
    divisionTitle, events,
}) => (
    <Col>
        <Card>
            <Card.Header>
                <Card.Title>{divisionTitle}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table
                    borderless
                    striped
                    hover
                >
                    <tbody>
                        {events.map((eventData, index) => <DisivionEventTableRow key={+index} {...eventData} />)}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </Col>
);

DivisionCard.propTypes = {
    divisionTitle: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
};

export default DivisionCard;
