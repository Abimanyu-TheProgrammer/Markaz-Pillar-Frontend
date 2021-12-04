import React from 'react';
import ErrorView from '../component/templates/ErrorView'

const Fallback = () => (
    <>
        <ErrorView statusCode={500} title='Maaf, anda tidak memiliki koneksi internet.' />
    </>
);

export default Fallback;