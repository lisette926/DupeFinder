import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProductDetail.css';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

function ProductDetail() {
  const { id } = useParams(); // Get product name from the URL
  const [product, setProduct] = useState(null);
  const [dupes, setDupes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product details based on name
  useEffect(() => {
    fetch("http://localhost:3000/api/lux-data")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched products:", data); // Log fetched data
        const decodedName = decodeURIComponent(id); // Decode the URL parameter
        const foundProduct = data.find(item => item.name.toLowerCase().trim() === decodedName.toLowerCase().trim());
        if (foundProduct) {
          setProduct(foundProduct); // Get the matching product
          console.log("Found product:", foundProduct); // Log the found product
        } else {
          console.error("No product found with that name");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products: ", error);
        setLoading(false);
      });
  }, [id]);

  // Fetch dupes based on product name
  useEffect(() => {
    if (product) {
      fetch("http://localhost:3000/api/dupe-data")
        .then(response => response.json())
        .then(data => {
          const filteredDupes = data.filter(dupe => 
            product.dupes.includes(dupe.name) // Adjust based on your data structure
          );
          setDupes(filteredDupes);
        })
        .catch(error => console.error("Error fetching dupes: ", error));
    }
  }, [product]);

  if (loading) return <div>Loading...</div>; // Show loading indicator
  if (!product) return <div>No product found.</div>; // Handle case when product is not found

  return (
    <MDBContainer className="my-5 text-center">
      <MDBCard>
        <MDBCardImage src={product.image} fluid className="card-image" alt={product.name} />
        <MDBCardBody>
          <h5>{product.name}</h5>
          <p><strong>Top Notes:</strong> {product.top_notes.join(", ")}</p>
          <p><strong>Middle Notes:</strong> {product.middle_notes.join(", ")}</p>
          <p><strong>Bottom Notes:</strong> {product.bottom_notes.join(", ")}</p>
        </MDBCardBody>
      </MDBCard>

      <h4 className="mt-4">Dupes</h4>
      <MDBRow className="d-flex justify-content-center">
        {dupes.map(dupe => (
          <MDBCol sm='12' md="6" lg="4" className="mb-4" key={dupe._id}>
            <MDBCard>
              <MDBCardImage src={dupe.image} fluid className='card-image' alt={dupe.name} />
              <MDBCardBody>
                <h5>{dupe.name}</h5>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default ProductDetail;
