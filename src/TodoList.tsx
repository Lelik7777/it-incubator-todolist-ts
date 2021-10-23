import React from 'react';
import {TaskType} from './App';


type TodoListType = {
    title: string;
    tasks: TaskType[];
    removeTask: (id: number) => void;
}

function TodoList(props: TodoListType) {
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
                        return <li>
                            <input type="checkbox" checked={x.isDone}/>
                            <span>{x.title}</span>
                            <button onClick={() => props.removeTask(x.id)}>del</button>
                        </li>
                    })
                }
            </ul>
            <div className={'buttonChange'}>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;