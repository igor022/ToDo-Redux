const initState = {
    todos: [
        {id: 1, text: 'dummy', isCompleted: true},
        {id: 2, text: 'New', isCompleted: false},
        {id: 3, text: 'York', isCompleted: false}
    ],
    filterMethod: filterAll,
    filterVariants: {
        filterAll,
        filterActive,
        filterCompleted,
    }
}

 
function filterAll() { return true };

function filterActive(todo) { return !todo.isCompleted };

function filterCompleted(todo) { return todo.isCompleted };

const todoReducer = (state = initState, action) => {

    switch (action.type) {
        
        case 'CHECK_ALL':
            {
                const completedTodos = state.todos.filter((todo) => todo.isCompleted);
                const isVisible = (completedTodos.length - state.todos.length !== 0);
                const updatedTodos = state.todos.map((todo) => {
                    return {
                        ...todo,
                        isCompleted: isVisible
                    }
                });

                return {
                    ...state,
                    todos: updatedTodos
                };
            }

        case 'ADD_TODO':
            {
                const todo = {
                    text: action.text,
                    isCompleted: false,
                    id: Math.random()
                };
                
                return {
                    ...state,
                    todos: [...state.todos, todo]
                };
            }
            
        case 'CHANGE_TODO_STATUS':
            {
                const todoIndex = state.todos.findIndex((todo) => todo.id === action.id);
                if (todoIndex !== -1) {
                    const todo = {...state.todos[todoIndex], isCompleted: action.isCompleted};
                    const updatedTodos = [...state.todos];
                    updatedTodos.splice(todoIndex, 1, todo);
            
                    return {
                        ...state,
                        todos: updatedTodos
                    }
                };
            }

        case 'DELETE_TODO':
            {
                const updatedTodos = state.todos.filter((todo) => todo.id !== action.id);
                return {
                    ...state,
                    todos: updatedTodos
                };
            }

        case 'DELETE_ALL_COMPLETED':
            {
                return {
                    ...state,
                    todos: state.todos.filter((todo) => !todo.isCompleted)
                };
            }

        case 'FILTER':
            {
                return {
                    ...state,
                    filterMethod: action.filterMethod
                };
            }
    }

    return state;
}

export default todoReducer;