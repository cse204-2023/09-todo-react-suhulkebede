import React, { Component } from 'react';
import NewTodo from "./NewTodo";
import Todo from "./Todo";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInput: "",
      todos: [],
    };

    this.changeText = this.changeText.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.readTodos = this.readTodos.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.checkBox = this.checkBox.bind(this);
    this.sorting = this.sorting.bind(this);
  }

  changeText(propEvent) {
    this.setState({
      userInput: propEvent.target.value
    })
  }

  componentDidMount(){
    this.readTodos();
  }

  formSubmit(propEvent){
    propEvent.preventDefault();
    let newRequest = new XMLHttpRequest();
    let rC = this;
    let data = {
      text: rC.state.userInput
    }

    newRequest.onreadystatechange = () => {
      if (newRequest.readyState == 4 && newRequest.status == 200) {
        var todo = JSON.parse(newRequest.responseText);
        this.readTodos();
        rC.setState({
          userInput: ""
        });
      } else if (newRequest.readyState == 4) {
          console.log(newRequest.responseText);
      }
    };

    newRequest.open("POST", "https://cse204.work/todos", true);
    newRequest.setRequestHeader("Content-type", "application/json");
    newRequest.setRequestHeader("x-api-key","56220b-51ed88-98b0bd-b8308c-9887b3");
    newRequest.send(JSON.stringify(data));
    newRequest.onreadystatechange();
  }

  readTodos(){
    let newRequest = new XMLHttpRequest();
    let rC = this;

    newRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var todos = JSON.parse(this.responseText);
            var temp = new Array();
            for(var val in todos){
              let item = {
                text: todos[val].text,
                id: todos[val].id,
                key: todos[val].id,
                completed: todos[val].completed
              }
              temp.push(item);
            }
            rC.setState({
              todos: temp
            });
        }
    };
    newRequest.open("GET", "https://cse204.work/todos", true);
    newRequest.setRequestHeader("x-api-key","56220b-51ed88-98b0bd-b8308c-9887b3");
    newRequest.send();
    newRequest.onreadystatechange();
  }

  deleteButton(id){
    let rC = this;
    return function(){
      var newRequest = new XMLHttpRequest();
        newRequest.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                  rC.readTodos();
              } else if (this.readyState == 4) {
                  console.log(this.responseText);
              }
          };
          var url = "https://cse204.work/todos/" + id;
          newRequest.open("DELETE", url, true);
          newRequest.setRequestHeader("Content-type", "application/json");
          newRequest.setRequestHeader("x-api-key","56220b-51ed88-98b0bd-b8308c-9887b3");
          newRequest.send();
          newRequest.onreadystatechange();
    }
    
  }

  checkBox(id, value){
    let rC = this;
    return function(){
      var data = {
        completed: !value
      }
      var newRequest = new XMLHttpRequest();
  
      newRequest.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              rC.readTodos();
          } else if (this.readyState == 4) {
              console.log(this.responseText);
          }
        };
      var url = "https://cse204.work/todos/" + id;
      newRequest.open("PUT", url, true);
      newRequest.setRequestHeader("Content-type", "application/json");
      newRequest.setRequestHeader("x-api-key","56220b-51ed88-98b0bd-b8308c-9887b3");
      newRequest.send(JSON.stringify(data));
      newRequest.onreadystatechange();
    }
  }

  sorting(){
    let rC = this;
      var newRequest = new XMLHttpRequest();
      newRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var todos = JSON.parse(this.responseText);
            var temp = new Array();
            var tempTodos = new Array();
            for(var val in todos){
              let item = {
                text: todos[val].text,
                id: todos[val].id,
                key: todos[val].id,
                completed: todos[val].completed
              }
              if(!todos[val].completed)
              {
                temp.push(item);
                console.log(item.text);
              }
              else
              {
                tempTodos.push(item);
              }
            }
            for(var val in tempTodos){
              temp.push(tempTodos[val])
              console.log(tempTodos[val].text);
            }
            rC.setState({
              todos: temp
            });
        }
      };
        newRequest.open("GET", "https://cse204.work/todos", true);
        newRequest.setRequestHeader("x-api-key","56220b-51ed88-98b0bd-b8308c-9887b3");
        newRequest.send();
        newRequest.onreadystatechange();
  }

  render() {
    return (
      <div className="App">
        <NewTodo 
        sorting={this.sorting}
        changeText={this.changeText} 
        formSubmit={this.formSubmit} 
        readTodos={this.readTodos}
        userInput={this.state.userInput} />
        <div id='todo-list'>
          {this.state.todos.map((currentItem) => (
            <Todo deleteButton={this.deleteButton} checkBox={this.checkBox} item={currentItem} key={currentItem.key}/>
          ))}
        </div>
        
      </div>
    );
  }
}

export default App;
