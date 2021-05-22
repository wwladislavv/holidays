import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import DivisionCard from './division-card';

const DivisionsRow = ({ divisionsData }) => (
    <Row
        className="dashboard-page__row justify-content-between"
        xs={1}
        md={2}
        lg={3}
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