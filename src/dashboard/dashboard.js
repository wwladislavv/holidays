import React, {
    useEffect, useCallback, useState,
} from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import {
    Container, Row, Col,
    Card, Table,
} from 'react-bootstrap';
import classnames from 'classnames';

import { LoadingProvider } from '../components';

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
    const [holidaysData, setHolidaysData] = useState(null);
    const [fetchingHolidaysData, setFetchingHolidaysData] = useState(false);

    const handleLoadHolidaysData = useCallback(
        async () => {
            setFetchingHolidaysData(true);

            const response = await axios.get(apiURL);
            const data = parseHolidaysData(response.data);
            setHolidaysData(data);

            setFetchingHolidaysData(false);
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
            handleLoadHolidaysData();
        },
        [handleLoadHolidaysData]
    );
    //

    return (
        <div className="dashboard-page">
            <Container
                className={classnames('dashboard-page__container d-flex justify-content-center', {
                    loading: fetchingHolidaysData,
                })}
            >
                <LoadingProvider fetching={fetchingHolidaysData}>
                    {holidaysData === null
                        ? 'No data'
                        : (
                            <Row
                                className="dashboard-page__row justify-content-between"
                                xs={1}
                                md={2}
                                lg={3}
                            >
                                {Object.keys(holidaysData).map(
                                    (divisionName) => {
                                        const divisionItemData = holidaysData[divisionName];
                                        return (
                                            <Col>
                                                <Card>
                                                    <Card.Header>
                                                        <Card.Title>{divisionItemData.divisionTitle}</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Table
                                                            borderless
                                                            striped
                                                            hover
                                                        >
                                                            <tbody>
                                                                {divisionItemData.events.map(
                                                                    ({
                                                                        date, notes,
                                                                        title, bunting,
                                                                    }) => (
                                                                        <tr>
                                                                            <td className="date-cell">
                                                                                {date}
                                                                            </td>
                                                                            <td className="flag-cell">
                                                                                {bunting && <i className="bi bi-flag" />}
                                                                            </td>
                                                                            {/* TODO: add day of week column */}
                                                                            <td>
                                                                                {title} {!!notes?.length && `(${notes})`}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )}
                                                            </tbody>
                                                        </Table>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        );
                                    }
                                )}
                            </Row>
                        )}
                </LoadingProvider>
            </Container>
        </div>
    );
};

Dashboard.propTypes = {

};

export default Dashboard;
