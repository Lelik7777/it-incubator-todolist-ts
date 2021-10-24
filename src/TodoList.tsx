import React from 'react';
import {FilterType, TaskType} from './App';


type TodoListType = {
    title: string;
    tasks: TaskType[];
    removeTask: (id: number) => void;
    changeStatusTasks: (s: FilterType) => void;
}


 export function TodoList(props: TodoListType) {
    const statusTasksAll = () => props.changeStatusTasks('all');
    const statusTasksActive = () => props.changeStatusTasks('active');
    const statusTasksCompleted = () => props.changeStatusTasks('completed');
    return (
        <div className="todoList">
            <h1>{props.title}</h1>
            <div className={'input'}>

                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(x => {
                        const removeTask = () => props.removeTask(x.id);
                        return <li>
                            <input type="checkbox" checked={x.isDone}/>
                            <span>{x.title}</span>
                            <button onClick={removeTask}>del</button>
                        </li>
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
