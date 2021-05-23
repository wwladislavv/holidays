import {
    useEffect, useCallback, useState,
} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { parseHolidaysData } from '../utils';
import routes from '../../router/routes';

const apiURL = 'https://www.gov.uk/bank-holidays.json';

const useDisivionsData = () => {
    const history = useHistory();

    const [divisionsData, setDivisionsData] = useState(null);
    const [fetchingDivisionsData, setFetchingDivisionsData] = useState(false);

    const handleLoadDivisionsData = useCallback(
        async () => {
            setFetchingDivisionsData(true);
            try {
                const response = await axios.get(apiURL);
                const data = parseHolidaysData(response.data);
                setDivisionsData(data);

                setFetchingDivisionsData(false);

                const isRootRoute = history.location.pathname === '/';
                if (isRootRoute) {
                    history.push(routes.dashboard.route);
                }
            } catch (error) {
                console.error(error);

                setFetchingDivisionsData(false);
            }
        },
        [history]
    );

    useEffect(
        () => {
            handleLoadDivisionsData();
        },
        [handleLoadDivisionsData]
    );

    return {
        divisionsData,
        fetchingDivisionsData,
    };
};

export default useDisivionsData;
