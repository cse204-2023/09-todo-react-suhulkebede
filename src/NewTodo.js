import { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
    render() {
      return (
        <div id="input">
            <div id="input_container">
              <form onSubmit={this.props.formSubmit}>
                <input value={this.props.userInput} onChange={this.props.changeText} type="text" placeholder="Add new todo..."></input>
                <button>Add</button>
              </form>
              <button id="sort" onClick={this.props.sorting}>Organize</button>
          </div>
        </div>
        
      );
    }
  }
  
  export default NewTodo;