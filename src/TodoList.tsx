import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


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


export function TodoList({
                             idL,
                             tasks,
                             changeStatusTasks,
                             addTask,
                             filter,
                             removeList,
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
                    tasks.map(x => {
                        const removeTask = () => props.removeTask(x.id, idL);
                        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(x.id, e.currentTarget.checked, idL);
                        }

                        const callBack1 = (t: string) => changeTitleTask(t, idL, x.id);
                        return (
                            <ListItem className={x.isDone ? 'isDone' : ''}
                                      divider={true}
                            >
                                <Checkbox
                                    onChange={onChange}
                                    checked={x.isDone}
                                    color={'primary'}
                                />
                                <EditableSpan title={x.title} callBack={callBack1}/>
                                <IconButton onClick={removeTask} size={'small'} color={'primary'}>
                                    <Delete/>
                                </IconButton>
                            </ListItem>
                        )
                    })
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

