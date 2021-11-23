import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';


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
    changeTitleTask: (title: string, idL: string, id: string) => void;
    changeTitleList: (title: string, idL: string) => void;
}


export function TodoList({
                             idL,
                             tasks,
                             changeStatusTasks,
                             addTask,
                             filter,
                             removeList,
                             addList,
                             changeTitleTask,
                             changeTitleList,
                             ...props
                         }: TodoListType) {

    const statusTasksAll = () => changeStatusTasks('all', idL);
    const statusTasksActive = () => changeStatusTasks('active', idL);
    const statusTasksCompleted = () => changeStatusTasks('completed', idL);
    const addTaskL = (t: string) => {
        addTask(t, idL)
    }
    const className = filter === 'completed' ? 'active_filter' : '';
    const className1 = filter === 'active' ? 'active_filter' : '';
    const className2 = filter === 'all' ? 'active_filter' : '';
    const onClick = () => removeList(idL);
    const callBack = (t: string) => changeTitleList(t,idL);
    return (
        <div className="todoList">
            <h1>

                <EditableSpan title={props.title} callBack={callBack}/>
                <button onClick={onClick}>x</button>
            </h1>
            <div className={'input'}>
                <AddItemForm addItem={addTaskL}/>

            </div>
            <ul>
                {
                    tasks.map(x => {
                        const removeTask = () => props.removeTask(x.id, idL);
                        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(x.id, e.currentTarget.checked, idL);
                        }

                        const callBack1 = (t: string) => changeTitleTask(t,idL,x.id);
                        return (
                            <li className={x.isDone ? 'isDone' : ''}>
                                <input
                                    type="checkbox"
                                    checked={x.isDone}
                                    onChange={onChange}

                                />
                                <EditableSpan title={x.title} callBack={callBack1}/>
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

