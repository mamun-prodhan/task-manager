import { Button, Card } from 'flowbite-react';
import React from 'react';
import UpdateModal from '../UpdateModal/UpdateModal';

const MyTaskCard = ({task:singleTask, setIsReload, isReload, handleDelete, handleComplete}) => {

    const {_id,image, insertDate, email, task:myTask} = singleTask;



    return (
        <div>
            <div className="max-w-sm">
                <Card>
                    <div className="flex flex-col items-center pb-10">
                        <h5 className="mb-1 text-md text-center font-bold text-gray-900 dark:text-white">
                            Task: {myTask}
                        </h5>
                        {
                            singleTask?.image ? <img className='rounded mt-4' src={image} style={{width: "300px", height:"200px"}} alt="imagetask" /> : <><img className='border-2 rounded mt-4' src="https://i.ibb.co/Bjs7kyP/No-Image-Added.png" alt="" /></>
                        }
                        <div className="mt-4 flex space-x-3 lg:mt-6">
                            <Button size="xs"
                            onClick={()=>handleComplete(singleTask)}>
                                Complete
                            </Button>

                            <Button size="xs"
                            onClick={()=>handleDelete(_id)} >
                                Delete
                            </Button>

                            <UpdateModal
                            singleTask={singleTask}
                            setIsReload={setIsReload}
                            isReload={isReload}
                            />
                        </div>
                    </div>
                </Card>
            </div >
        </div >
    );
};

export default MyTaskCard;