import React, {
    useEffect, useCallback, useState,
} from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import {
    Container,
} from 'react-bootstrap';
import classnames from 'classnames';

import { LoadingProvider } from '../components';

import DivisionsRow from './components/divisions-row';

import { parseHolidaysData } from './utils';

import './style.css';

const apiURL = 'https://www.gov.uk/bank-holidays.json';

const Dashboard = () => {
    //
    // const [activeTabKey, setActiveTabKey] = useState(null);

    // const handleTabSelect = useCallback(
    //     (nextKey) => {
    //         setActiveTabKey(nextKey);
    //     },
    //     []
    // );
    //

    //
    const [divisionsData, setDivisionsData] = useState(null);
    const [fetchingDivisionsData, setFetchingDivisionsData] = useState(false);

    const handleLoadDivisionsData = useCallback(
        async () => {
            setFetchingDivisionsData(true);

            const response = await axios.get(apiURL);
            const data = parseHolidaysData(response.data);
            setDivisionsData(data);

            setFetchingDivisionsData(false);
        },
        []
    );
    // useEffect(
    //     () => {
    //         const firstDivisionName = Object.keys(holidaysData || [])?.[0];
    //         setActiveTabKey(firstDivisionName || null);
    //     },
    //     [holidaysData]
    // );

    useEffect(
        () => {
            handleLoadDivisionsData();
        },
        [handleLoadDivisionsData]
    );
    //

    return (
        <div className="dashboard-page">
            <Container
                className={classnames('dashboard-page__container d-flex justify-content-center', {
                    loading: fetchingDivisionsData,
                })}
            >
                <LoadingProvider fetching={fetchingDivisionsData}>
                    {divisionsData === null
                        ? 'No data'
                        : (
                            <DivisionsRow divisionsData={divisionsData} />
                        )}
                </LoadingProvider>
            </Container>
        </div>
    );
};

Dashboard.propTypes = {

};

export default Dashboard;
