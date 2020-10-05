const initState = {
    todos: [
        {id: 1, text: 'dummy', completed: true},
        {id: 2, text: 'New', completed: false},
        {id: 3, text: 'York', completed: false}
    ]
}


const todoReducer = (state = initState, action) => {
    console.log('action', action);

 

    if (action.type === 'CHANGE_TODO_STATUS') {
        const todoIndex = state.todos.findIndex((todo) => todo.id === action.id);
        if (todoIndex !== -1) {
            const todo = {...state.todos[todoIndex], completed: action.isCompleted};
            const updatedTodos = [...state.todos];
            updatedTodos.splice(todoIndex, 1, todo);
    
            return {
                ...state,
                todos: updatedTodos
            }
        }
    }

    if (action.type === 'DELETE_TODO') {
        const updatedTodos = state.todos.filter((todo) => todo.id !== action.id);
        return {
            ...state,
            todos: updatedTodos
        }
    }

    return state;
}

export default todoReducer