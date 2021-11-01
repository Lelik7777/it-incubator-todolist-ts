import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';


export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterType = 'all' | 'completed' | 'active';

function App() {
    let [filter, setFilter] = useState<FilterType>('all');
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'Html', isDone: true},
        {id: v1(), title: 'Css', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Angular', isDone: false},
    ]);

    const changeStatusTasks = (status: FilterType) => {
        setFilter(status);
    }

    const getFilterTasks = (filter: FilterType) => {
        switch (filter) {
            case 'all':
                return tasks;
            case 'completed':
                return tasks.filter(x => x.isDone);
            case 'active':
                return tasks.filter(x => !x.isDone)

        }
    }

    const removeTask = (id: string) => {
        //debugger;
        setTasks(tasks.filter(x => x.id != id));
    }
    const addTask = (title: string) => {
        /* const newTask:TaskType={id:v1(),title,isDone:false};
         setTasks([newTask,...tasks]);*/
        setTasks([{id: v1(), title, isDone: false}, ...tasks]);
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(x => x.id === id ? {...x, isDone} : x));
    }
    return (
        <div className="App">
            <TodoList title={'what to learn'}
                      tasks={getFilterTasks(filter)}
                      removeTask={removeTask}
                      changeStatusTasks={changeStatusTasks}
                      addTask={addTask}
                      filter={filter}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;

