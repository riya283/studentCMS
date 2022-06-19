import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import StudentRegistration from './StudentRegistration';
import './Home.css';
import { Button, Modal } from 'bootstrap';

const Home = () => {
  const [records, setRecords] = useState([]);
  const [editRecordId, setEditRecordId] = useState();
  // const [filterRecord, setFilterRecord] = useState();

  // get Record from dataBase
  const getStudentRecord = () => {
    fetch("http://localhost:8080/api/studentInfo").then((response) => response.json()).then((record) => setRecords(record)).catch((error) => console.log(error));
  }

  useEffect(() => {
    getStudentRecord();
  }, []);

  // display student record
  const displayStudentRecord = () => {
    return (
      <table className='table'>
        <thead className='thead-dark'>
          <th scope='col'>Name</th>
          <th scope='col'>Father Name</th>
          <th scope='col'>Mother Name</th>
          <th scope='col'>Age</th>
          <th scope='col'>Address</th>
          <th scope='col'>City</th>
          <th scope='col'>State</th>
          <th scope='col'>Registration Date</th>
          <th></th>
        </thead>
        {
          records.map((record) => <tbody>
            <tr><td>{record.name}</td>
              <td>{record.fatherName}</td>
              <td>{record.motherName}</td>
              <td>{record.age}</td>
              <td>{record.address}</td>
              <td>{record.city}</td>
              <td>{record.state}</td>
              <td>{record.registrationDate}</td>
              <td><button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setEditRecordId(record.id) }}>Edit</button></td>
              <td><button className='btn btn-danger' onClick={() => { deleteStudentRecord(record.id) }}>Delete</button></td></tr>
          </tbody>
          )}
      </table>
    )
  }

  // delete student Record
  const deleteStudentRecord = (id) => {
    return (
      fetch("http://localhost:8080/api/studentInfo/delete", {
        method: 'POST', body: JSON.stringify({ id }), headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.status === 200) {
          getStudentRecord()
        } else {
          alert(response.message)
        }
      }).catch((error) => { alert(error) })
    )
  }

  // edit Student record
  const editStudentRecord = () => {

    const findRecord = records.find((r) => r.id === editRecordId)

    return (
      <>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <StudentRegistration editRecord={findRecord} onUpdate={getStudentRecord} />
              </div>

            </div>
          </div>
        </div>
      </>
    )

  }

  // filter student Record
  const filterStudentRecord = (event) => {
    // setFilterRecord(event.target.value);
    fetch('http://localhost:8080/api/studentInfo/byFilter',{method: 'POST', body:  JSON.stringify({ filterType: event.target.value }), headers: {
      'Content-Type': 'application/json'
    }  }).then((response) => response.json()).then((record) => setRecords(record)).catch((error) => console.log(error));
  }
  

  return (
    <div className='home'>
      {editStudentRecord()}
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
      <div style={{ margin: '15px' }}>
        <h3 className='text-center'>Student Record</h3>
        <div class="dropdown"><h3 style={{display: 'inline', color: 'blue'}}>Filter Record: </h3>
         <select class="button-select" aria-label="Default select example" onChange={filterStudentRecord}>
            <option selected>Select</option>
            <option value="BY_NAME_ASC">By Name</option>
            <option value="BY_CITY_ASC">By City</option>
            <option value="BY_REG_DATE_ASC">By Registration Date</option>
          </select>
        </div><br></br>
        {displayStudentRecord()}
      </div>
    </div>
  )
}

export default Home;