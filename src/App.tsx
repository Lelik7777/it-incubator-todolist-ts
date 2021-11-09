import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';


export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TasksType = {
    [key: string]: TaskType[];
}
export type FilterType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string;
    title: string;
    filter: FilterType;
}

function App() {
    const id1 = v1();
    const id2 = v1();
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: id1, title: 'to learn', filter: 'all'},
        {id: id2, title: 'to buy', filter: 'all'}
    ])
    let [tasks, setTasks] = useState<TasksType>({
        [id1]: [
            {id: v1(), title: 'Html', isDone: true},
            {id: v1(), title: 'Css', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Angular', isDone: false},
        ],
        [id2]: [
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'beer', isDone: false},
            {id: v1(), title: 'vine', isDone: false},
        ],
    });


    const changeStatusTasks = (filter: FilterType, idL: string) => {
        setTodoLists(todoLists.map(x => x.id === idL ? {...x, filter} : x));
    }

    const getFilterTasks = (filter: FilterType, idL: string) => {
        switch (filter) {
            case 'all':
                return tasks[idL];
            case 'completed':
                return tasks[idL].filter(x => x.isDone);
            case 'active':
                return tasks[idL].filter(x => !x.isDone)

        }
    }

    const removeTask = (id: string, idL: string) => {
        //debugger;
        setTasks({...tasks, [idL]: tasks[idL].filter(x => x.id !== id)});
    }
    const addTask = (title: string, idL: string) => {

        setTasks({...tasks, [idL]: [...tasks[idL], {id: v1(), title, isDone: false}]});

    }
    const changeTaskStatus = (id: string, isDone: boolean, idL: string) => {
        setTasks({...tasks, [idL]: tasks[idL].map(x => x.id === id ? {...x, isDone} : x)});
    }
    const removeList = (idL: string) => {
        setTodoLists(todoLists.filter(x => x.id !== idL));
        // delete tasks[idL];
    }
    const addList = (title: string) => {
        const newList: TodoListType = {id: v1(), title, filter: 'all'};
        setTodoLists([...todoLists, newList]);
        setTasks({...tasks, [newList.id]: []})
    }
    const mappedTodoLists = todoLists.map(x =>
        <TodoList
            idL={x.id}
            key={x.id}
            tasks={getFilterTasks(x.filter, x.id)}
            removeTask={removeTask}
            changeStatusTasks={changeStatusTasks}
            addTask={addTask}
            filter={x.filter}
            changeTaskStatus={changeTaskStatus}
            title={x.title}
            removeList={removeList}
            addList={addList}
        />
    );


    return (
        <div className="App">
            {mappedTodoLists}
        </div>
    )
}

export default App;

