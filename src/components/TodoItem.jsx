import React, { Component } from 'react';
import { connect } from 'react-redux';


class TodoItem extends Component {
  handleDelete = (id) => {
    this.props.deleteTodo(id)
  }

  handleStatusChange = (id, isCompleted) => {
    this.props.changeTodoStatus(id, isCompleted);
  }

  render() {
    const todo = this.props.todo;

    return(
      <div className={`task ${todo.completed ? 'completed' : ''}`}>
        <button className="check" onClick={() => this.handleStatusChange(todo.id, !todo.completed)}></button>
        <p>{todo.text}</p>
        <button className="delete" onClick={() => this.handleDelete(todo.id)}></button>
      </div>
    ) 
  } 
}

const mapStateToProps = (state, ownProps) => {
  console.log('ownProps', ownProps);
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (id) => { dispatch({type: 'DELETE_TODO', id: id})},
    changeTodoStatus: (id, isCompleted) => { dispatch({type: 'CHANGE_TODO_STATUS', id, isCompleted })}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

