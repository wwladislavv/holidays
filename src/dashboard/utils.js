import startCase from 'lodash/startCase';
import groupBy from 'lodash/groupBy';
import moment from 'moment';

const parseDivisionTitle = (divisionCode = '') => startCase(divisionCode.replaceAll('-', ' '));

const parseEvents = (events = []) => events.map(
    (item = {}) => ({
        ...item,
        date: item.date ? moment(item.date) : item.date
    })
);
const groupEventsByYear = (events = []) => groupBy(events, (value) => (value.date ? moment(value.date).format('YYYY') : 'No Date'));
// eslint-disable-next-line import/prefer-default-export
export const parseHolidaysData = (holidaysDataByDivision = {}) => Object.keys(holidaysDataByDivision).reduce(
    (result, divisionKeyName) => ({
        ...result,
        [divisionKeyName]: {
            ...holidaysDataByDivision[divisionKeyName],
            eventsByYear: groupEventsByYear(parseEvents(holidaysDataByDivision[divisionKeyName]?.events)),
            divisionTitle: parseDivisionTitle(holidaysDataByDivision[divisionKeyName]?.division),
        }
    }),
    {}
);
