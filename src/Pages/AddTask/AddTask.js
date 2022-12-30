import { Button, FileInput, Label, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import ButtonLoader from '../Shared/ButtonLoader/ButtonLoader';

const AddTask = () => {
    const [loading, setLoading] = useState(!true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const handleAddTask = data => {
        setLoading(true);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const singleTask = {
                        insertDate: new Date(),
                        task: data.task,
                        image: imgData.data.url,
                        email: user?.email
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
                                reset();
                                setLoading(!true);
                            }
                        })
                        .catch(err => console.error(err))
                }
            })
    }


    return (
        <div className='w-96 p-7 mx-auto'>
            <h2 className='text-4xl font-bold text-center mt-16'>Add Task With Media</h2>
            <form onSubmit={handleSubmit(handleAddTask)}>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Add Task</span></label>
                    <TextInput type='text'
                        {...register("task", {
                            required: "Task is Required"
                        })}
                        className="" />
                    {errors.task && <p className='text-red-600'>{errors.task?.message}</p>}
                </div>

                <div className="form-control w-full  mt-2">
                    <label className="label"><span className="label-text">Image</span></label>
                    <FileInput type='file'
                        {...register("image", {
                            required: "Image is Required"
                        })}
                        className="" />
                    {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}
                </div>
                <Button className='w-full my-4' type="submit">
                    
                    {
                        loading === true && <ButtonLoader></ButtonLoader>
                    }
                    <span className='ml-2'>Add Task</span>
                </Button>
            </form>
        </div>
    );
};

export default AddTask;