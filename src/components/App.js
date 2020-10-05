import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import InfoWidget from './InfoWidget';
import { connect } from 'react-redux';


class App extends Component {
  filterAll() { return true };

  filterActive(todo) { return !todo.isCompleted };

  filterCompleted(todo) { return todo.isCompleted };

  setFilter = (filter) => {
    this.setState({ filterMethod: filter });
  }

  getCompletedTodos = () =>  {
    return this.props.todos.filter((todo) => todo.isCompleted);
  } 

  render() {
    

    const { todos } = this.props;
    
    return (
      <div className="App">
        <h1>todos</h1>
        <div className="container">
          <AddTodo/>
          <div className="todos" id="todos"> {
            todos
              .filter(this.props.filterMethod)
              .map((todo) => 
                <TodoItem 
                  todo={todo} 
                  key={todo.id}
                />
              )
          } </div>
          <InfoWidget 
            todoCount={todos.length - this.getCompletedTodos().length}
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
    todos: state.todos,
    filterMethod: state.filterMethod
  }
}


export default connect(mapStateToProps)(App);
