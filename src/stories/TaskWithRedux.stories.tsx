import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {ReduxStoreProviderDecorator} from "../Components/state/ReduxStoreProviderDecorator";
import {TasksWithRedux} from "../Components/TasksWithRedux";
import {v1} from "uuid";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../Components/state/store";
import {TaskGetType, taskPriority, taskStatuses} from "../api/tasksApi/tasksApi";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TasksWithRedux> = {
    title: 'TODOLIST/TasksWithRedux',
    component: TasksWithRedux,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    args: {
        task: {
            id: v1(),
            todoListId: 'todolistId1',
            title: 'JS',
            status: taskStatuses.Completed,
            priority: taskPriority.Low,
            startDate: '',
            deadline: '',
            order: 0,
            addedDate: '',
            description: ''
        },
        todolistId: 'todolistId1'
    },
    decorators: [ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    //decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof TasksWithRedux>;

const TaskForStories = () => {
    const task = useSelector<AppRootStateType, TaskGetType>(state => state.tasks['todolistId1'][0])
    return <TasksWithRedux task={task} todolistId={'todolistId1'}/>
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TasksWithReduxStory: Story = {


    render: () => <TaskForStories/>
    // More on args: https://storybook.js.org/docs/react/writing-stories/args

};

