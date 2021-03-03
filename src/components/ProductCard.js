import React from "react";
import Image from "material-ui-image";
import { Typography } from "@material-ui/core";

export default function ProductCard(props) {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" gutterBottom>
        {props.product.product}
      </Typography>
      <Image
        src={`http://127.0.0.1:8000/mediafiles/${props.product.image[0]}`}
        alt=""
      />
    </React.Fragment>
  );
}
