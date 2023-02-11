/*
  CategoryForm is a functional component in React that allows adding a new category.
  It utilizes the useState hook from React to manage the local state.
*/

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const CategoryForm = ({ setCategoris }) => {
  // Declare state variables with useState
  // isShow keeps track of the visibility of the form
  const [isShow, setIsShow] = useState(false);

  // categoryData keeps track of the values of the form fields (title and description)
  const [categoryData, setCategory] = useState({ title: "", description: "" });

  // cancelHandle is a function that handles the event when the cancel button is clicked
  // It prevents the default behavior of the event and sets the isShow state to false to hide the form
  const cancelHandle = (e) => {
    e.preventDefault();
    setIsShow(false);
  };

  // changeHandler is a function that handles the change event of the form fields
  // It updates the value of the corresponding field in the categoryData state
  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setCategory({ ...categoryData, [name]: value });
  };

  // addNewCategory is a function that handles the event when the add button is clicked
  // It prevents the default behavior of the event and updates the categories state by adding a new category
  const addNewCategory = (e) => {
    e.preventDefault();
    if (categoryData.title === "") {
      alert("please add title/description");
    } else if (categoryData.description === "") {
      alert("please add description");
    } else {
      setCategoris((prev) => [
        ...prev,
        {
          ...categoryData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  return (
    <section>
      <div className={`mb-6 ${isShow ? "" : "hidden"}`} id="category-wrapper">
        <h2 className="text-xl text-slate-300 font-bold mb-2">
          Add New category
        </h2>
        <form className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4">
          <div>
            <label
              htmlFor="category-title"
              className="block mb-1 text-slate-400"
            >
              title
            </label>
            <input
              type="text"
              name="title"
              id="category-title"
              onChange={changeHandler}
              value={categoryData.title}
              className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
            />
          </div>
          <div>
            <label
              htmlFor="category-description"
              className="block mb-1 text-slate-400"
            >
              description
            </label>
            <textarea
              className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full"
              type=" text"
              name="description"
              id="category-description"
              onChange={changeHandler}
              value={categoryData.description}
            ></textarea>
          </div>
          <div className="flex items-center justify-between gap-x-4">
            <button
              className="flex-1 border border-slate-400 text-slate-400 rounded-xl py-2"
              id="cancel-add-category"
              onClick={cancelHandle}
            >
              Cancel
            </button>
            <button
              onClick={addNewCategory}
              id="add-new-category"
              className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
      <button
        onClick={() => setIsShow((prev) => !prev)}
        id="toggle-add-category"
        className="text-slate-600 text-lg mb-4 font-medium"
      >
        {!isShow ? "Add new Category?" : ""}
      </button>
    </section>
  );
};

export default CategoryForm;
