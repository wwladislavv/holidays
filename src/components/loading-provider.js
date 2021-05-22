import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

const LoadingProvider = ({
    fetching, children
}) => (
    fetching
        ? <Spinner animation="grow" />
        : children
);

LoadingProvider.propTypes = {
    fetching: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default LoadingProvider;
