import { Button, Card, Label, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const SignUp = () => {
    const [error, setError] = useState('');
    const {createUser, updateUserProfile} = useContext(AuthContext);

    const handleSignUp = event =>{
        event.preventDefault();
        setError('');
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser(email, password)
        .then(result =>{
            const user = result.user;
            toast.success('User Created Successfully');
            console.log(user);
            form.reset();
            handleUpdateUserProfile(name);
        })
        .catch(err => {
            console.error(err);
            setError(err.message);
        });
    }

    const handleUpdateUserProfile = (name) => {
        const profile = {
            displayName: name
        }
        updateUserProfile(profile)
            .then(() => { })
            .catch(err => {
                console.error(err);
                setError(err.message);
            })
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
                    <p className='text-red-600 mt-4'>{error}</p>
                    
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