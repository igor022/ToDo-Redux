import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTodo, changeTodoStatus } from '../actions/todoActions';

class TodoItem extends Component {
  handleDelete = (id) => {
    this.props.deleteTodo(id)
  }

  handleStatusChange = (id, isCompleted) => {
    this.props.changeTodoStatus(id, isCompleted);
  }

  render() {
    const todo = this.props.todo;
    console.log(todo);
    return(
      <div className={`task ${todo.isCompleted ? 'completed' : ''}`}>
        <button className="check" onClick={() => this.handleStatusChange(todo.id, !todo.isCompleted)}></button>
        <p>{todo.text}</p>
        <button className="delete" onClick={() => this.handleDelete(todo.id)}></button>
      </div>
    ) 
  } 
}

const mapStateToProps = (state, ownProps) => {
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (id) => { dispatch(deleteTodo(id)) },
    changeTodoStatus: (id, isCompleted) => { 
      dispatch(changeTodoStatus(id, isCompleted)) 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

