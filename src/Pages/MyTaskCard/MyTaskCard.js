import { Button, Card } from 'flowbite-react';
import React from 'react';
import UpdateModal from '../UpdateModal/UpdateModal';

const MyTaskCard = ({task:singleTask, setIsReload, isReload, handleDelete, handleComplete}) => {

    const {_id, insertDate, email, task:myTask} = singleTask;



    return (
        <div>
            <div className="max-w-sm">
                <Card>
                    <div className="flex flex-col items-center pb-10">
                        <h5 className="mb-1 text-md text-center font-bold text-gray-900 dark:text-white">
                            {myTask}
                        </h5>
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