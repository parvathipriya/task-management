import React, { Component } from 'react';
import './Task.css';
import axios from 'axios';

class TaskManager extends Component {
    constructor() {
        super();

        this.state = {
            tasks: [],
            newTask: '',
            editTaskId: null,
            editTaskText: '',
            setError: '',
            users: [],
            selectedUser: '',
            setErrorSelect: '',
        };
    }

    componentDidMount() {
        sessionStorage.setItem('reloadCount', 1);
        if (this.props.location.state && this.props.location.state.isLoggedIn) {
            this.fetchTasks();
            this.fetchUsers();
        } else {
            this.props.history.push('/login');
        }

    }

    fetchUsers = () => {
        axios.get('http://127.0.0.1:8000/api/users')
            .then((response) => {
                console.log(response, 'responseresponse')
                this.setState({ users: response.data, loading: false });
            })
            .catch((error) => {
                console.error('Error loading user data:', error);
                this.setState({ loading: false });
            });
    }

    fetchTasks = () => {
        axios.get('http://127.0.0.1:8000/api/tasks')
            .then(response => {
                console.log(response, 'task')
                this.setState({ tasks: response.data });
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }

    handleNewTaskChange = event => {
        this.setState({ newTask: event.target.value });
    }

    handleAddTask = () => {
        const { newTask, selectedUser } = this.state;


        if (newTask.length === 0) {
            this.setState({ setError: 'Task detail is required.' });
        } else {
            this.setState({ setError: '' });
        }
        if (selectedUser === '') {
            this.setState({ setErrorSelect: 'User detail is required.' });
        } else {
            this.setState({ setErrorSelect: '' });
        }

        axios.post('http://127.0.0.1:8000/api/tasks', { description: newTask, user_id: selectedUser })
            .then(() => {
                this.fetchTasks();
                this.setState({ newTask: '' });
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
    }

    handleEditTask = (taskId, taskText) => {
        this.setState({ editTaskId: taskId, editTaskText: taskText });
    }

    handleUpdateTask = () => {
        const { editTaskId, editTaskText } = this.state;
        axios.put(`http://127.0.0.1:8000/api/tasks/${editTaskId}`, { description: editTaskText })
            .then(() => {
                this.fetchTasks();
                this.setState({ editTaskId: null, editTaskText: '' });
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    }

    handleCancelEdit = () => {
        this.setState({ editTaskId: null, editTaskText: '' });
    }

    handleDeleteTask = taskId => {
        axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`)
            .then(() => {
                this.fetchTasks();
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    }

    handleUserSelect = (event) => {
        this.setState({ selectedUser: event.target.value });
    };

    render() {
        const { tasks, newTask, editTaskId, editTaskText, setError, users, selectedUser, setErrorSelect } = this.state;
        return (
            <div className="task-manager">
                <h1>Task Management System</h1>
                <div className="task-form">
                    <div className="form-inputs">
                        <div className="error-block">
                            <div className='input-container'>
                                <input
                                    type="text"
                                    placeholder="Enter a new task"
                                    value={newTask}
                                    onChange={this.handleNewTaskChange}
                                />
                            </div>
                            {setError && <div class="error-message">{setError}</div>}
                        </div>
                        <div className="error-block">
                            <div class="custom-select input-container">
                                <select value={selectedUser} onChange={this.handleUserSelect}>
                                    <option value="">Select a user</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {setErrorSelect && <div class="error-message">{setErrorSelect}</div>}
                        </div>
                        <div><button onClick={this.handleAddTask}>Add Task</button></div></div>

                </div>
                <div className="table-container">
                    <table className="record-table">
                        <thead>
                            <tr>
                                <th>Task Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (

                                < tr key={task.id} >

                                    {editTaskId === task.id ? (
                                        <td className="edit-task">
                                            <input
                                                type="text"
                                                value={editTaskText}
                                                onChange={e => this.setState({ editTaskText: e.target.value })}
                                            />
                                            {task.name}
                                            <button onClick={this.handleUpdateTask}>Save</button>
                                            <button onClick={this.handleCancelEdit}>Cancel</button>
                                        </td>

                                    ) : (

                                        <td className="view-task">

                                            {task.description}
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            {task.name}
                                            <button onClick={() => this.handleEditTask(task.id, task.description)}>Edit</button>
                                            <button onClick={() => this.handleDeleteTask(task.id)}>Delete</button>
                                        </td>

                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}

export default TaskManager;