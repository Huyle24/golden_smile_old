import { Container } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Breadcrumbs() {
  return (
    <Container >
      <Breadcrumb>
        <Breadcrumb.Item href="#">Du lịch</Breadcrumb.Item>
        <Breadcrumb.Item active>Du lịch trong nước</Breadcrumb.Item>
      </Breadcrumb>

    </Container>
  );
}

export default Breadcrumbs;