import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

function App() {
  return (
    <div id="container">
        <div id="add">
            <div id="add_container">
            <NewTodo />
            </div>
        </div>
        <Todo />
    </div>
  );
}

export default App;