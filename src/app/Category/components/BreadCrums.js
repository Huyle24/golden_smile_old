import { Container } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {useSearchParams} from "next/navigation";

function Breadcrumbs() {
    const searchParams = useSearchParams()
    const tourType = searchParams.get("tour_type");

  return (
    <Container >
      <Breadcrumb>
        <Breadcrumb.Item href="#">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>

            {tourType === "1" ? (
                <span>Tour riêng</span>
            ):(
                <span>Tour ghép</span>
                )}
        </Breadcrumb.Item>
      </Breadcrumb>

    </Container>
  );
}

export default Breadcrumbs;