import React, {useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {ToggleModal} from '../../Store/CategorieSlice';
import './Categories.css';
import CategoriesList from './CategoriesList';
import AddCategoires from "../Add-Categoires/AddCategoires";
import {deleteCategories} from '../../Store/CategorieSlice';

const Categories = () => {
  const {Category,isLoading} = useSelector(state => state.categories);

  const dispatch = useDispatch();
  useEffect(() =>{
    document.title = `Products | Categories`
  },[])


  return (
    <div className="Categories">
      <div className="container">
        <div className="Category">
          <h3>Categories</h3>
          <button onClick={() => dispatch(ToggleModal())}>Add Categories</button>
        </div>
          {isLoading && <p>Loading...</p>}
          <CategoriesList Category={Category} deleteCategories={deleteCategories} Dispatch={dispatch}/>
      </div>
      <AddCategoires />
    </div>
    )
};

export default Categories;
