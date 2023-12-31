import React, { useState, useEffect } from 'react';

function VehicleModelForm(){
    const [modelName, setModelName] = useState('')
    const [pictureURL, setPictureURL] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [manufacturers, setManufacturers] = useState([])

    async function fetchManufacturer(){
        const url = 'http://localhost:8100/api/manufacturers/'

        const response = await fetch(url)

        if(response.ok){
            const data = await response.json()
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchManufacturer();
    }, [])


    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            "name":modelName,
            "picture_url":pictureURL,
            "manufacturer_id":manufacturer
        }


        const ModelUrl = 'http://localhost:8100/api/models/'
        const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            }
        }

        const response = await fetch(ModelUrl, fetchConfig)
        window.location.reload()
        if (response.ok){
            setModelName('')
            setPictureURL('')
            setManufacturer('')
        }


    }

    function handleModelName(event){
        const {value} = event.target
        setModelName(value)
    }

    function handlePictureUrl(event){
        const {value}= event.target
        setPictureURL(value)
    }
    function handleManufacturer(event){
        const {value} = event.target
        setManufacturer(value)
    }

    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a vehicle model</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleModelName} placeholder="modelName" required type="text" name="modelName" id="modelName" className="form-control" />
                        <label htmlFor="modelName">Model name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handlePictureUrl} placeholder="pictureURL" required type="text" name="pictureURL" id="pictureURL" className="form-control" />
                        <label htmlFor="pictureURL">Picture URL</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select onChange={handleManufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                        <option value="">Choose a manufacturer</option>
                        {manufacturers.map((manufacturer) =>{
                            return(
                                <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                            )})}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>

    )

}
export default VehicleModelForm
