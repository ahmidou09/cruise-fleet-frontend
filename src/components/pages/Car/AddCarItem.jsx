import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addCar, fetchCars } from '../../../redux/cars/carsSlice';
import 'react-toastify/dist/ReactToastify.css';
import './style/AddCarItem.css';

const AddCarItem = () => {
  const dispatch = useDispatch();

  const handleAddCar = async (carData) => {
    try {
      await dispatch(addCar(carData));
      dispatch(fetchCars());
      toast.success('Car added successfully!');
    } catch (error) {
      toast.error(`Error adding car: ${error.message}`);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    availability: false,
    photo: '',
    cost: 0,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCar(formData);
    setFormData({
      name: '',
      availability: false,
      photo: '',
      cost: 0,
      description: '',
    });
  };

  return (
    <div className="add-car-container">
      <ToastContainer />
      <header>
        <h2>Add Car Item</h2>
      </header>
      <form onSubmit={handleSubmit} className="addCarForm">
        <label htmlFor="name">
          Name:
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label htmlFor="availability">
          Availability:
          <input
            type="checkbox"
            id="availability"
            name="availability"
            checked={formData.availability}
            onChange={() => setFormData((pre) => ({ ...pre, availability: !pre.availability }))}
          />
        </label>
        <label htmlFor="photo">
          Photo:
          <input type="text" name="photo" value={formData.photo} onChange={handleChange} required />
        </label>
        <label htmlFor="cost">
          Cost:
          <input type="number" name="cost" value={formData.cost} onChange={handleChange} required />
        </label>
        <label htmlFor="description">
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCarItem;
