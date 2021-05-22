import startCase from 'lodash/startCase';

const parseDivisionTitle = (divisionCode = '') => startCase(divisionCode.replaceAll('-', ' '));

// eslint-disable-next-line import/prefer-default-export
export const parseHolidaysData = (holidaysDataByDivision = {}) => Object.keys(holidaysDataByDivision).reduce(
    (result, divisionKeyName) => ({
        ...result,
        [divisionKeyName]: {
            ...holidaysDataByDivision[divisionKeyName],
            divisionTitle: parseDivisionTitle(holidaysDataByDivision[divisionKeyName]?.division),
        }
    }),
    {}
);
