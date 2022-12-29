import { Button, Label, TextInput } from 'flowbite-react';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Home = () => {

    const { user } = useContext(AuthContext);

    const handleTask = event => {
        event.preventDefault();
        const form = event.target;
        const task = form.task.value;
        const email = user?.email || 'unregistered';
        console.log(task);

        const singleTask = {
            insertDate: new Date(),
            email: email,
            task: task
        }

        fetch('https://task-manager-server-weld.vercel.app/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(singleTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Task Added");
                    form.reset();
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            {
                user?.email ?
                    <>
                        <h2 className='text-4xl font-bold text-center mt-16'>Add Your Task</h2>
                        <form onSubmit={handleTask} className="flex flex-col gap-4 w-1/2 mx-auto">
                            <div>
                                <div className="mb-2 block text-center">
                                    <Label
                                        htmlFor="task"
                                        value="Your task"
                                    />
                                </div>
                                <TextInput
                                    id="task"
                                    type="text"
                                    name="task"
                                    placeholder="New Task"
                                    required={true}
                                />
                            </div>
                            <Button type="submit">
                                Add Task
                            </Button>
                        </form>
                    </>
                    :
                    <>
                        <h2 className='text-4xl font-bold text-center mt-16 mb-6'>Please <Link to="/login"><span className='text-orange-600 font-bold'>Login</span></Link> To ADD TASK</h2>
                        <div className='max-w-lg mx-auto'>
                        <img src="https://i.ibb.co/sCpSVV1/task-ss.jpg" alt="task" />
                        </div>
                    </>

            }

        </div>
    );
};

export default Home;