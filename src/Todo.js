import { Component } from 'react';
import "./Todo.css";

class Todo extends Component {
    render() {
      let thing;
      if(this.props.item.completed){
        thing=<p className='strike'>{this.props.item.text}</p>
      }
      else{
        thing=<p className='no_strike'>{this.props.item.text}</p>
      }      
      return (
        <div className="todo-item">
          <input checked={this.props.item.completed} type="checkbox" id="check" thing="check" value="check" onChange={this.props.checkBox(this.props.item.id, this.props.item.completed)}>
          </input>
          {thing}
          <button className='delete' onClick={this.props.deleteButton(this.props.item.id)}>X</button>
          
        </div>
      );
    }
  }
  
  export default Todo;