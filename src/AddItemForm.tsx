import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {Add, AddBox, Delete} from '@material-ui/icons';

type PropsType = {
    addItem: (t: string) => void;
}
export const AddItemForm = ({addItem, ...props}: PropsType) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const onChangeInput = (ev: ChangeEvent<HTMLInputElement>) => {
        setTitle(ev.currentTarget.value);
        setError(false);
    }

    const titleTrim = title.trim()
    const addTaskOnClick = () => {
        titleTrim && addItem(titleTrim);
        !titleTrim && setError(true);
        setTitle('');
    }
    const onEnterPress = (ev: KeyboardEvent<HTMLInputElement>) => {
        ev.key === 'Enter' && titleTrim && addItem(titleTrim);
        ev.key === 'Enter' && titleTrim && setTitle('');
        ev.key === 'Enter' && !titleTrim && setError(true);
    }
    return (
        <div className="item_input">
            <TextField
                value={title}
                type="text"
                /* placeholder={'enter text'}*/
                onChange={onChangeInput}
                onKeyPress={onEnterPress}
                className={error ? 'error' : ''}
                size={'small'}
                error={error}
                helperText={error && 'title is required'}

                label={'title'}
            />

            <IconButton onClick={addTaskOnClick}
                        size={'small'}
            >
                <AddBox/>
            </IconButton>
            {/* {error && <p className={'error_message'}>Title is required</p>}*/}
        </div>
    )
}