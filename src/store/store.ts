

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
import {tasksReducer} from './tasksReducer';
import {combineReducers, createStore, Store} from 'redux';
import {todoListsReducer} from './todoLists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
//type AppRootStateTypeNew=typeof rootReducer;

/*// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers, createStore} from 'redux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно*/
//@ts-ignore
window.store=store;