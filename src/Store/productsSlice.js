import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("products/GetProducts", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.get("https://products-m7fy.herokuapp.com/products");
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const Token = JSON.parse(localStorage.getItem('myToken'));

// inset Product
export const insetProduct = createAsyncThunk("products/NewProduct", async (NewProduct, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try{
    const res = await axios.post('https://products-m7fy.herokuapp.com/products', NewProduct,{
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${Token.Token}`,
      },
    });
      return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Delete Products
export const deleteProducts = createAsyncThunk("products/DeleteProduct", async (item, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try{
    const res = await axios.delete(`https://products-m7fy.herokuapp.com/products/${item._id}`,{
      headers: {
        "Authorization": `Bearer ${Token.Token}`,
      }
    })
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const productsSlice = createSlice({
  name: "products",
  initialState: { isLoading: false ,error: null, products: [] },
  extraReducers: {
    //Get Products
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // inset Products 
    [insetProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [insetProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products.push(action.payload);
    },
    [insetProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Remove Products
    [deleteProducts.padding]: (state) => {
      state.isLoading = true;
    },
    [deleteProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = state.products.filter(el => el._id !== action.payload)
    },
    [deleteProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
  },

});

export const { logOut } = productsSlice.actions;

export default productsSlice.reducer;
