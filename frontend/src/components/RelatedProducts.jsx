import React, { useState, useContext, useEffect } from "react";
import { ShopDataContext } from "../contextapi/ShopContext";
import { Link } from "react-router-dom";
import Card from "./Card";

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const { products } = useContext(ShopDataContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.products.length > 0) {
      let productsCopy = products.products.slice();

      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      productsCopy = productsCopy.filter(
        (item) => item._id !== currentProductId
      );
      setRelatedProducts(productsCopy.slice(0, 4));
    }
  }, [products, category, subCategory, currentProductId]);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-[100px]">
      <h2 className="text-3xl sm:text-[50px] font-extrabold text-blue-300 mb-8 text-center">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedProducts.map((item, idx) => (
          <Card
            key={idx}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
