import React, {ChangeEvent, memo, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    callBack: (currentTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> =memo( (props) => {
      const [edit, setEdit] = useState(false)

    const [currentTitle, setCurrentTitle] = useState(props.title)

    function changeEdite () {
        setEdit(!edit)
        ChangeTask1()

    }

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setCurrentTitle(event.currentTarget.value);
    }

    function ChangeTask1() {
        if (currentTitle.trim() !== '') {
            props.callBack(currentTitle.trim())

        }

    }
    return (
        edit
            ? <input value={currentTitle} onBlur={ changeEdite} onChange={onChangeHandler}  autoFocus/>
            : <span onDoubleClick={changeEdite} >{props.title}</span>
    );

});

