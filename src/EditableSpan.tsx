import React, {useState} from 'react';
import {TextField} from '@material-ui/core';

type PropsType = {
    title: string;
    callBack: (t: string) => void;
}
export const EditableSpan = ({title, callBack, ...props}: PropsType) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const onEdit = () => {
        setEdit(true);
        //setValue(title);
    }
    const offEdit = () => {
        setEdit(false);
        callBack(value);
    }
    return (
        edit ?
            <TextField
                value={value}
                onBlur={offEdit}
                autoFocus={true}
                onChange={(e) => setValue(e.currentTarget.value)}
            />
            :
            <span onDoubleClick={onEdit}> {title}</span>
    )
}