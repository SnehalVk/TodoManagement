import React, {Component} from 'react'
import moment from "moment";
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService.js'

// class List Todos component
class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos :[],
            message: null

        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentDidMount(){
        this.refreshTodos()
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveAlllTodos(username)
        .then(
            response => {
                //console.log(response)
                 this.setState({todos: response.data})
            }
        )
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUsername()
        //console.log(id + " " + username)
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState( { message : `Item ${id} is deleted successfully.`})
                this.refreshTodos()
            }

        )
    }

    updateTodoClicked(id){
        ///console.log(id + " " + username)
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked(){
        ///console.log(id + " " + username)
        this.props.history.push(`/todos/-1`)
    }


    render(){
        return(
            <div>
                <h1>List Todos</h1>
                { this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Is Completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                todo =>
                                    <tr key = {todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('MM_DD-YYYY')}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListTodosComponent