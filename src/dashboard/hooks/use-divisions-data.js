import {
    useEffect, useCallback, useState,
} from 'react';
import axios from 'axios';

import { parseHolidaysData } from '../utils';

const apiURL = 'https://www.gov.uk/bank-holidays.json';

const useDisivionsData = () => {
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
            } catch (error) {
                console.error(error);

                setFetchingDivisionsData(false);
            }
        },
        []
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
