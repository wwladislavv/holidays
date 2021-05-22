import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

import { ColorVariants } from '../../global-recources/global-resources';

import './style.css';

const LoadingProvider = ({
    fetching, children, colorVariant,
}) => (
    fetching
        ? <Spinner animation="grow" variant={colorVariant} />
        : children
);

LoadingProvider.defaultProps = {
    colorVariant: ColorVariants.info,
};
LoadingProvider.propTypes = {
    fetching: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    colorVariant: PropTypes.oneOf(Object.keys(ColorVariants)),
};

LoadingProvider.colorVariants = ColorVariants;

export default LoadingProvider;
