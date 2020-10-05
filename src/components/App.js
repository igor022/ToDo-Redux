import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import InfoWidget from './InfoWidget';
import { connect } from 'react-redux';


class App extends Component {
  state = {
    todos: [],
    filterMethod: this.filterAll,
  }

  filterTodo(todo) {this.state.filterMethod(todo)};

  filterAll() { return true };

  filterActive(todo) { return !todo.completed };

  filterCompleted(todo) { return todo.completed };

  addTodo = (text) => {
    const todo = {
      text,
      completed: false,
      id: Math.random()
    };

    this.setState((state) => ({
      todos: [...state.todos, todo]
    }));
  }

  changeTodoStatus = (id, status) => {
    const todoIndex = this.state.todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      const todo = {...this.state.todos[todoIndex], completed: status};
      const updatedTodos = [...this.state.todos];
      updatedTodos.splice(todoIndex, 1, todo);

      this.setState({
        todos: updatedTodos
      })
    }
  }

  deleteTodo = (id) => {
    const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({
      todos: updatedTodos
    })
  }

  handleCheckAll = () => {
    const todos = [...this.state.todos];
    const completedTodos = todos.filter((todo) => todo.completed)
    
    this.updateTodosVisibility(completedTodos.length - todos.length !== 0);
  }

  updateTodosVisibility = (isVisible) => {
    const updatedTodos = [...this.state.todos];
      updatedTodos.forEach((todo) => {
        todo.completed = isVisible;
      })
      this.setState({
        todos: updatedTodos
      })
  }

  setFilter = (filter) => {
    this.setState({ filterMethod: filter });
  }

  getCompletedTodos = () =>  {
    return this.state.todos.filter((todo) => todo.completed);
  } 
  
  clearAll = () => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => !todo.completed)
    }))
  } 
  
  
  render() {
    const buttons = [
      { className: 'all', value: 'All', onClick: () => this.setFilter(this.filterAll) },
      { className: 'current', value: 'Active', onClick: () => this.setFilter(this.filterActive) },
      { className: 'completed', value: 'Completed', onClick: () => this.setFilter(this.filterCompleted) },
    ];

    const { todos } = this.props;
    
    return (
      <div className="App">
        <h1>todos</h1>
        <div className="container">
          <AddTodo addTodo={this.addTodo} handleCheckAll={this.handleCheckAll}/>
          <div className="todos" id="todos"> {
            todos
              .filter(this.state.filterMethod)
              .map((todo) => 
                <TodoItem 
                  todo={todo} 
                  changeTodoStatus={this.changeTodoStatus} 
                  deleteTodo={this.deleteTodo}
                  key={todo.id}
                />
              )
          } </div>
          <InfoWidget 
            todoCount={this.state.todos.length - this.getCompletedTodos().length}
            buttons={buttons}
            clearAll={this.clearAll}
            checked={this.getCompletedTodos().length > 0}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}


export default connect(mapStateToProps)(App);
