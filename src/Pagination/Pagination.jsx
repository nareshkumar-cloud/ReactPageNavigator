import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../App.css';

const Pagination = () => {
    const [tableData, settableData] = useState();
    const [currentPage, setcurrentPage] = useState(1);
    const [rowsParPage, setrowsParPage ] = useState(10);
    const indexOfLastItem = currentPage * rowsParPage;
    const indexOfFirstItem = indexOfLastItem - rowsParPage;
    const currentItem = tableData?.users?.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(tableData?.total/rowsParPage);
    useEffect(()=>{
        axios.get('https://dummyjson.com/users?limil=0')
        .then((reaponse)=>{
            console.log(reaponse);
            settableData(reaponse?.data)
        })

    },[]) 

    const handleOnClick =()=>{
   setcurrentPage((prev)=>Math.max(prev-1, 1))
    }
     const handleNext=()=>{
        setcurrentPage((prev)=>Math.max(prev+1, totalPages))
     }
     const handlePageClick=(pageNumber)=>{
       setcurrentPage(pageNumber)
     }
  return (
    <div>
     <table className='table'> 
<thead>
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Gender</th>
        
    </tr>
</thead>
<tbody>
    {currentItem?.map((value, index)=>(
       <tr key={index}> 
       <td>{value.firstName}</td>
       <td>{value.email}</td>
       <td>{value.gender}</td>
        </tr> 
    ))}
</tbody>
     </table>
     <div className='pagination'>
     <button onClick={handleOnClick} disabled={currentPage===1}>Prev</button>
     {Array.from({length:totalPages},(_,index)=>(
        <button onClick={()=>handlePageClick(index+1)} className={currentPage===index+1 ? 'active':' ' }>{index+1}</button>
     ))}
     <button onClick={handleNext} disabled={currentPage===totalPages}>Next</button>
     </div>
    </div>
  )
}

export default Pagination
