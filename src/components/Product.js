import React, {useContext} from "react";
import {ProductsContext} from "@/components/ProductsContext";

const Product = ({_id, name, price, description, imgUrl}) => {
  const {setSelectedProducts} = useContext(ProductsContext);

  function addProduct() {
    setSelectedProducts(prev => [...prev,_id]);
  }

  return (
      <div className="w-64">
        <div className="bg-gray-400 y-100 p-5 rounded-xl">
          <img src={imgUrl} alt=""/>
        </div>

        <div className="mt-2">
          <h3 className="font-bol text-lg">{name}</h3>
        </div>

        <p className="text-sm mt-1 leading-4">
          {description}
        </p>

        <div className="flex mt-1">
          <div className="text-2xl font-bold grow">${price}</div>
          <button  onClick={addProduct} className="bg-cyan-700 text-white py-1 px-3 rounded-xl">+</button>
        </div>
      </div>
  );
};

export default Product;
