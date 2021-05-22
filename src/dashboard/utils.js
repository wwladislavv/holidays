import startCase from 'lodash/startCase';
import sortBy from 'lodash/sortBy';
import moment from 'moment';

const parseDivisionTitle = (divisionCode = '') => startCase(divisionCode.replaceAll('-', ' '));

// eslint-disable-next-line import/prefer-default-export
export const parseHolidaysData = (holidaysDataByDivision = {}) => Object.keys(holidaysDataByDivision).reduce(
    (result, divisionKeyName) => ({
        ...result,
        [divisionKeyName]: {
            ...holidaysDataByDivision[divisionKeyName],
            events: sortBy(
                holidaysDataByDivision[divisionKeyName]?.events || [],
                ['date', 'title']
            ).map((item) => ({ ...item, date: moment(item.date) })),
            divisionTitle: parseDivisionTitle(holidaysDataByDivision[divisionKeyName]?.division),
        }
    }),
    {}
);
