import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';
import {
    Switch,
    Route,
} from 'react-router-dom';
import {
    Container, Row,
} from 'react-bootstrap';
import classnames from 'classnames';
import isNull from 'lodash/isNull';

import routes from '../router/routes';

import Navbar from './components/navbar';
import DivisionsRow from './components/divisions-row';
import DivisionCard from './components/division-card';

import useDisivionsData from './hooks/use-divisions-data';

import './style.css';

const defaultBreadcrumb = {
    all: {
        divisionTitle: '    All',
    }
};

const Dashboard = () => {
    const { divisionsData, fetchingDivisionsData } = useDisivionsData();

    const breadcrumbsItemsByDivision = useMemo(
        () => ({
            ...defaultBreadcrumb,
            ...divisionsData
        }),
        [divisionsData]
    );

    const renderDashboardRouteWithProps = useMemo(() => ({
        root: () => (!isNull(divisionsData) ? <DivisionsRow divisionsData={divisionsData} /> : 'No Data'),
        details: (routeProps) => (
            <Row
                className="dashboard-page__row single"
                xs={1}
            >
                {divisionsData && (
                    <DivisionCard
                        // eslint-disable-next-line react/prop-types
                        {...divisionsData?.[routeProps.match.params.divisionName]}
                    />
                )}
            </Row>
        ),
    }), [divisionsData]);

    return (
        <div className="dashboard-page">
            <Container
                className={classnames('dashboard-page__container', {
                    loading: fetchingDivisionsData,
                })}
            >
                <Navbar
                    navItems={breadcrumbsItemsByDivision}
                    fetching={fetchingDivisionsData}
                />

                <Switch>
                    <Route
                        path={routes.dashboard.route}
                        exact
                        component={renderDashboardRouteWithProps.root}
                    />

                    <Route
                        path={routes.dashboard.detailed}
                        exact
                        component={renderDashboardRouteWithProps.details}
                    />
                </Switch>
            </Container>
        </div>
    );
};

Dashboard.propTypes = {

};

export default Dashboard;
