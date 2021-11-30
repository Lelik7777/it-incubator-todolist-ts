import {FilterType, TodoListType} from '../App';
import {v1} from 'uuid';

type RemoveTodoListType = {
    type: 'REMOVE-TODOLIST';
    id: string;
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST';
    title: string;
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE';
    id: string;
    title: string;
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER';
    id: string;
    filter: FilterType;
}
export type ActionType = RemoveTodoListType | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT;
export const todoListsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(x => x.id !== action.id);
        case 'ADD-TODOLIST':
            const newList: TodoListType = {id: v1(), title: action.title, filter: 'all'};
            return [...state, newList];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(x => x.id === action.id ? {...x, title: action.title} : x);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(x => x.id === action.id ? {...x, filter: action.filter} : x)
        default:
            return state;
    }
}

export const removeTodoListAC = (id: string): RemoveTodoListType => ({type: 'REMOVE-TODOLIST', id});
export const addTodoListAC = (title: string): AddTodoListAT =>
    ({type: 'ADD-TODOLIST', title});
export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title,});
export const changeTodoListFilterAC = (id: string, filter: FilterType): ChangeTodoListFilterAT =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter,});
