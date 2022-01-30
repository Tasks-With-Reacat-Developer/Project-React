import React, {useRef} from 'react';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector } from 'react-redux';
import {ToggleModal} from '../../Store/CategorieSlice';
import {insetCategories} from '../../Store/CategorieSlice'
import './AddCategoires.css';


const AddCategoires = () => {
  const Dispatch = useDispatch();
  const {isOpen, error} = useSelector(state => state.categories)
  const name = useRef(null)

  const HanglerSubmit = (e) => {
    e.preventDefault();
    const NewData = {
      name: name.current.value,
    }
    Dispatch(insetCategories(NewData))
    .unwrap()
    .then((res) => {
    return Dispatch(ToggleModal())
    })
    name.current.value = null;
  }

  return (
    <Modal open={isOpen} onClose={() => Dispatch(ToggleModal())}>
      <div className="AddCategoires">
        <h3>New Categories</h3>
        <form onSubmit={HanglerSubmit}>
          <input type="text" ref={name} placeholder='Name Categoires' />
          <button type="submit">New Categoires</button>
        </form>
        {error && <p style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>{error}</p>}
      </div>
    </Modal>
  )
};

export default AddCategoires;
