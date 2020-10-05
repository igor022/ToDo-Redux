import React, { Component } from 'react';

class AddTodo extends Component {
  state = {
    todoInput: '',
  } 

  handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target.inputAdd.value;
    if (text) {
      e.target.inputAdd.value = '';
      this.props.addTodo(text);
    }
  }

  handleChange = (e) => {
    this.setState({
      todoInput: e.target.value, 
    })
  }

  render() {
    return (
      <div className="add-todo">
        <button className="check-all" onClick={this.props.handleCheckAll}></button>
        <form 
          className="form-add" 
          onSubmit={this.handleSubmit}
        >
          <input 
            className="input-add" 
            id="inputAdd" 
            type="text" 
            onChange={this.handleChange}
            placeholder="What needs to be done?" 
            autoComplete="off" />
        </form>
      </div>
    )
  }
}

export default AddTodo;