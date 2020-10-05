export const addTodo = (text) => {
    return {
        type: 'ADD_TODO', 
        text
    }
};

export const checkAll = () => {
    return {
        type: 'CHECK_ALL'
    }
};

export const changeTodoStatus = (id, isCompleted) => {
    return {
        type: 'CHANGE_TODO_STATUS', 
        id, 
        isCompleted 
    };
};

export const deleteTodo = (id) => {
    return {
        type: 'DELETE_TODO', 
        id
    };
};

export const deleteAllCompleted = () => {
    return {
        type: 'DELETE_ALL_COMPLETED'
    }
}