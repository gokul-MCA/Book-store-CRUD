import React, { useState } from "react";

const Book = ({ id, title, author, publishYear, closePopup }) => {
  const [formdata, setFormData] = useState({
    title: title,
    author: author,
    publishYear: publishYear,
  });

  return (
    <div className="m-2 flex flex-col items-center justify-center">
      <h2 className="text-2xl text-center text-green-600 font-semibold m-2">Book Details</h2>
      <form className="flex flex-col gap-2 w-[300px] text-left">
        {/* Title Field */}
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formdata.title}
          disabled
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Author Field */}
        <label htmlFor="author" className="block font-medium">
          Author
        </label>
        <input
          id="author"
          type="text"
          name="author"
          value={formdata.author}
          disabled
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Publish Year */}
        <label htmlFor="publishYear" className="block font-medium">
          Publish Year
        </label>
        <input
          id="publishYear"
          type="number"
          name="publishYear"
          value={formdata.publishYear}
          disabled
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
};

export default Book;
