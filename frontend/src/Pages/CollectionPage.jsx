import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import CollectionLoading from "../components/loading/CollectionLoading";

const CollectionPage = () => {
  const { products, search, showSearch, productsLoading } =
    useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortBy, setSortBy] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((cat) => cat !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory(subCategory.filter((cat) => cat !== value));
    } else {
      setSubCategory([...subCategory, value]);
    }
  };

  useEffect(() => {
    let filtered = products;

    if (search && showSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((p) => category.includes(p.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((p) => subCategory.includes(p.subCategory));
    }

    if (sortBy === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [products, category, subCategory, sortBy, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 pt-10 border-t max-w-[80vw] mx-auto">
      {/* left side */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* filter categories */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              Men
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Men"}
                onClick={toggleCategory}
              />
            </p>
            <p className="flex gap-2">
              Women
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Women"}
                onClick={toggleCategory}
              />
            </p>
            <p className="flex gap-2">
              Kids
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Kids"}
                onClick={toggleCategory}
              />
            </p>
          </div>
        </div>
        {/* subcategories filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              Topwear
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Topwear"}
                onClick={toggleSubCategory}
              />
            </p>
            <p className="flex gap-2">
              Bottomwear
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Bottomwear"}
                onClick={toggleSubCategory}
              />
            </p>
            <p className="flex gap-2">
              Winterwear
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"winterwear"}
                onClick={toggleSubCategory}
              />
            </p>
          </div>
        </div>
      </div>

      {/* collection side */}
      <div className="flex-1">
        {/* Heading */}
        <div className="flex justify-between items-center text-center mb-5">
          <h1 className="text-3xl gap-2 sm:text-4xl font-semibold text-slate-500">
            All
            <span className="text-blue-950"> Collections</span>
          </h1>

          {/* sort products */}
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-gray-300 text-sm p-2 cursor-pointer"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: low to high</option>
            <option value="high-low">Sort by: high to low</option>
          </select>
        </div>

        {/* mapping products */}
        {productsLoading ? (
          <CollectionLoading />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((product) => (
              <ProductItem
                key={product._id}
                name={product.name}
                id={product._id}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
