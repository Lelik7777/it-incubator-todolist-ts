import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {changeTaskStatusAC, changeTitleTaskAC, removeTaskAC} from './store/tasksReducer';
import {TaskType} from './AppWtihSelector';

type PropsType={
    id:string;
    idL:string;
}
export const Task = ({id,idL}:PropsType) => {
    const task=useSelector<AppRootStateType,TaskType>(state=> state.tasks[idL].filter(x=>x.id===id)[0]);
    const dispatch=useDispatch();
    const removeTask = () => dispatch(removeTaskAC(id,idL));
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(id, e.currentTarget.checked, idL));
    }

    const callBack1 = (t: string) =>dispatch(changeTitleTaskAC(t, idL, task.id))


    return (
        <ListItem className={task&&task.isDone ? 'isDone' : ''}
                  divider={true}
        >
            <Checkbox
                onChange={onChange}
                checked={task.isDone}
                color={'primary'}
            />
            <EditableSpan title={task.title} callBack={callBack1}/>
            <IconButton onClick={removeTask} size={'small'} color={'primary'}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
}