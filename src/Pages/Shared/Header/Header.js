import { Navbar } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar
            className='mb-16'
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand href="https://flowbite.com/">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Task Manager
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>

                <Link to="/">
                    <Navbar
                         className="bg-sky-500 hover:bg-sky-700 rounded"
                        active={true}
                    >
                        Home
                    </Navbar>
                </Link>

                <Link to="/addtask">
                    <Navbar>
                        Add Task
                    </Navbar>
                </Link>

                <Link to="/mytask">
                    <Navbar>
                        My Task
                    </Navbar>
                </Link>

                <Link to="/completetask">
                    <Navbar>
                        Complete Task
                    </Navbar>
                </Link>

                <Link to="/media">
                    <Navbar>
                        Media
                    </Navbar>
                </Link>

                <Link to='/login'>
                    <Navbar>
                        Login
                    </Navbar>
                </Link>

                <Link to='/signup'>
                    <Navbar>
                        Sign Up
                    </Navbar>
                </Link>

            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;