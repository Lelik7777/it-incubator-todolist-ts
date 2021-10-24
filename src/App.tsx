import React, {useState} from 'react';
import './App.css';
import { TodoList } from './TodoList';


export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type FilterType = 'all' | 'completed' | 'active';

function App() {
    let [filter, setFilter] = useState<FilterType>('all');
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'Html', isDone: true},
        {id: 2, title: 'Css', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Angular', isDone: false},
    ]);

    function changeStatusTasks(status: FilterType) {
        setFilter(status);
    }

    function getFilterTasks(filter: FilterType) {
        switch (filter) {
            case 'all':
                return tasks;
            case 'completed':
                return tasks.filter(x => x.isDone);
            case 'active':
                return tasks.filter(x => !x.isDone)

        }
    }

    function removeTask(id: number) {
        //debugger;
        setTasks(tasks.filter(x => x.id != id));
    }

    return (
        <div className="App">
            <TodoList title={'what to learn'}
                      tasks={getFilterTasks(filter)}
                      removeTask={removeTask}
                      changeStatusTasks={changeStatusTasks}
            />
        </div>
    );
}

export default App;

