import React, { useState } from "react";

export default function QuantityInput ({ quantityValue, handleChange }) {
  const [productCartQuantity, setProductCartQuantity] = useState(1)
  const handleSubtraction = (event) => {
    event.preventDefault();
    if (productCartQuantity > 1) {
      setProductCartQuantity(productCartQuantity - 1);
      quantityValue(productCartQuantity - 1)
    }
  };

  const handleAddition = (event) => {
    event.preventDefault();
    setProductCartQuantity(productCartQuantity + 1);
    quantityValue(productCartQuantity + 1)
  };



console.log(productCartQuantity);
  return (
    <>
      <label htmlFor='quantity'>Quantity:</label>
      <div className="quantity">
        <button className="btn-minus1" onClick={handleSubtraction}>-</button>
        <input className="quantity"
          id="id_form-quantity"
          min="1"
          name="quantity"
          value={productCartQuantity}
          type="number"
          readonly
        />
        <button classNmae="btn-add1" onClick={handleAddition}>+</button>
      </div>
    </>
  );
}
