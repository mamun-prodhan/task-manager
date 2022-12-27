import { Button, Card, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const handleSignUp = event =>{
        event.preventDefault();
    }

    return (
        <div className="max-w-sm mx-auto">
            <Card>
            <h2 className='text-4xl font-bold text-center'>Sign Up</h2>
                <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="name1"
                                value="Your name"
                            />
                        </div>
                        <TextInput
                            id="name1"
                            type="text"
                            name='name'
                            placeholder="Enter Your Name"
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="Your email"
                            />
                        </div>
                        <TextInput
                            id="email1"
                            type="email"
                            name='email'
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
                            type="password"
                            name='password'
                            placeholder='Enter Your Password'
                            required={true}
                        />
                    </div>
                    
                    <Button className='mt-4' type="submit">
                        Sign Up
                    </Button>
                </form>
                <p className='text-center'>Already Have an Account? <Link to="/login" className='text-orange-600 mt-4 font-bold'>Login</Link></p>
            </Card>
        </div>
    );
};

export default SignUp;