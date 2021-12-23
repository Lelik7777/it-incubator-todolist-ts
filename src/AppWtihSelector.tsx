import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC} from './store/tasksReducer';
import {addTodoListAC, changeStatusTasksAC, changeTodoListTitleAC, removeTodoListAC} from './store/todoLists-reducer';


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

function AppWithSelector() {
    console.log('App')
    const todoLists = useSelector((state: AppRootStateType) => state.todolists);
    const tasks = useSelector((state: AppRootStateType) => state.tasks);
    const dispatch = useDispatch();
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
        dispatch(removeTaskAC(id, idL));
    }
    const addTask =useCallback( (title: string, idL: string) => {
        dispatch(addTaskAC(title, idL));
    },[dispatch])
    const changeTaskStatus = (id: string, isDone: boolean, idL: string) => {
        dispatch(changeTaskStatusAC(id, isDone, idL));
    }
    const changeTitleTask = (title: string, idL: string, id: string) => {
        dispatch(changeTitleTaskAC(title, idL, id));
    }
    const removeList = (idL: string) => {
        dispatch(removeTodoListAC(idL));
    }
    const addList =useCallback( (title: string) => {
        dispatch(addTodoListAC(title));
    },[dispatch])

    const changeTitleList = (title: string, idL: string) => {
        dispatch(changeTodoListTitleAC(idL, title));
    }
    const changeStatusTasks = (filter: FilterType, idL: string) => {
        dispatch(changeStatusTasksAC(idL, filter));
    }
    const mappedTodoLists = todoLists.map(x =>
        <Grid item key={x.id}>
            <Paper elevation={8} style={{padding: '20px'}}>
                <TodoList
                    idL={x.id}
                    tasks={getFilterTasks(x.filter, x.id)}
                    removeTask={removeTask}
                    changeStatusTasks={changeStatusTasks}
                    addTask={addTask}
                    filter={x.filter}
                    changeTaskStatus={changeTaskStatus}
                    title={x.title}
                    removeList={removeList}
                    changeTitleTask={changeTitleTask}
                    changeTitleList={changeTitleList}
                />
            </Paper>
        </Grid>
    );


    return (
        <div className="App">
            <AppBar position="sticky">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '30px'}}>
                    <AddItemForm addItem={addList}/>
                </Grid>
                <Grid container spacing={4}>
                    {mappedTodoLists}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithSelector;

