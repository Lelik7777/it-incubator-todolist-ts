import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from './App';


type TodoListType = {
    title: string;
    tasks: TaskType[];
    removeTask: (id: string) => void;
    changeStatusTasks: (s: FilterType) => void;
    addTask: (t: string) => void;
}


export function TodoList(props: TodoListType) {
    const [title, setTitle] = useState<string>('');
    const titleTrim = title.trim();
    const statusTasksAll = () => props.changeStatusTasks('all');
    const statusTasksActive = () => props.changeStatusTasks('active');
    const statusTasksCompleted = () => props.changeStatusTasks('completed');
    const addTaskOnClick = () => {
        // debugger;
        if (titleTrim)
            props.addTask(titleTrim);
        setTitle('');
    }
    const onChangeInput = (ev: ChangeEvent<HTMLInputElement>) => {
        setTitle(ev.currentTarget.value);
    }
    const onEnterPress = (ev: KeyboardEvent<HTMLInputElement>) => {
        //title.trim()&&props.addTask(title.trim())

        if (ev.key === 'Enter' && titleTrim) {
            props.addTask(titleTrim);
            setTitle('');
        }
    }
    return (
        <div className="todoList">
            <h1>{props.title}</h1>
            <div className={'input'}>

                <input value={title}
                       type="text"
                       placeholder={'enter text'}
                       onChange={onChangeInput}
                       onKeyPress={onEnterPress}
                />
                <button onClick={addTaskOnClick}>+</button>
            </div>
            <ul>y
                {
                    props.tasks.map(x => {
                        const removeTask = () => props.removeTask(x.id);
                        return (
                            <li>
                                <input type="checkbox" checked={x.isDone}/>
                                <span>{x.title}</span>
                                <button onClick={removeTask}>del</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div className={'buttonChange'}>
                <button onClick={statusTasksAll}>All</button>
                <button onClick={statusTasksActive}>Active</button>
                <button onClick={statusTasksCompleted}>Completed</button>
            </div>
        </div>
    );
}
