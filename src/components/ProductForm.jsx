import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const ProductForm = ({ categoris, setProducts }) => {
  // useState hook to manage the product form data
  const [productDataForm, setProductForm] = useState({
    title: "",
    quantity: 0,
    categoryId: "",
  });
  // handle changes in form inputs
  const categoryHandle = ({ target }) => {
    const { name, value } = target;
    setProductForm({ ...productDataForm, [name]: value });
  };
  // add new product to the products list
  const addNewProduct = (e) => {
    e.preventDefault();
    if (productDataForm.title === "") {
      alert("please add title/quantity/category");
    } else if (!categoris.length) {
      alert("please add category");
    } else {
      setProducts((prev) => [
        ...prev,
        {
          ...productDataForm,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    // reset the form data
    setProductForm({
      title: "",
      quantity: 0,
      categoryId: "",
    });
  };
  // return the product form component
  return (
    <div className="mb-6">
      <h2 className="text-xl text-slate-300 font-bold mb-2">Add New Product</h2>
      <form className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4">
        <div>
          <label htmlFor="product-title" className="block mb-1 text-slate-400">
            title
          </label>
          <input
            type="text"
            onChange={categoryHandle}
            name="title"
            value={productDataForm.title}
            id="product-title"
            className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
          />
        </div>
        <div>
          <label
            htmlFor="product-quantity"
            className="block mb-1 text-slate-400"
          >
            quantity
          </label>
          <input
            className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
            type="number"
            onChange={categoryHandle}
            value={productDataForm.quantity}
            name="quantity"
            id="product-quantity"
          />
        </div>
        <div>
          <label
            htmlFor="product-category"
            className="block mb-1 text-slate-400"
          >
            category
          </label>
          <select
            name="categoryId"
            id="product-category"
            value={productDataForm.categoryId}
            onChange={categoryHandle}
            className="bg-transparent text-slate-400 rounded-xl w-full"
          >
            <option className="bg-slate-500 text-slate-300" value="">
              select a category
            </option>
            {categoris.map((category) => {
              return (
                <option
                  key={category.id}
                  className="bg-slate-500 text-slate-300"
                  value={category.id}
                >
                  {category.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <button
            id="add-new-product"
            className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2"
            onClick={addNewProduct}
          >
            Add new Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
