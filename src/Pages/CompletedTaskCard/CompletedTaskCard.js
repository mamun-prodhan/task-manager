import { Button, Card, Label, TextInput } from 'flowbite-react';
import React from 'react';

const CompletedTaskCard = ({ completedTask: singleTask, setIsReload, isReload, handleDelete, handleNotComplete }) => {
    const { _id, insertDate, email, task: myTask } = singleTask;
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
                                onClick={() => handleNotComplete(singleTask)}>
                                Not Complete
                            </Button>
                            <Button size="xs"
                                onClick={() => handleDelete(_id)} >
                                Delete
                            </Button>
                        </div>
                        <div className='border p-4 rounded mt-4'>
                            <form className="flex flex-col gap-4 w-full">
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="task"
                                            value="Comments"
                                        />
                                    </div>
                                    <TextInput
                                        id="task"
                                        type="text"
                                        name="task"
                                        placeholder="New Task"
                                        required={true}
                                        size="xs"
                                    />
                                </div>
                                <Button type="submit" size="xs">
                                    Add Comments
                                </Button>
                            </form>
                        </div>
                    </div>
                </Card>
            </div >
        </div>
    );
};

export default CompletedTaskCard;