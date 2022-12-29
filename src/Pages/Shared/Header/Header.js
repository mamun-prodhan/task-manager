import { Button, Navbar } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err))
    };

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
                        className=""
                        active={true}
                    >
                        <Button size="sm" color="light">
                            Home
                        </Button>
                    </Navbar>
                </Link>

                {
                    user?.email ?
                        <>
                            <Link to="/addtask">
                                <Navbar>
                                    <Button size="sm" color="light">
                                        Add Task
                                    </Button>
                                </Navbar>
                            </Link>

                            <Link to="/mytask">
                                <Navbar>
                                    <Button size="sm" color="light">
                                        My Task
                                    </Button>
                                </Navbar>
                            </Link>

                            <Link to="/completetask">
                                <Navbar>
                                    <Button size="sm" color="light">
                                        Complete Task
                                    </Button>
                                </Navbar>
                            </Link>

                            <Link to="/media">
                                <Navbar>
                                    <Button size="sm" color="light">
                                        Media
                                    </Button>
                                </Navbar>
                            </Link>

                            <Link>
                                <Navbar>
                                    <Button size="sm" color="light" onClick={handleLogOut}>
                                        Log Out
                                    </Button>
                                </Navbar>
                            </Link>
                        </>
                        :
                        <>
                            <Link to='/login'>
                                <Navbar>
                                    <Button size="sm" color="light">
                                        Login
                                    </Button>
                                </Navbar>
                            </Link>

                            <Link to='/signup'>
                                <Navbar>
                                    <Button size="sm" color="light">
                                        Sign Up
                                    </Button>
                                </Navbar>
                            </Link>
                        </>
                }

            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;