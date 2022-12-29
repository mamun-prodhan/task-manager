import { Button, Card, Label, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const [error, setError] = useState('');
    const { login, providerLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            })
    }




    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setError('');
                navigate('/');
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    }

    return (
        <div className="max-w-sm mx-auto">
            <Card>
                <h2 className='text-4xl font-bold text-center'>Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="Your email"
                            />
                        </div>
                        <TextInput
                            id="email1"
                            name='email'
                            type="email"
                            placeholder="Enter Your Email"
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Your password"
                            />
                        </div>
                        <TextInput
                            id="password1"
                            name='password'
                            type="password"
                            placeholder='Enter Your Password'
                            required={true}
                        />
                    </div>

                    <Button className='mt-4' type="submit">
                        Login
                    </Button>
                    <Button onClick={handleGoogleSignIn}><FaGoogle className='mr-3'></FaGoogle>
                        Login With Google
                    </Button>
                </form>
                <p className='text-center'>New to Task Manager? <Link to="/signup" className='text-orange-600 mt-4 font-bold'>Sign Up</Link></p>
            </Card>
        </div>
    );
};

export default Login;