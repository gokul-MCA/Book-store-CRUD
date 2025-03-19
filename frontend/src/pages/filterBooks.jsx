import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UpdateBooks from "../components/updateBooks";
import PopUp from "../components/popUp";
import DeleteBooks from "../components/deleteBooks";

const FilterBooks = () => {
  const [searchQuery] = useSearchParams();
  const title = searchQuery.get("query");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState({ count: 0, data: [] });

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}/books`)
      .then((data) => {
        if (!data.ok) {
          console.error("Error creating books");
        }
        return data.json();
      })
      .then((data) => {
        const filteredBooks = data.data.filter(
          (book) => book?.title?.toLowerCase().includes(title.toLowerCase())
        );
        setBooks({ count: filteredBooks.length, data: filteredBooks }); // Maintain object structure
      })      
      .finally(() => setLoading(false));
  }, [title]);

    // Function to remove the book from the list after deletion
    const handleDelete = (id) => {
        setBooks((prev) => ({
          ...prev,
          data: prev.data.filter((book) => book._id !== id),
        }));
      };
    
      const handleUpdate = (id, formdata) => {
        setBooks((prevBooks) => ({
          ...prevBooks,
          data: prevBooks.data.map((book) =>
            book._id === id
              ? { ...book, ...formdata } // Spread the existing book and overwrite only the fields in formdata
              : book
          ),
        }));
      };

  return (
    <div className="border-2 rounded-md  ">
      {loading && <p>Loading...</p>}
      {books?.data.map((book) => (
        <div key={book._id} className="flex flex-col gap-2">
          <div className="grid grid-cols-3">
            <a href={`${book._id}`}>
              <h2>{book.title}</h2>
            </a>
            {/* <h2>{book.author}</h2>
              <h2>{book.publishYear}</h2> */}
            <PopUp label="update">
              <UpdateBooks
                id={book._id}
                title={book.title}
                author={book.author}
                publishYear={book.publishYear}
                onUpdate={handleUpdate}
              />
            </PopUp>
            <PopUp label={"delete"}>
              <DeleteBooks id={book._id} onDelete={handleDelete} />
            </PopUp>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterBooks;
