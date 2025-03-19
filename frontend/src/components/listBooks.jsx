import React, { useEffect, useState } from "react";
import DeleteBooks from "./deleteBooks";
import UpdateBooks from "./updateBooks";
import PopUp from "./popUp";
import Toaster from "./toaster";
import useToast from "../hooks/useToast";
import Search from "./search";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdRotateRight,
  MdVisibility,
} from "react-icons/md";
import CreateBooks from "./createBooks";
import Book from "./book";

const ListBooks = () => {
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(false);
  const [books, setBooks] = useState({ count: 0, data: [] });
  const { addToast } = useToast();

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
        setBooks(data);
      })
      .finally(() => setLoading(false));
  }, []);

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

  const handleCreate = (data) => {
    setBooks((prevBooks) => ({
      ...prevBooks,
      count: prevBooks.count + 1,
      data: [...prevBooks.data, data], // Add the new book to the list
    }));
  };

  return (
    <>
      {/* <Search />   */}
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <div className="w-[600px] flex justify-between items-center">
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setCard(false)}
              className={`px-4 py-2 border-2 border-blue-500 rounded-lg font-semibold ${
                !card && "bg-blue-200"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setCard(true)}
              className={`px-4 py-2 border-2 border-blue-500 rounded-lg font-semibold ${
                card && "bg-blue-200"
              }`}
            >
              Card View
            </button>
          </div>
          <span className="flex justify-end">
            <p className="py-2 px-2 font-medium text-xl">Add</p>
            <PopUp
              label={
                <MdAdd className="h-10 w-full border-2 rounded-full cursor-pointer text-white bg-green-500 hover:bg-green-700" />
              }
              renderContent={(setOpen) => (
                <CreateBooks
                  handleCreate={handleCreate}
                  closePopup={() => setOpen(false)}
                  // setOpen={setOpen}
                />
              )}
            />
          </span>
        </div>
        <p className="text-3xl font-semibold text-green-500 p-2">Books List</p>

        {loading ? (
          <p>
            <MdRotateRight className="h-10 w-10 animate-spin" />
          </p>
        ) : (
          <>
            {!card ? (
              <table className="w-[600px] table-auto border-collapse bg-gray-100 rounded-lg shadow-md my-6">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-4 px-5 text-left text-xl border-2 border-white w-3/6">
                      Title
                    </th>
                    <th className="py-4 px-5 text-center text-xl border-2 border-white w-1/6">
                      View
                    </th>
                    <th className="py-4 px-5 text-center text-xl border-2 border-white w-1/6">
                      Edit
                    </th>
                    <th className="py-4 px-5 text-center text-xl border-2 border-white w-1/6">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books?.data.map((book) => (
                    <tr key={book._id} className="hover:bg-blue-100">
                      <td className="py-3 px-5 text-xl font-medium border-2 border-white">
                        {book.title}
                      </td>
                      <td className="py-3 px-5 text-center border-2 border-white">
                        <PopUp
                          label={
                            <MdVisibility className="text-green-500 h-8 w-8  " />
                          }
                          renderContent={(setOpen) => (
                            <Book
                              id={book._id}
                              title={book.title}
                              author={book.author}
                              publishYear={book.publishYear}
                              closePopup={() => setOpen(false)}
                            />
                          )}
                        />
                      </td>
                      <td className="py-3 px-5 text-center border-2 border-white">
                        <PopUp
                          label={
                            <MdEdit className="text-orange-500 h-8 w-8  " />
                          }
                          renderContent={(setOpen) => (
                            <UpdateBooks
                              id={book._id}
                              title={book.title}
                              author={book.author}
                              publishYear={book.publishYear}
                              onUpdate={handleUpdate}
                              closePopup={() => setOpen(false)}
                            />
                          )}
                        />
                      </td>
                      <td className="py-3 px-5 text-center border-2 border-white">
                        <PopUp
                          label={
                            <MdDelete className="text-red-500 h-8 w-8  " />
                          }
                          renderContent={() => (
                            <DeleteBooks
                              id={book._id}
                              onDelete={handleDelete}
                            />
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="grid grid-cols-3 gap-5 my-6 ">
                {books?.data.map((book) => (
                  <div
                    key={book._id}
                    className="border-2 border-blue-500 flex flex-col justify-between p-4 pb-6 rounded-lg"
                  >
                    <div className="flex justify-between items-center ">
                      <PopUp
                        label={<MdEdit className="text-orange-500 h-8 w-8 " />}
                        renderContent={(setOpen) => (
                          <UpdateBooks
                            id={book._id}
                            title={book.title}
                            author={book.author}
                            publishYear={book.publishYear}
                            onUpdate={handleUpdate}
                            closePopup={() => setOpen(false)}
                          />
                        )}
                      />
                      <PopUp
                        label={<MdDelete className="text-red-500 h-8 w-8 " />}
                        renderContent={() => (
                          <DeleteBooks id={book._id} onDelete={handleDelete} />
                        )}
                      />
                    </div>
                    <div className="px-4 py-0 ">
                      <p className="text-base font-medium border-2 border-white text-center ">{book.publishYear}</p>
                      <p className="text-xl font-medium border-2 border-white ">{book.title}</p>
                      <p className="text-base font-medium border-2 border-white text-right ">~{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListBooks;
