import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAllCompleted } from '../actions/todoActions';

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
    

    return(
      <div className="additional-info">
        <p>
          <span className="items-count"></span>
          {`${todoCount} item${ todoCount === 1 ? '' : 's'} left`}
        </p>
        <div className="filter-buttons">
          {
            this.props.buttons.map((b, i) => (
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

}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllCompleted: () => { dispatch(deleteAllCompleted()) } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoWidget);