// import { v4 as uuidv4 } from "uuid";

const FilterComponents = ({
  handleSort,
  sortType,
  searchTerm,
  handleSearch,
  categoryProduct,
  handleCategory,
}) => {
  return (
    <div>
      {/* Search Input */}
      <div className="flex items-center justify-between mb-6">
        <label htmlFor="search-input" className="text-slate-500 text-lg">
          search
        </label>
        <input
          value={searchTerm}
          onChange={handleSearch}
          type="text"
          name="search-input"
          id="search-input"
          className="bg-transparent rounded-xl border border-slate-500 text-slate-400"
        />
      </div>

      {/* Sort Select */}
      <div className="flex items-center justify-between mb-6">
        <label htmlFor="sort-products" className="text-slate-500 text-lg">
          sort
        </label>
        <select
          name="sort"
          id="sort-products"
          className="bg-transparent text-slate-400 rounded-xl"
          defaultValue={sortType}
          onChange={handleSort}
        >
          <option className="bg-slate-500 text-slate-300" value="">
            All
          </option>
          <option className="bg-slate-500 text-slate-300" value="latest">
            latest
          </option>
          <option className="bg-slate-500 text-slate-300" value="earliest">
            earliest
          </option>
        </select>
      </div>

      {/* Category Select */}
      <div className="flex items-center justify-between mb-6">
        <label htmlFor="sort-products" className="text-slate-500 text-lg">
          Category Products
        </label>
        <select
          name="category"
          id="category"
          className="bg-transparent text-slate-400 rounded-xl"
          defaultValue={categoryProduct}
          onChange={handleCategory}
        >
          <option className="bg-slate-500 text-slate-300" value="">
            All categorys
          </option>
          {/* Render categories as options */}
          {categoryProduct.map((category) => {
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
    </div>
  );
};

export default FilterComponents;
