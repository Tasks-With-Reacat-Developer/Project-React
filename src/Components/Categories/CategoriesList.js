import { fadeInUp} from 'react-animations';
import { StyleSheet, css } from 'aphrodite';



    // Animations
    const styles = StyleSheet.create({ 
      Left : {
        animationName: fadeInUp,
        animationDuration: '1s'
      }
    })

const CategoriesList = ({ Category, deleteCategories, Dispatch}) => {
  const categoriesList =     Category.map(el => {
    console.log(el.length);
    return (
      <div className={`info ${css(styles.Left)}`} key={el._id} >
        <h2>{el.name}</h2>
        <button onClick={() => Dispatch(deleteCategories(el))}>Delete</button>
      </div>
  )
})
  console.log(categoriesList);
  return  <>{ categoriesList.length ? categoriesList : <p style={{textAlign: 'center', fontWeight: 'bold'}}>No There are no categories</p>}</> }

export default CategoriesList;