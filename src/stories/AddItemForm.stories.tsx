import type { Meta, StoryObj } from '@storybook/react';

import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import styles from "../Components/UnInput/UnInput.module.css";
import {AddItemForm, UnInputPropsType} from "../Components/UnInput/AddItemForm";



// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
   callBack: {
     description: 'Button clicked inside to form',
     action: 'clicked'
   }
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
      //callBack: action('Button clicked inside to form')
  }
}

export const AddItemWithErrorFormStory = (args:UnInputPropsType)=> {

        let [title, setTitle] = useState('')
        let [error, setError] = useState<boolean>(true)


        function addTaskHandler() {
            if (title.trim() !== '') {
                args.callBack(title.trim())
                setTitle('')
            } else {
                setError(true)
            }

        }

        function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
            setError(false)
            setTitle(event.currentTarget.value);
        }


        function oneKeyUpPressHandler(event: KeyboardEvent<HTMLInputElement>) {
            if (event.key === 'Enter') {
                addTaskHandler()
            }
        }

        return (
            <div>

            <TextField
        error={error}
        value={title}
        onChange={onChangeHandler}
        onKeyUp={oneKeyUpPressHandler}
        size={"small"}
        id="outlined-basic"
        label={error ? "Title is required" : "typing..."}
        variant="outlined"/>


            <Button
        style={{maxWidth: "35px", maxHeight: "38px", minWidth: "35px", minHeight: "38px", marginLeft: "1px"}}
        variant="contained" onClick={addTaskHandler}>+</Button>

        {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
        );

};
