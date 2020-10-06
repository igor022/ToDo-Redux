import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAllCompleted, setFilter } from '../actions/todoActions';
import { ALL, ACTIVE, COMPLETED } from '../filters/filterTypes';

class InfoWidget extends Component {
  state = {
    selected: 0
  } 

  onClick = (button, i) => {
    this.setState({
      selected: i
    })
    button.setFilter();
  }
 
  
  render() {
    const { todoCount } = this.props;

    const buttons = [
      { className: 'all', value: 'All', setFilter: () => this.props.setFilter(ALL) },
      { className: 'current', value: 'Active', setFilter: () => this.props.setFilter(ACTIVE) },
      { className: 'completed', value: 'Completed', setFilter: () => this.props.setFilter(COMPLETED) },
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
                onClick={() => this.onClick(b, i)}
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

const mapStateToProps = (state) => {
  return {
    filterVariants: state.filterVariants,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllCompleted: () => { dispatch(deleteAllCompleted()) },
    setFilter: (filterName) => { dispatch(setFilter(filterName)) } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoWidget);