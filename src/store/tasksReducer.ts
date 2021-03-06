import {TasksType} from '../App';
import {v1} from 'uuid';
import {AddTodoListATType, RemoveTodoListType} from './todoLists-reducer';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK';
    id: string;
    idL: string;
}
type AddTaskActionType = {
    type: 'ADD-TASK';
    title: string;
    idL: string;
}
type ChangeStatusTaskActionType = {
    type: 'CHANGE-TASK-STATUS';
    id: string;
    isDone: boolean;
    idL: string;
}
type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | AddTodoListATType
    | RemoveTodoListType
    |ReturnType<typeof changeTitleTaskAC>;

 const initialState:TasksType={};
export const tasksReducer = (state=initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.idL]: state[action.idL].filter(x => x.id !== action.id)};
        case 'ADD-TASK':
            return {...state, [action.idL]: [{id: v1(), title: action.title, isDone: false}, ...state[action.idL]]};
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.idL]: state[action.idL].map(x => x.id === action.id ? {...x, isDone: action.isDone} : x)
            };
        case 'CHANGE-TITLE=TASK':
            return {...state,[action.payload.idL]: state[action.payload.idL].map(x=>x.id===action.payload.id?{...x,title:action.payload.title}:x)};
        case 'ADD-TODOLIST':
            return {...state, [action.id]: []};
        case 'REMOVE-TODOLIST':
           /* let newState = {...state};
            delete newState[action.id];*/
            let{[action.id]:[],...newState1}={...state}
            return newState1;
        default:
            return state;
    }
}

export const removeTaskAC = (id: string, idL: string): RemoveTaskActionType => ({
    type: 'REMOVE-TASK',
    id, idL,
}) as const;

export const addTaskAC = (title: string, idL: string): AddTaskActionType =>
    ({type: 'ADD-TASK', title, idL,}) as const;

export const changeTaskStatusAC = (id: string, isDone: boolean, idL: string) => ({
    type: 'CHANGE-TASK-STATUS',
    id, isDone, idL,
}) as const;
export const changeTitleTaskAC = (title:string,idL:string,id:string) => {
  return{
      type:'CHANGE-TITLE=TASK',
      payload:{
          title,idL,id,
      }
  }as const;
};
