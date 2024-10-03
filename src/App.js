import React, { useState, useEffect } from "react";
import axios from "axios";
import BreedSelector from "./BreedSelector";
import Gallery from "./Gallery";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

const App = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state for spinner
  const [error, setError] = useState(null); // Error state for API issues
  const imagesPerPage = 12;

  // Fetch all breeds on mount
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get("https://dog.ceo/api/breeds/list/all");
        setBreeds(Object.keys(response.data.message));
      } catch (error) {
        setError("Failed to fetch breed list. Please try again.");
      }
    };
    fetchBreeds();
  }, []);

  // Fetch images for selected breeds
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error before fetching
      try {
        // Reverse selectedBreeds so the last selected breed comes first
        const reversedBreeds = [...selectedBreeds].reverse();
        const promises = reversedBreeds.map((breed) =>
          axios.get(`https://dog.ceo/api/breed/${breed}/images`)
        );
        const results = await Promise.all(promises);
        const allImages = results.flatMap((result) => result.data.message);
        setImages(allImages);
      } catch (error) {
        setError("Failed to fetch images. Please try again.");
      } finally {
        setLoading(false); // Stop loading after the API call is done
      }
    };

    if (selectedBreeds.length > 0) {
      fetchImages();
    } else {
      setImages([]);
    }
  }, [selectedBreeds]);

  // Get current images for pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      {/* Main content container */}
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
        <Typography
          color="#08347A"
          fontFamily="Roboto Condensed"
          variant="h4"
          fontWeight="900"
          align="center"
          gutterBottom
        >
          Pawsome Gallery - Explore Your Favorite Dog Breeds 🐾
        </Typography>

        {/* Breed Selector */}
        <BreedSelector breeds={breeds} setSelectedBreeds={setSelectedBreeds} />

        {/* Error Handling */}
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {/* Loading Spinner */}
        {loading && (
          <Box mt={4} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {/* Image Gallery */}
        {!loading && !error && <Gallery images={currentImages} />}

        {/* Pagination */}
        {images.length > 0 && !loading && !error && (
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(images.length / imagesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default App;
