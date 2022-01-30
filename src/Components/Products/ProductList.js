import React, { Fragment } from 'react';
import { fadeInLeft } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

  // Animations
  const styles = StyleSheet.create({ 
    Left : {
      animationName: fadeInLeft,
      animationDuration: '1s'
    }
  })

const ProductList = ({products, dispatch,deleteProducts}) =>{
  const List = products.map(item => {
      return (
        <tr className={`${css(styles.Left)}`} key={item._id}>
          {console.log(item.le)}
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td className='btn'><button onClick={() => dispatch(deleteProducts(item))}>Remove</button></td>
        </tr>
      )
    })
    console.log(List.length);
  return (
    <Fragment>
        <table>
          <thead>
              <tr>
                <th>Name Categories</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
          </thead>
          {List.length ? (  
      <tbody>
      {List}
      </tbody>
) : (
  <tbody>
    <tr>
      <td style={{textAlign: 'center'}}>No There are no products</td>
    </tr>
  </tbody>
)}
  </table>
    </Fragment>
    )
}

export default ProductList;