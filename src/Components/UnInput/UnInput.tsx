import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './UnInput.module.css'


type UnInputPropsType = {
    callBack: (title: string) => void
}

export const UnInput = (props: UnInputPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    function addTaskHandler() {
        if (title.trim() !== '') {
            props.callBack(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }

    }

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setError(null)
        setTitle(event.currentTarget.value);
    }


    function oneKeyUpPressHandler(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }


    return (
        <div>

            <input value={title}
                   className={error ? styles.error : ''}
                   onChange={onChangeHandler}
                   onKeyUp={oneKeyUpPressHandler}/>
            <button onClick={addTaskHandler}>+
            </button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

