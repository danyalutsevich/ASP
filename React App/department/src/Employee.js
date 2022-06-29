import React, { Component } from "react";
import { variables } from "./Variables";

export class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalTitle: '',
            departments: [],
            employees: [],
            Name: '',
            Id: 0,
            Department: '',
            DateOfJoining: '',
            PhotoFileName: '',
            PhotoPath: variables.PHOTO_URL
        }
    }

    refreshList() {

        fetch(variables.API_URL + 'employee')
            .then(response => response.json())
            .then(data => this.setState({ employees: data }))

        fetch(variables.API_URL + 'department')
            .then(response => response.json())
            .then(data => this.setState({ departments: data }))
    }

    componentDidMount() {
        this.refreshList();
    }

    changeName = (e) => {
        this.setState({ Name: e.target.value });
    }

    changeDepartment = (e) => {
        this.setState({ Department: e.target.value })
    }

    changeDateOfJoining = (e) => {
        this.setState({ DateOfJoining: e.target.value })
    }

    addClick() {
        this.setState({
            modalTitle: 'Add Employee',
            Id: 0,
            Name: '',
            Department: '',
            DateOfJoining: '',
            PhotoFileName: ''

        })

    }

    editClick(emp) {
        this.setState({
            modalTitle: "Edit Employee",
            Id: emp.Id,
            Name: emp.Name,
            Department: emp.Department,
            DateOfJoining: emp.DateOfJoining,
            PhotoFileName: emp.PhotoFileName

        })
    }

    createClick() {
        fetch(variables.API_URL + 'employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Name: this.state.Name,
                Department: this.state.Department,
                DateOfJoining: this.state.DateOfJoining,
                PhotoFileName: this.state.PhotoFileName
            })
        })
            .then(res => res.json())
            .then((res) => {
                alert(res);
                this.refreshList();
            }, (error) => {
                alert("Failed to create");
            })
    }

    updateClick() {

        fetch(variables.API_URL + 'employee', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Id: this.state.Id,
                Name: this.state.Name,
                Department: this.state.Department,
                DateOfJoining: this.state.DateOfJoining,
                PhotoFileName: this.state.PhotoFileName
            })
        })
            .then(res => res.json())
            .then((res) => {
                alert(res)
                this.refreshList()
            },
                (error) => {
                    alert('Failed to update')
                })
    }

    deleteClick(id) {

        fetch(variables.API_URL + 'employee/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then((res) => {
                alert(res)
                this.refreshList()
            },
                (error) => {
                    alert("Failed to delete")
                })

    }

    uploadImage = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file", e.target.files[0], e.target.files[0].name)

        fetch(variables.API_URL + "employee/SaveFile",
            {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    PhotoFileName: data
                })
            }
            )

    }

    render() {

        const {
            modalTitle,
            departments,
            employees,
            Id,
            Name,
            Department,
            DateOfJoining,
            PhotoFileName,
            PhotoPath
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>Add Employee</button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>DateOfJoining</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp =>
                            <tr key={emp.Id}>
                                <td>{emp.Id}</td>
                                <td>{emp.Name}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(emp)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1" onClick={() => this.deleteClick(emp.Id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">
                                    <div className="p-1 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Name</span>
                                            <input type="text" className="form-control" value={Name} onChange={this.changeName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Department</span>
                                            <select className="form-select" onChange={this.changeDepartment} value={Department}>
                                                {departments.map(dep =>
                                                    <option key={dep.Id}>
                                                        {dep.Name}
                                                    </option>)}
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">DateOfJoining</span>
                                            <input type="date" className="form-control" value={DateOfJoining} onChange={this.changeDateOfJoining} />
                                        </div>

                                    </div>

                                    <div className="p-1 w-50 bd-highlight">
                                        <img width="250px" height="250px" src={PhotoPath + PhotoFileName} />
                                        <input className="m-2" type="file" onChange={this.uploadImage} />
                                    </div>
                                </div>

                                {Id == 0 ?
                                    <button type="button" className="btn btn-primary float-start" onClick={
                                        () => { this.createClick() }}>Create</button>
                                    : null}
                                {Id != 0 ?
                                    <button type="button" className="btn btn-primary float-start" onClick={() => { this.updateClick() }}>Update</button>
                                    : null}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}



