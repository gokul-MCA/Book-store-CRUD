import React, { useState } from "react";
import useToast from "../hooks/useToast";

const UpdateBooks = ({ id, title, author, publishYear, onUpdate, closePopup }) => {
  const [updating, setUpdating] = useState(false);
  const [formdata, setFormData] = useState({
    title: title,
    author: author,
    publishYear: publishYear,
  });

  const { addToast } = useToast();

  function onSubmit(e) {
    e.preventDefault();
    setUpdating(true);

    fetch(`${import.meta.env.VITE_BASE_URL}/books/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(formdata),
    })
      .then((data) => {
        if (!data.ok) {
          console.error("Error creating books");
        }
        return data.json();
      })
      .then((data) => {
        onUpdate(id, formdata);
        closePopup();
        addToast(data.message);
      })
      .finally(() => setUpdating(false));
  }

  function onChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  }
  return (
    <div className="m-2 flex flex-col items-center justify-center">
      <h2 className="text-2xl text-center text-green-600 font-semibold m-2">Update Book</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 w-[300px] text-left">
        {/* Title Field */}
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formdata.title}
          required
          onChange={onChange}
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
          required
          onChange={onChange}
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
          required
          onChange={onChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="border bg-green-400 rounded px-3 py-2 active:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={updating}
        >
          {updating ? "Updating" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBooks;
