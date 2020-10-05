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

  filterActive(todo) { return !todo.isCompleted };

  filterCompleted(todo) { return todo.isCompleted };

  

  setFilter = (filter) => {
    this.setState({ filterMethod: filter });
  }

  getCompletedTodos = () =>  {
    return this.props.todos.filter((todo) => todo.isCompleted);
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
          <AddTodo/>
          <div className="todos" id="todos"> {
            todos
              .filter(this.state.filterMethod)
              .map((todo) => 
                <TodoItem 
                  todo={todo} 
                  key={todo.id}
                />
              )
          } </div>
          <InfoWidget 
            todoCount={todos.length - this.getCompletedTodos().length}
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
