import CreateContextApi from "./CreateContextApi";
import React, { useEffect, useState } from 'react'

export default function ContextApiStates(props) {
  const [showCart, setShowCart] = useState(false)
  const [cartData, setCartData] = useState([])
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let tempTotal = 0;
    // Recalculate totals based on price and items
    for (let index = 0; index < cartData.length; index++) {
      tempTotal += cartData[index].price * cartData[index].items
    }

    setTotal(tempTotal) // Update the state with new totals
  }, [cartData], []); // Run this effect on mount

  return (
    <>
      <CreateContextApi.Provider value={{ showCart, setShowCart, cartData, setCartData, total, setTotal }}>
        {props.children}
      </CreateContextApi.Provider>
    </>
  )
}
