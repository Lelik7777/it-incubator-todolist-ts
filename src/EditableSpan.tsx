import React, {useState} from 'react';

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
            <input
                value={value}
                onBlur={offEdit}
                autoFocus={true}
                onChange={(e) => setValue(e.currentTarget.value)}
            /> :
            <span onDoubleClick={onEdit}> {title}</span>
    )
}