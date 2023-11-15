import { Col, Row } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

function Paginate() {
  return (
    <Row className='mt-4'>
      <Col lg="12">
      <Pagination className='d-flex justify-content-center'>
      <Pagination.First />
      <Pagination.Item>{1}</Pagination.Item>

      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Last />
      </Pagination>
      </Col>
    </Row>
    
    
  );
}

export default Paginate;