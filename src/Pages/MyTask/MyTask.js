import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import MyTaskCard from '../MyTaskCard/MyTaskCard';

const MyTask = () => {

    const {user} = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);


    useEffect( ()=>{
        fetch(`http://localhost:5000/tasks?email=${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setTasks(data)
        })
    },[user?.email])

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


                                ></MyTaskCard>)
                            }
                        </div>
                    </>
            }

            
        </div>
    );
};

export default MyTask;