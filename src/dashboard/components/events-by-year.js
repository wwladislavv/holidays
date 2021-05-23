import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import DisivionEventTableRow from './division-event-table-row';

const EventsByYear = ({
    data, getCurrentYearRowRef, currentYear,
}) => Object.keys(data).map((year) => {
    const events = data[year];
    const isCurrentYear = currentYear === year;
    return (
        <Fragment key={year}>
            <tr
                className="table-row-separator"
                {...(isCurrentYear && {
                    ref: getCurrentYearRowRef,
                })}
            >
                <td colSpan={12}>
                    {year}
                </td>
            </tr>
            {events.map((eventData, index) => (
                <DisivionEventTableRow
                    key={+index}
                    {...eventData}
                />
            ))}
        </Fragment>
    );
});

EventsByYear.propTypes = {
    data: PropTypes.object.isRequired,
    getCurrentYearRowRef: PropTypes.func.isRequired,
};

export default EventsByYear;
