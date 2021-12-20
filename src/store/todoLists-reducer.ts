import {FilterType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListType = {
    type: 'REMOVE-TODOLIST';
    id: string;
}
export type AddTodoListATType = {
    type: 'ADD-TODOLIST';
    title: string;
    id:string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE';
    id: string;
    title: string;
}
type ChangeStatusTasksType = {
    type: 'CHANGE-STATUS-TASKS';
    id: string;
    filter: FilterType;
}
const initialState:TodoListType[]=[];
export type ActionType = RemoveTodoListType | AddTodoListATType | ChangeTodoListTitleAT | ChangeStatusTasksType;
export const todoListsReducer = (state=initialState, action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(x => x.id !== action.id);
        case 'ADD-TODOLIST':
            const newList: TodoListType = {id:action.id, title: action.title, filter: 'all'};
            return [...state, newList];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(x => x.id === action.id ? {...x, title: action.title} : x);
        case 'CHANGE-STATUS-TASKS':
            return state.map(x => x.id === action.id ? {...x, filter: action.filter} : x)
        default:
            return state;
    }
}

export const removeTodoListAC = (id: string): RemoveTodoListType => ({type: 'REMOVE-TODOLIST', id});

export const addTodoListAC = (title: string): AddTodoListATType =>
    ({type: 'ADD-TODOLIST', title,id:v1()})as const;

export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title,});

export const changeStatusTasksAC = (id: string, filter: FilterType): ChangeStatusTasksType =>
    ({type: 'CHANGE-STATUS-TASKS', id, filter,});

