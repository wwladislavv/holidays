import React, {
    useEffect, useCallback, useState,
} from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap';

import { LoadingProvider } from '../components';

const apiURL = 'https://www.gov.uk/bank-holidays.json';

// TODO: Implement table with raw events for each division

const Dashboard = () => {
    //
    const [holidaysData, setHolidaysData] = useState(null);
    const [fetchingHolidaysData, setFetchingHolidaysData] = useState(false);

    const handleLoadHolidaysData = useCallback(
        async () => {
            setFetchingHolidaysData(true);

            const response = await axios.get(apiURL);
            setHolidaysData(response.data);

            setFetchingHolidaysData(false);
        },
        []
    );

    useEffect(
        () => {
            handleLoadHolidaysData();
        },
        [handleLoadHolidaysData]
    );
    //

    //
    const [key, setKey] = useState('home');

    return (
        <div>
            <LoadingProvider fetching={fetchingHolidaysData}>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    {Object.keys(holidaysData).map(
                        (divisionName) => {
                            const holidayItemData = holidaysData[divisionName];
                            return (
                                <Tab key={divisionName}>
                                    {holidayItemData.division}
                                </Tab>
                            );
                        }
                    )}
                </Tabs>
            </LoadingProvider>
        </div>
    );
};

Dashboard.propTypes = {

};

export default Dashboard;
