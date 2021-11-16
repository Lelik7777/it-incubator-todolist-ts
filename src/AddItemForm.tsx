import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    addItem: (t: string) => void;
}
export const AddItemForm = ({addItem,...props}: PropsType) => {
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
        <div className='item_input'>
            <input

                value={title}
                type="text"
                placeholder={'enter text'}
                onChange={onChangeInput}
                onKeyPress={onEnterPress}
                className={error ? 'error' : ''}
            />
            <button onClick={addTaskOnClick}>+</button>
            {error && <p className={'error_message'}>Title is required</p>}
        </div>
    )
}