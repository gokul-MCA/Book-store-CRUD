import React, { useState } from "react";
import useToast from "../hooks/useToast";

const CreateBooks = ({handleCreate, closePopup}) => {
  const [submitting, setSubmitting] = useState(false);
  const [formdata, setFormData] = useState({
    title: "",
    author: "",
    publishYear: 0,
  });
  const { addToast } = useToast();

  function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    fetch(`${import.meta.env.VITE_BASE_URL}/books`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(formdata),
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Error creating books");
        }
        return res.json();
      })
      .then((data) => {
        handleCreate(data);
        closePopup();
        addToast("Book created successfully!");
      })
      .catch((error) => {
        console.error(error);
        addToast("Failed to create book", "error");
      })
      .finally(() => setSubmitting(false));
  }

  function onChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  }
  return (
    <div className="m-2 flex flex-col items-center justify-center">
      <h2 className="text-2xl text-center text-green-600 font-semibold m-2">Create Book</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 w-[300px]">
          {/* Title Field */}
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
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
            required
            onChange={onChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="publishYear" className="block font-medium">
            Publish Year
          </label>
          <input
            id="publishYear"
            type="number"
            name="publishYear"
            required
            onChange={onChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="border bg-green-400 rounded px-3 py-2 active:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create"}
          </button>
      </form>
    </div>
  );
};

export default CreateBooks;
