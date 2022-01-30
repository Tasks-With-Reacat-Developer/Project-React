import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// Get All Categories
export const getCategories = createAsyncThunk('categories/getCategories', async (_,thunkAPI) =>{
  const { rejectWithValue } = thunkAPI;
  try{
    const res = await axios.get('https://products-m7fy.herokuapp.com/categories');
    return res.data;
  }
  catch(error){
    return rejectWithValue(error.message)
  }
})
const Token = JSON.parse(localStorage.getItem('myToken'));

// inset New Categories
export const insetCategories = createAsyncThunk('categories/insetCategories', async (NewCategories,thunkAPI) =>{
  const { rejectWithValue } = thunkAPI;
  try{
    const res = await axios.post('https://products-m7fy.herokuapp.com/categories', NewCategories,{
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${Token.Token}`,
      },
    })
    return res.data;
  } catch(error){ 
    return rejectWithValue(error.message);
  }
});

//Delete Categories
export const deleteCategories = createAsyncThunk('categories/deleteCategories', async (item,thunkAPI)=>{
  const { rejectWithValue } = thunkAPI;
  try{
    const res = await axios.delete(`https://products-m7fy.herokuapp.com/categories/${item._id}`,{
      headers: { 
        "Authorization": `Bearer ${Token.Token}`,
      },
  })
  console.log(res);
    return res.data;
  //  await fetch()
  }catch (error) {
    return rejectWithValue(error.message);
  }
})


const CategoriesSlice = createSlice({
  name: 'categories',
  initialState: {Category: [], isLoading: false, error: null, isOpen: false},
  reducers: {
    ToggleModal: (state) => {
      state.isOpen = !state.isOpen;
    }
  },
  extraReducers: {
    //Get all categories
    [getCategories.pending]: (state) =>{
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state, action) =>{
      state.isLoading = false;
      state.Category = action.payload
    },
    [getCategories.rejected]: (state, action) =>{
      state.isLoading = false;
      state.error = action.payload;
    },

    // inset New Categories
    [insetCategories.padding]: (state) =>{
      state.isLoading = true;
    },
    [insetCategories.fulfilled]: (state, action) =>{
      state.isLoading = false;
      state.Category.push(action.payload)
    },
    [insetCategories.rejected]: (state, action) =>{
      state.isLoading = false;
      state.error = action.payload;
    },

    // Delete Categories
    [deleteCategories.padding]: (state) =>{
      state.isLoading = true;
    },
    [deleteCategories.fulfilled]: (state,action) =>{
      state.isLoading = false;
      console.log(action);
      state.Category = state.Category.filter(item => item._id !== action.payload)
    },
    [deleteCategories.rejected]: (state,action) =>{
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export const {ToggleModal} = CategoriesSlice.actions;
export default CategoriesSlice.reducer;