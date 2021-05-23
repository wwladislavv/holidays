import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Navbar as NavbarComponent } from 'react-bootstrap';

import routes, { DivisionName } from '../../router/routes';

const Navbar = ({ fetching, navItems }) => (
    <NavbarComponent
        className="dashboard-page__navbar mb-4 py-4 d-flex align-items-center"
        bg="light"
        expand
        fixed="top"
    >
        <NavbarComponent.Brand className="text-info font-weight-bold">
            UK Bank Holidays
        </NavbarComponent.Brand>

        {!fetching && (
            <NavbarComponent.Text>
                {Object.keys(navItems).map(
                    (divisionName, index, array) => (
                        <Fragment key={divisionName}>
                                &nbsp;
                            <NavLink
                                className="dashboard-page__navbar-link"
                                to={divisionName === 'all'
                                    ? routes.dashboard.route
                                    : routes.dashboard.detailed.replace(DivisionName, divisionName)}
                                exact
                            >
                                {navItems[divisionName].divisionTitle}
                            </NavLink>
                                &nbsp;
                            {index + 1 !== array.length && '/'}
                        </Fragment>
                    )
                )}
            </NavbarComponent.Text>
        )}
    </NavbarComponent>
);

Navbar.propTypes = {
    fetching: PropTypes.bool.isRequired,
    navItems: PropTypes.object.isRequired,
};

export default Navbar;
