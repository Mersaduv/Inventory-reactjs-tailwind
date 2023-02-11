import { useEffect, useState } from "react";
import "./App.css";
import CategoryForm from "./components/CategoryFotm";
import FilterComponents from "./components/FilterComponents";
import NavBar from "./components/NavBar";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

// App component
function App() {
  // State hook to store the categories data
  const [categoriesData, setCategoris] = useState([]);
  // State hook to store the products data
  const [productsData, setProducts] = useState([]);
  // State hook to store the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");
  // State hook to store the sort type selected by the user
  const [sortType, setSortType] = useState("");
  // State hook to store the filtered products based on the user's search and sort criteria
  const [filterState, setFilterState] = useState([]);
  // State hook to store the selected category
  const [selectedCategory, setSelectedCategory] = useState("");

  // Event handler to update the selected category
  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Event handler to update the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Event handler to update the sort type
  const handleSort = (event) => {
    setSortType(event.target.value);
  };

  // useEffect hook to filter and sort the products based on the user's search and sort criteria
  useEffect(() => {
    let filteredProducts = productsData;

    // If the search term is not an empty string, filter the products that match the search term
    if (searchTerm !== "") {
      filteredProducts = filteredProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // If a category is selected, filter the products that belong to that category
    if (selectedCategory !== "") {
      filteredProducts = filteredProducts.filter(
        (product) => product.categoryId === selectedCategory
      );
      console.log(selectedCategory);
    }

    let sortedProducts = [];

    // If no sort type is selected, return the filtered products without sorting
    if (sortType === "") {
      sortedProducts = filteredProducts;
    }

    // If the latest sort type is selected, sort the products in descending order of creation date
    if (sortType === "latest") {
      sortedProducts = filteredProducts.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
    }
    // If the earliest sort type is selected, sort the products in ascending order of creation date
    else if (sortType === "earliest") {
      sortedProducts = filteredProducts.sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt)
      );
    }

    setFilterState(sortedProducts);
  }, [productsData, sortType, searchTerm, selectedCategory]); // The effect will re-run whenever one of these values changes

  // set localstorage
  useEffect(() => {
    let savedProducts = [];
    let savedCategories = [];

    // Try to parse the saved products and categories from local storage
    try {
      savedProducts = JSON.parse(localStorage.getItem("products") || []);
      savedCategories = JSON.parse(localStorage.getItem("categories") || []);
    } catch (error) {
      console.log(error);
    }

    // Log the retrieved products and categories from local storage
    console.log("Retrieved products from local storage:", savedProducts);
    console.log("Retrieved categories from local storage:", savedCategories);

    // Update the state with the retrieved products and categories
    setProducts(savedProducts);
    setCategoris(savedCategories);
  }, []);

  useEffect(() => {
    if (productsData.length) {
      localStorage.setItem("products", JSON.stringify(productsData));
    }
    if (categoriesData.length) {
      localStorage.setItem("categories", JSON.stringify(categoriesData));
    }
  }, [productsData, categoriesData]);
  return (
    <div className=" bg-slate-800 min-h-screen">
      <NavBar products={productsData} />
      <div className="container max-w-screen-sm mx-auto p-4">
        <CategoryForm setCategoris={setCategoris} />
        <ProductForm categoris={categoriesData} setProducts={setProducts} />
        <FilterComponents
          sortType={sortType}
          handleSort={handleSort}
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          handleCategory={handleCategorySelect}
          categoryProduct={categoriesData}
        />

        <hr className="mb-4" />
        <ProductList
          products={filterState}
          categoris={categoriesData}
          setProducts={setProducts}
        />
      </div>
    </div>
  );
}

export default App;
