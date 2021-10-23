import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'Html',isDone:true},
        {id: 2, title: 'Css', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Angular', isDone: false},
    ]);

    function removeTask(id: number) {
        //debugger;
        setTasks(tasks.filter(x => x.id != id));
    }

    return (
        <div className="App">
            <TodoList title={'what to learn'}
                      tasks={tasks}
                      removeTask={removeTask}/>

        </div>
    );
}

export default App;

