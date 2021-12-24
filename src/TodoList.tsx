import React, {useCallback} from 'react';
import {FilterType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, IconButton, List, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';


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
    changeTitleTask: (title: string, idL: string, id: string) => void;
    changeTitleList: (title: string, idL: string) => void;
}


export const TodoList=({
                             idL,
                             tasks,
                             changeStatusTasks,
                             addTask,
                             filter,
                             removeList,
                             changeTitleTask,
                             changeTitleList,
                             ...props
                         }: TodoListType)=> {
    console.log('todoList');
    const statusTasksAll = () => changeStatusTasks('all', idL);
    const statusTasksActive = () => changeStatusTasks('active', idL);
    const statusTasksCompleted = () => changeStatusTasks('completed', idL);
    const addTaskL =useCallback( (t: string) => {
        addTask(t, idL)
    },[addTask,idL]);

    const onClick = () => removeList(idL);
    const callBack = (t: string) => changeTitleList(t, idL);
    return (
        <div className="todoList">
            <Typography variant={'h5'}
                        style={{color: 'blue'}}
                        align={'center'}
            >
                <EditableSpan title={props.title} callBack={callBack}/>
                <IconButton onClick={onClick} size={'small'}>
                    <Delete/>
                </IconButton>
            </Typography>
            <div className={'input'}>
                <AddItemForm addItem={addTaskL}/>

            </div>
            <List>
                {
                    tasks.map(x =><Task idL={idL} id={x.id} key={x.id}/>)
                }
            </List>
            <div className={'buttonChange'}>

                <ButtonGroup variant={'contained'}
                             size={'small'}
                >
                    <Button onClick={statusTasksAll}
                            color={filter === 'all' ? 'secondary' : 'primary'}>All</Button>
                    <Button onClick={statusTasksActive}
                            color={filter === 'active' ? 'secondary' : 'primary'}>Active</Button>
                    <Button onClick={statusTasksCompleted}
                            color={filter === 'completed' ? 'secondary' : 'primary'}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

