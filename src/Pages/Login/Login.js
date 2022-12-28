import { Button, Card, Label, TextInput } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {

    const {login} = useContext(AuthContext)

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
        .then(result=>{
            const user = result.user;
            console.log(user);
        })
        .catch(err=> console.error(err));
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
                </form>
                <p className='text-center'>New to Task Manager? <Link to="/signup" className='text-orange-600 mt-4 font-bold'>Sign Up</Link></p>
            </Card>
        </div>
    );
};

export default Login;