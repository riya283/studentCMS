import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentRegistration = ({
    editRecord,
    onUpdate
}) => {
    const [studentInfo, setStudentInfo] = useState({});

    useEffect(() => {
        if (editRecord) {
            setStudentInfo(editRecord);
        }
    }, [editRecord])

    const setStudentValue = (event, key) => {
        if (event.target) {
            setStudentInfo({
                ...studentInfo,
                [key]: event.target.value,
            })
        }
    }

    const updateStudent = () => {
        fetch("https://student-cms-be.herokuapp.com/api/studentInfo/update", {
            method: 'POST', body: JSON.stringify(studentInfo), headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((result) => {
                if (res.status === 200) {
                    alert("student updated successfully");
                    onUpdate();
                } else {
                    alert(result.message)
                }
            })
        })
    }


    const createStudent = () => {
        fetch("https://student-cms-be.herokuapp.com/api/studentInfo", {
            method: 'POST', body: JSON.stringify(studentInfo), headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((result) => {
                if (res.status === 200) {
                    alert("student created successfully");
                } else {
                    alert(result.message)
                }
            })
        })
    }

    const beforeSubmit = () => {
        if (studentInfo.id) {
            updateStudent();
        } else {
            createStudent();
        }
    }

    return (
        <div>
            {/* Navbar section */}
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">StudentApp</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active">Home</Link>
                                    {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                                </li>
                                <li className="nav-item">
                                    <Link to="/registration" className="nav-link">Registration</Link>
                                    {/* <a className="nav-link" href="#">Registration</a> */}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            {/* body section */}

            <div className='student-registration' style={{ margin: '15px' }}>

                <div className="mb-3">
                    <label className="form-label">Student Name</label>
                    <input type="text" className="form-control" id="name" value={studentInfo.name} onChange={(e) => { setStudentValue(e, "name") }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Father Name</label>
                    <input type="text" className="form-control" id="fatherName" value={studentInfo.fatherName} onChange={(e) => { setStudentValue(e, "fatherName") }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mother Name</label>
                    <input type="text" className="form-control" id="motherName" value={studentInfo.motherName} onChange={(e) => { setStudentValue(e, "motherName") }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Roll Number</label>
                    <input type="text" className="form-control" id="rollNumber" value={studentInfo.rollNumber} onChange={(e) => { setStudentValue(e, "rollNumber") }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="text" className="form-control" id="age" value={studentInfo.age} onChange={(e) => { setStudentValue(e, "age") }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={studentInfo.address} onChange={(e) => { setStudentValue(e, "address") }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" id="city" value={studentInfo.city} onChange={(e) => { setStudentValue(e, "city") }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" id="state" value={studentInfo.state} onChange={(e) => { setStudentValue(e, "state") }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Registration Date</label>
                    <input type="date" data-date="" data-date-format="YYYY/MM/DD" className="form-control" id="registrationDate" placeholder='year/mm/dd' value={studentInfo.registrationDate} onChange={(e) => { setStudentValue(e, "registrationDate") }} />
                </div>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={beforeSubmit}>Submit</button>

            </div>
        </div>


    )
}

export default StudentRegistration;