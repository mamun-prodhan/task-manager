import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React from 'react';

const Home = () => {
    return (
        <div>
            <h2 className='text-4xl font-bold text-center mt-16'>Add Your Task</h2>
            <form className="flex flex-col gap-4 w-1/2 mx-auto">
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
                        placeholder="New Task"
                        required={true}
                    />
                </div>
                <Button type="submit">
                    Add Task
                </Button>
            </form>
        </div>
    );
};

export default Home;