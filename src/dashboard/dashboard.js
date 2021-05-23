import React from 'react';
// import PropTypes from 'prop-types';
import {
    Container,
} from 'react-bootstrap';
import classnames from 'classnames';
import isNull from 'lodash/isNull';

import { LoadingProvider } from '../components';

import DivisionsRow from './components/divisions-row';

import useDisivionsData from './hooks/use-divisions-data';

import './style.css';

// const DefaultFilter

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

    const { divisionsData, fetchingDivisionsData } = useDisivionsData();

    return (
        <div className="dashboard-page">
            <Container
                className={classnames('dashboard-page__container', {
                    loading: fetchingDivisionsData,
                })}
            >
                <h1>UK bank holidays</h1>

                <LoadingProvider fetching={fetchingDivisionsData}>
                    {isNull(divisionsData)
                        ? 'No data found'
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
