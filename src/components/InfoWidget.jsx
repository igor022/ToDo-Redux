import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAllCompleted, setFilter } from '../actions/todoActions';

class InfoWidget extends Component {
  state = {
    selected: 0
  } 

  changeSelected = (button, i) => {
    this.setState({
      selected: i
    })
    button.onClick();
  }
 
  
  render() {
    const { todoCount } = this.props;
    
    const buttons = [
      { className: 'all', value: 'All', onClick: () => this.props.setFilter(this.props.filterAll) },
      { className: 'current', value: 'Active', onClick: () => this.props.setFilter(this.props.filterActive) },
      { className: 'completed', value: 'Completed', onClick: () => this.props.setFilter(this.props.filterCompleted) },
    ];

    return(
      <div className="additional-info">
        <p>
          <span className="items-count"></span>
          {`${todoCount} item${ todoCount === 1 ? '' : 's'} left`}
        </p>
        <div className="filter-buttons">
          {
            buttons.map((b, i) => (
              <button 
                className={`${b.className} ${this.state.selected === i ? 'selected' : ''}`} 
                key={i}
                onClick={() => this.changeSelected(b, i)}
              >
                {b.value}
              </button>
            ))
          }

        </div>
        
        {
          this.props.checked 
          ? <button className="clear-tasks" onClick={this.props.deleteAllCompleted}>Clear Completed</button>
          : <div className="clear-tasks"></div>
        }
        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    filterAll: state.filterAll,
    filterActive: state.filterActive,
    filterCompleted: state.filterCompleted,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllCompleted: () => { dispatch(deleteAllCompleted()) },
    setFilter: (filterMethod) => { dispatch(setFilter(filterMethod)) } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoWidget);