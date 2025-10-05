import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", description: "" });
  const [brands, setBrands] = useState([{ name: "", detail: "", price: "", image: null }]);

  const handleBrandChange = (i, field, value) => {
    const copy = [...brands];
    copy[i][field] = value;
    setBrands(copy);
  };

  const addBrand = () => setBrands([...brands, { name: "", detail: "", price: "", image: null }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("brands", JSON.stringify(brands.map(b => ({
      name: b.name,
      detail: b.detail,
      price: b.price
    }))));

    brands.forEach((b, i) => {
      if (b.image) formData.append("brandImages", b.image);
    });

    try {
      const res = await axios.post('http://localhost:4000/api/product/create-product', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (res.data.status === 201) {
        navigate('/seller/my-products')
      }
      else {
        alert('Error creating product')
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Product creation failed');
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  }

  const setData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setProduct((val) => {
      return {
        ...val,
        [name]: value
      }
    })
  }

  return (
    <>
      <div className="d-flex justify-content-center py-4">
        <div className='w-100' style={{ maxWidth: '800px' }}>
          <h1 className="text-center mt-3">Add Product</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Product Name" name="name" value={product.name} onChange={setData} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Product Description" name="description" value={product.description} onChange={setData} />
            </Form.Group>

            <h3>Brands</h3>
            {brands.map((b, i) => (
              <div key={i} className="mb-4 p-3 border rounded">
                <Form.Group className="mb-3" controlId={`brandName-${i}`}>
                  <Form.Label>Brand Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Brand Name"
                    value={b.name}
                    onChange={(e) => handleBrandChange(i, "name", e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId={`brandDetail-${i}`}>
                  <Form.Label>Detail</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Detail"
                    value={b.detail}
                    onChange={(e) => handleBrandChange(i, "detail", e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId={`brandPrice-${i}`}>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Price"
                    value={b.price}
                    onChange={(e) => handleBrandChange(i, "price", e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId={`brandImage-${i}`}>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleBrandChange(i, "image", e.target.files[0])}
                  />
                </Form.Group>
              </div>
            ))}

            <Button variant="secondary" type="button" onClick={addBrand} className="mb-3">
              + Add Brand
            </Button>


            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default AddProduct