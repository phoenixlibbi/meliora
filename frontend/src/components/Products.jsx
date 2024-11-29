import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp.tsx";
import ProductCard from "./ProductCard.jsx";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products");

        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          alert("No products found");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br mt-[-10%] from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Our Products
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 py-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </LampContainer>
  );
}

export default Products;

/* Dynamic by: Wali M. Github: WaliMuhammadAhmad */