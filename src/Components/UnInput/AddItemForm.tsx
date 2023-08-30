import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import styles from './UnInput.module.css'
import {Button, TextField} from "@mui/material";


export type UnInputPropsType = {
    callBack: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = memo((props: UnInputPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<boolean>(false)


    function addTaskHandler() {
        if (title.trim() !== '') {
            props.callBack(title.trim())
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
                variant="outlined"
                disabled={props.disabled}/>

            {/* <button onClick={addTaskHandler}>+</button>*/}
            <Button
                style={{maxWidth: "35px", maxHeight: "38px", minWidth: "35px", minHeight: "38px", marginLeft: "1px"}}
                variant="contained" onClick={addTaskHandler}
                disabled={props.disabled}>+</Button>

            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
});

