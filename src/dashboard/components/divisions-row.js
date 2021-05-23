import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import DivisionCard from './division-card';

const DivisionsRow = ({ divisionsData }) => (
    <Row
        className="dashboard-page__row"
        xs={1}
        lg={2}
    >
        {Object.keys(divisionsData).map(
            (divisionName) => (
                <DivisionCard
                    key={divisionName}
                    {...divisionsData[divisionName]}
                />
            )
        )}
    </Row>
);

DivisionsRow.propTypes = {
    divisionsData: PropTypes.object.isRequired,
};

export default DivisionsRow;
