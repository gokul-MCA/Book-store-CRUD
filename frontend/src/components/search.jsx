import React, { useState } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState("")
    const router  = useNavigate()
    
    function onSubmit(e){
        e.preventDefault();
        router(`/books?query=${query}`)
    //    window.location.href=
       
    }

  return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" onChange={((e)=>setQuery(e.target.value))}/>
            <button type='submit'>Filter</button>
        </form>
    </div>
  )
}

export default Search