import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from './App';


type TodoListType = {
    idL: string;
    title: string;
    tasks: TaskType[];
    removeTask: (id: string, idL: string) => void;
    changeStatusTasks: (s: FilterType, idL: string) => void;
    addTask: (t: string, idL: string) => void;
    filter: FilterType;
    changeTaskStatus: (id: string, isDone: boolean, idL: string) => void;
    removeList: (idL: string) => void;
    addList: (t: string) => void;
}


export function TodoList({
                             idL,
                             tasks,
                             changeStatusTasks,
                             addTask,
                             filter,
                             removeList,
                             addList,
                             ...props
                         }: TodoListType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const titleTrim = title.trim();
    const statusTasksAll = () => changeStatusTasks('all', idL);
    const statusTasksActive = () => changeStatusTasks('active', idL);
    const statusTasksCompleted = () => changeStatusTasks('completed', idL);
    const addTaskOnClick = () => {
        titleTrim && addTask(titleTrim, idL);
        !titleTrim && setError(true);
        setTitle('');
    }
    const onChangeInput = (ev: ChangeEvent<HTMLInputElement>) => {
        setTitle(ev.currentTarget.value);
        setError(false);
    }
    const onEnterPress = (ev: KeyboardEvent<HTMLInputElement>) => {
        ev.key === 'Enter' && titleTrim && addTask(titleTrim, idL);
        ev.key === 'Enter' && titleTrim && setTitle('');
        ev.key === 'Enter' && !titleTrim && setError(true);
    }
    const className = filter === 'completed' ? 'active_filter' : '';
    const className1 = filter === 'active' ? 'active_filter' : '';
    const className2 = filter === 'all' ? 'active_filter' : '';
    const onClick = () => removeList(idL);
    return (
        <div className="todoList">
            <h1>
                {props.title}
                <button onClick={onClick}>x</button>
            </h1>
            <div className={'input'}>

                <input value={title}
                       type="text"
                       placeholder={'enter text'}
                       onChange={onChangeInput}
                       onKeyPress={onEnterPress}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskOnClick}>+</button>
                {error && <p className={'error_message'}>Title is required</p>}
            </div>
            <ul>
                {
                    tasks.map(x => {
                        const removeTask = () => props.removeTask(x.id, idL);
                        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(x.id, e.currentTarget.checked, idL);
                        }
                        return (
                            <li className={x.isDone ? 'isDone' : ''}>
                                <input
                                    type="checkbox"
                                    checked={x.isDone}
                                    onChange={onChange}

                                />
                                <span>{x.title}</span>
                                <button onClick={removeTask}>del</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div className={'buttonChange'}>
                <button onClick={statusTasksAll} className={className2}>All</button>
                <button onClick={statusTasksActive} className={className1}>Active</button>
                <button onClick={statusTasksCompleted} className={className}>Completed</button>
            </div>
        </div>
    );
}
