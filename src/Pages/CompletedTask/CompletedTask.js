import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import CompletedTaskCard from '../CompletedTaskCard/CompletedTaskCard';

const CompletedTask = () => {
    const { user } = useContext(AuthContext);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isReload, setIsReload] = useState(true);


    useEffect(() => {
        fetch(`http://localhost:5000/completedTasks?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setCompletedTasks(data)
            })
    }, [user?.email])


    const handleDelete = (id) => {
        const proceed = window.confirm("Want to Delete Completed task?");
        if (proceed) {
            fetch(`http://localhost:5000/completedTasks/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success("Deleted Successfully");
                        const remaining = completedTasks.filter(completedTask => completedTask._id !== id);
                        setCompletedTasks(remaining);
                    }
                })
        }
    }

    const handleNotComplete = (singleTask) => {
        const proceed = window.confirm("Want to Add this task again?");
        if (proceed) {
            const notCompletedTasks = {
                insertDate: new Date(),
                email: singleTask.email,
                task: singleTask.task
            }
            fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(notCompletedTasks)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        // toast.success("task added again");
                        console.log("task added again");
                    }
                })
                .catch(err => console.error(err))
        }

        if (proceed) {
            fetch(`http://localhost:5000/completedTasks/${singleTask._id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success("Task Added Again");
                        const remaining = completedTasks.filter(completedTask => completedTask._id !== singleTask._id);
                        setCompletedTasks(remaining);
                    }
                })
        }
    }
    return (
        <div>
            <div className='my-12'>
                <p className='text-center text-5xl font-bold mb-4'>My All Completed Tasks</p>
                <p className='text-center text-orange-600 font-bold text-2xl'>You have {completedTasks.length} Completed Task</p>
            </div>
            {
                completedTasks.length === 0 ?
                    <p className='text-4xl font-bold text-red-600 text-center my-20'>No tasks were added</p>
                    :
                    <>
                        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            {
                                completedTasks.map(completedTask => <CompletedTaskCard
                                    key={completedTask._id}
                                    completedTask={completedTask}
                                    isReload={isReload}
                                    setIsReload={setIsReload}
                                    handleDelete={handleDelete}
                                    handleNotComplete={handleNotComplete}



                                ></CompletedTaskCard>)
                            }
                        </div>
                    </>
            }
        </div>
    );
};

export default CompletedTask;