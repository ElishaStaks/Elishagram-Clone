import React from 'react';
import Loader from '../styles/Loader';

/**
 * Load spinner appaears when things are loading (duh)
 */
const LoadSpinner: React.FC = () => {
    return (
        <Loader>
            <div className="loader">Loading...</div>
        </Loader>
    );
}

export default LoadSpinner;