import type {Meta, StoryObj} from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import React from 'react';
import {ReduxStoreProviderDecorator} from "../Components/state/ReduxStoreProviderDecorator";
import {TasksPropsType, TasksWithRedux} from "../Components/TasksWithRedux";
import {v1} from "uuid";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../Components/state/store";
import {TaskPropsType, TasksStateType} from "../Components/Todolist";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TasksWithRedux> = {
    title: 'TODOLIST/TasksWithRedux',
    component: TasksWithRedux,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    args: {
        task: {id: v1(), title: 'HTML&CSS', isDone: false},
        todolistId: 'todolistId1'
    },
    decorators: [ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    //decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof TasksWithRedux>;

const TaskForStories = () => {
    const task = useSelector<AppRootStateType, TaskPropsType>(state => state.tasks['todolistId1'][0])
    return <TasksWithRedux task={task} todolistId={'todolistId1'}/>
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TasksWithReduxStory: Story = {


    render: () => <TaskForStories/>

    // More on args: https://storybook.js.org/docs/react/writing-stories/args

};

