import React from "react";
import { Grid2, Card, CardMedia, Paper } from "@mui/material"; // Use Grid2, not Grid22
const Gallery = ({ images }) => {
  return (
    <Grid2 container spacing={3}>
      {images.map((image, index) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt="Dog"
              style={{ objectFit: "cover" }}
            />
          </Card>
        </Grid2>
      ))}
      {images.length === 0 && (
        <Grid2 size={{ xs: 12 }}>
          <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            No images available. Please select a breed to view images.
          </Paper>
        </Grid2>
      )}
    </Grid2>
  );
};

export default Gallery;
