import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Paginations from "./Paginations";

const Sellerlist = () => {
  const [sellers, setSellers] = useState([]);
  const [page,setPage]=useState(1);
  const [pageCount,setPageCount]=useState(0);
  
  const handlePrevious=()=>{
    setPage(()=>{
      if(page===1) return page;
      return page-1;
    })
  }

  const handleNext=()=>{
    setPage(()=>{
      if(page===pageCount) return page;
      return page+1;
     
    })
  }

  const loadSellers = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/user/sellers?page=${page}`);
      if (res.data.status === 200) {
        setSellers(res.data.sellerData);
        setPageCount(res.data.Pagination.pageCount);
      }
      else {
        alert('Error fetching sellers')
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Seller Data Fetch failed');
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  useEffect(() => { loadSellers(); }, [page]);

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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>County</th>
                    <th>State</th>
                    <th>Skills</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sellers.length > 0 ? sellers.map((element,index) => (
                       <tr key={index}>
                        <td>{index + 1 + (page - 1)*3}</td> 
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.phone}</td>
                        <td>{element.country}</td>
                        <td>{element.state}</td>
                        <td>{element.skills?.join(", ")}</td>
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

export default Sellerlist