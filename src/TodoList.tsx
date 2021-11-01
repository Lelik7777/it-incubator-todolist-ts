import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from './App';


type TodoListType = {
    title: string;
    tasks: TaskType[];
    removeTask: (id: string) => void;
    changeStatusTasks: (s: FilterType) => void;
    addTask: (t: string) => void;
    filter: FilterType;
    changeTaskStatus: (id: string, isDone: boolean) => void;
}


export function TodoList({tasks, changeStatusTasks, addTask, filter, ...props}: TodoListType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const titleTrim = title.trim();
    const statusTasksAll = () => changeStatusTasks('all');
    const statusTasksActive = () => changeStatusTasks('active');
    const statusTasksCompleted = () => changeStatusTasks('completed');
    const addTaskOnClick = () => {
        // debugger;
        /* if (titleTrim)
             props.addTask(titleTrim);
         setTitle('');*/
        titleTrim && addTask(titleTrim);
       // titleTrim && setTitle('');
        !titleTrim&&setError(true);
        setTitle('');
    }
    const onChangeInput = (ev: ChangeEvent<HTMLInputElement>) => {
        setTitle(ev.currentTarget.value);
        setError(false);
    }
    const onEnterPress = (ev: KeyboardEvent<HTMLInputElement>) => {
        //title.trim()&&props.addTask(title.trim())

        /* if (ev.key === 'Enter' && titleTrim) {
             props.addTask(titleTrim);
             setTitle('');
         }*/
        ev.key === 'Enter' && titleTrim && addTask(titleTrim);
        ev.key === 'Enter' && titleTrim && setTitle('');
        ev.key === 'Enter' && !titleTrim && setError(true);
    }
    const className = filter === 'completed' ? 'active_filter' : '';
    const className1 = filter === 'active' ? 'active_filter' : '';
    const className2 = filter === 'all' ? 'active_filter' : '';
    return (
        <div className="todoList">
            <h1>{props.title}</h1>
            <div className={'input'}>

                <input value={title}
                       type="text"
                       placeholder={'enter text'}
                       onChange={onChangeInput}
                       onKeyPress={onEnterPress}
                       className={error?'error':''}
                />
                <button onClick={addTaskOnClick}>+</button>
                {error && <p className={'error_message'}>Title is required</p>}
            </div>
            <ul>y
                {
                    tasks.map(x => {
                        const removeTask = () => props.removeTask(x.id);
                        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(x.id, e.currentTarget.checked);
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
