import logo from './logo.svg';
import './NewTodo.css';


function NewTodo() {
    return (
        <form id="add-todo">
            <input type="text" id="input-text" name="input-text" placeholder="Add new ToDo..."></input>
            <button type="submit">Add</button>
        </form>
    );
}

export default NewTodo;
