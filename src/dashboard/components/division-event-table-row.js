import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DisivionEventTableRow = ({
    date, notes, title,
    bunting,
}) => (
    <tr>
        <td className="date-cell">
            {date.format('DD MMMM')}
        </td>
        <td className="weekday-cell">
            {date.format('ddd').toUpperCase()}
        </td>
        <td className="flag-cell">
            {bunting && (
                <i className="bi bi-flower1" title="Bunting" />
            )}
        </td>
        <td>
            {title} {!!notes?.length && `(${notes})`}
        </td>
    </tr>
);

DisivionEventTableRow.propTypes = {
    date: PropTypes.instanceOf(moment).isRequired,
    notes: PropTypes.string,
    title: PropTypes.string.isRequired,
    bunting: PropTypes.bool.isRequired,
};

export default DisivionEventTableRow;
