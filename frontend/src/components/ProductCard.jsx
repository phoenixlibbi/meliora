import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";

export default function ProductCard({product}) {

  const navigate = useNavigate();
  return (
    <Card
      color="primary"
      invertedColors={false}
      orientation="vertical"
      size="md"
      variant="outlined"
      sx={{ width: 320 }}
    >
      <div>
        <Typography level="title-lg">{product.name}</Typography>
        <IconButton
          aria-label={`Add ${product.name} to cart`}
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={product.frontImage}
          srcSet={product.frontImage}
          loading="lazy"
          alt={product.name}
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {product.price}$
          </Typography>
        </div>
        <Button
          onClick={() => navigate('/product-details/' + product._id)}
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
        >
          Explore
        </Button>
      </CardContent>
    </Card>
  );
}

/* 
Made by: Labeeb Tariq
Updated by: Wali M.
*/