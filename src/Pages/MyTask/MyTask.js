import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import MyTaskCard from '../MyTaskCard/MyTaskCard';
import Loader from '../Shared/Loader/Loader';

const MyTask = () => {

    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [isReload, setIsReload] = useState(true);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`https://task-manager-server-weld.vercel.app/tasks?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setTasks(data)
                setLoading(!true)
            })
    }, [user?.email, isReload])


    const handleDelete = (id) => {
        const proceed = window.confirm("Want to Delete task?");
        if (proceed) {
            fetch(`https://task-manager-server-weld.vercel.app/tasks/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success("Deleted Successfully");
                        const remaining = tasks.filter(task => task._id !== id);
                        setTasks(remaining);
                    }
                })
        }
    }
    
    const handleComplete = (singleTask) => {
        const proceed = window.confirm("Want to Complete task?");
        if(proceed){
            const completedTasks = {
                insertDate: new Date(),
                email: singleTask.email,
                task: singleTask.task,
                image: singleTask.image
            }
            fetch('https://task-manager-server-weld.vercel.app/completedTasks',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(completedTasks)
            })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    // toast.success("task completed");
                    console.log('task completed');
                    navigate('/completetask');
                }
            })
            .catch(err => console.error(err))
        }

        if (proceed) {
            fetch(`https://task-manager-server-weld.vercel.app/tasks/${singleTask._id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success("Task Completed");
                        const remaining = tasks.filter(task => task._id !== singleTask._id);
                        setTasks(remaining);
                    }
                })
        }
    }

    if(loading){
        return <Loader></Loader>
    }

    return (
        <div>
            <div className='my-12'>
                <p className='text-center text-5xl font-bold mb-4'>My All Tasks</p>
                <p className='text-center text-orange-600 font-bold text-2xl'>You have {tasks.length} tasks</p>
            </div>
            {
                tasks.length === 0 ?
                    <p className='text-4xl font-bold text-red-600 text-center my-20'>No tasks were added</p>
                    :
                    <>
                        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            {
                                tasks.map(task => <MyTaskCard
                                    key={task._id}
                                    task={task}
                                    isReload={isReload}
                                    setIsReload={setIsReload}
                                    handleDelete={handleDelete}
                                    handleComplete={handleComplete}



                                ></MyTaskCard>)
                            }
                        </div>
                    </>
            }


        </div>
    );
};

export default MyTask;