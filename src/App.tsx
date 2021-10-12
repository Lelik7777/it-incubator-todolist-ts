import React from 'react';
import './App.css';
import TodoList from './TodoList';

 export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

function App() {

    const tasks1: TaskType[] = [
        {id: 1, title: 'Html', isDone: true},
        {id: 2, title: 'Css', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ];

    return (
        <div className="App">
            <TodoList title={'what to learn'} tasks={tasks1}/>
            <TodoList title={'what to buy'} tasks={tasks1}/>
            <TodoList title={'what to read'} tasks={tasks1}/>
        </div>
    );
}

export default App;
