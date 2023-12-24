import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCar, fetchCars } from '../../../redux/cars/carsSlice';
import './style/AddCarItem.css';

const AddCarItem = () => {
  const dispatch = useDispatch();

  const handleAddCar = async (carData) => {
    try {
      await dispatch(addCar(carData));
      dispatch(fetchCars());
    } catch (error) {
      throw Error('Error adding car:', error);
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
    <div className="addCarContainer">
      <h1>Add Car Item</h1>
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
        <label htmlFor="Photo">
          Photo:
          <input type="text" name="photo" value={formData.photo} onChange={handleChange} required />
        </label>
        <label htmlFor="Cost">
          Cost:
          <input type="number" name="cost" value={formData.cost} onChange={handleChange} required />
        </label>
        <label htmlFor="description">
          description:
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCarItem;
