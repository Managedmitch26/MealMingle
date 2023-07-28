import React, { useState } from 'react';

function TechnicianForm() {
    const [hasSignedUp, setHasSignedUp] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

    const url = 'http://localhost:8080/api/technicians/';

    const fetchConfig = {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
        setFormData({
            first_name: '',
            last_name: '',
            employee_id: '',
        });
        setHasSignedUp(true);
    }
}
    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
            ...formData,
            [inputName]: value
        });
}

let messageClasses = 'alert alert-success d-none mb-0';
let formClasses = '';
if (hasSignedUp) {
  messageClasses = 'alert alert-success mb-0';
  formClasses = 'd-none';
}

return(
    <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Add Technician</h1>
        <form className={formClasses} onSubmit={handleSubmit} id="create-technician-form">

          <div className="form-floating mb-3">
            <input onChange={handleFormChange} placeholder="First_name" required type="text" name="first_name" id="first_name" className="form-control" />
            <label htmlFor="first_name">First name</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange={handleFormChange} placeholder="Last_name" required type="text" name="last_name" id="last_name" className="form-control" />
            <label htmlFor="last_name">Last name</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange={handleFormChange} placeholder="Employee_id" required type="text" name="employee_id" id="employee_id" className="form-control" />
            <label htmlFor="employee_id">Employee id (Numbers only)</label>
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
        <div className={messageClasses} id="success-message">
            Congratulations! You successfully registered!
        </div>
      </div>
    </div>
  </div>
)
}

export default TechnicianForm
