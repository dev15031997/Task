import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Paginations from "./Paginations";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    })
  }

  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;

    })
  }

  const loadProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/product/products?page=${page}`);

      if (res.data.status === 200) {
        console.log(res.data.productData)
        setProduct(res.data.productData);
        setPageCount(res.data.Pagination.pageCount);
      }
      else {
        alert('Error fetching products')
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Product Data Fetch failed');
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  useEffect(() => { loadProducts(); }, [page]);

  return (
    <>
      <div className="container mt-5">
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>Seller</th>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Brands</th>
                    <th>Brand Images</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    product.length > 0 ? product.map((element, index) => (
                      <tr key={index}>
                        <td>{index + 1 + (page - 1) * 3}</td>
                        <td>{element.sellerId?.name}</td>
                        <td>{element.name}</td>
                        <td>{element.description}</td>
                        <td> {
                          element.brands?.map((brand, idx) => (
                            <div key={brand._id}>
                              {brand.name} - ₹{brand.price}
                            </div>
                          ))
                        }</td>
                        <td> {
                          element.brands?.map((brand, idx) => (
                            <div key={brand._id} className='img_parent'>
                                <img src={`http://localhost:4000/upload/${brand.image}`} alt="img" />
                            </div>
                          ))
                        }</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7" className="text-center">No Data Found</td>
                      </tr>
                    )
                  }
                </tbody>

              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
      </div>

    </>
  )
}

export default Products