import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo_dupe_finder.png';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import ProductDetail from './ProductDetail';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";

function App() {
  const [products, setProducts] = useState([]);
  
  //fetch products
  useEffect(() => {
    fetch("http://localhost:3000/api/lux-data")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" src={logo} alt="Logo" />
      </header>

      <MDBContainer fluid className="my-5 text-center">
        <MDBRow className="d-flex justify-content-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <MDBCol sm='12' md="6" lg="4" className="mb-4">
      <MDBCard onClick={() => navigate(`/product/${encodeURIComponent(product.name)}`)} style={{ cursor: 'pointer' }}>
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image rounded hover-zoom"
        >
          <MDBCardImage
            src={product.image}
            fluid
            style={{ height: '300px', width: '100%', objectFit: 'contain' }}
            className="w-100 card-image" 
            alt={product.name}
          />
        </MDBRipple>
        <MDBCardBody>
          <h5 className="mb-3">{product.name}</h5>
          <p>
            <strong>Top Notes:</strong> {product.top_notes.join(", ")}
          </p>
          <p>
            <strong>Middle Notes:</strong> {product.middle_notes.join(", ")}
          </p>
          <p>
            <strong>Bottom Notes:</strong> {product.bottom_notes.join(", ")}
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}
