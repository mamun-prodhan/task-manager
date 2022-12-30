import { Spinner } from 'flowbite-react';
import React from 'react';

const ButtonLoader = () => {
    return (
        <div>
            <Spinner
                aria-label="Extra large spinner example"
                size="md"
            />
        </div>
    );
};

export default ButtonLoader;