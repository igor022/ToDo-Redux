import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import InfoWidget from './InfoWidget';
import { connect } from 'react-redux';

import { ALL, ACTIVE, COMPLETED } from '../filters/filterTypes';


class App extends Component {

  getCompletedTodos = () =>  {
    return this.props.todos.filter((todo) => todo.isCompleted);
  } 

  filterAll() { return true };

  filterActive(todo) { return !todo.isCompleted };

  filterCompleted(todo) { return todo.isCompleted };
  
  getFilterByName(filterName) {
    switch (filterName) {
      case ALL:
        return this.filterAll;

      case ACTIVE:
        return this.filterActive;

      case COMPLETED:
        return this.filterCompleted;

      default:
        break;
    }
  }
  render() {
    const { todos } = this.props;
    const filterMethod = this.getFilterByName(this.props.filterName);
    console.log(filterMethod);

    return (
      <div className="App">
        <h1>todos</h1>
        <div className="container">
          <AddTodo/>
          <div className="todos" id="todos"> {
            todos
              .filter(filterMethod)
              .map((todo) => 
                <TodoItem 
                  todo={todo} 
                  key={todo.id}
                />
              )
          } </div>
          <InfoWidget 
            todoCount={todos.length - this.getCompletedTodos().length}
            checked={this.getCompletedTodos().length > 0}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    filterName: state.filterName
  }
}

export default connect(mapStateToProps)(App);
