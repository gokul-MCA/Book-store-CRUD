import React, { useState } from 'react'
import useToast from '../hooks/useToast';

const DeleteBooks = ({id, onDelete}) => {
      const [deleting, setDeleting] = useState(false);
      const {addToast} = useToast();
    
      function onSubmit() {
        setDeleting(true);
    
        fetch(`${import.meta.env.VITE_BASE_URL}/books/${id}`, {
          headers: { "Content-Type": "application/json" },
          method: "DELETE",
        })
          .then((res) => {
            if (res.status === 204) {
              return { message: "Book deleted successfully!" }; // Simulate response
            }
            return res.json();
          })
          .then((data) => {
            addToast(data.message);
            onDelete(id);
          })
          .catch((error) => {
            console.error("Error deleting book:", error);
          })
          .finally(() => setDeleting(false));
      }
  return (
    <div className='w-[300px] p-10 flex justify-center'>
        <button onClick={onSubmit} type='submit' className='text-white text-xl font-medium bg-red-500 rounded px-3 py-2 active:bg-red-700'>Delete</button>   
    </div>
  )
}

export default DeleteBooks