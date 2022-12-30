import { Spinner } from 'flowbite-react';
import React from 'react';

const Loader = () => {
    return (
        <div className='text-center'>
            <Spinner
                aria-label="Extra large spinner example"
                size="xl"
            />
        </div>
    );
};

export default Loader;