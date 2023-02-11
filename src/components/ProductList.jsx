// This component is responsible for rendering a list of products
// along with information such as the title, creation date, category, quantity, and delete button.
const ProductList = ({ products, setProducts, categoris }) => {
  // Handles deletion of a product from the list.
  const deleteHandler = (id) => {
    console.log(id);
    const deleteProduct = products.filter((c) => c.id !== id);
    setProducts(deleteProduct);
  };

  // Utility function to find the title of a category based on its id.
  const findCategory = (categoryid) => {
    return categoris.find((c) => c.id === categoryid).title;
  };

  return (
    <div>
      {/** Map through the list of products and render each product **/}
      {products &&
        products.map((product) => {
          return (
            <div
              key={product.id}
              className="flex items-center justify-between mb-2 w-full min-w-[400px]"
            >
              {/* Render the product title */}
              <span className="text-slate-400">{product.title}</span>
              <div className="flex items-center gap-x-3">
                {/* Render the creation date */}
                <span className="text-slate-400">
                  {new Date().toLocaleDateString("fa-IR")}
                </span>
                {/* Render the category with a badge */}
                <span className="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl">
                  {findCategory(product.categoryId)}
                </span>
                {/* Render the quantity */}
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300">
                  {product.quantity}
                </span>
                {/* Render the delete button **/}
                <button
                  onClick={() => deleteHandler(product.id)}
                  className="delete-product border px-2 py-o.5 rounded-2xl border-red-400 text-red-400 delete-product"
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

// Export the component for use in other parts of the application.
export default ProductList;
