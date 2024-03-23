import {Container} from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {useSearchParams, usePathname} from "next/navigation";
import Link from "next/link";

function Breadcrumbs() {
    const pathname = usePathname()

    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item><Link href={'./'} className={'text-secondary'}> Trang chủ</Link> </Breadcrumb.Item>
                {pathname === "/Tour" && (
                    <Breadcrumb.Item active>
                        Chi tiết tour
                    </Breadcrumb.Item>
                )}

                {pathname === "/OrderTour" && (
                    <>
                        <Breadcrumb.Item>
                            <span className={'text-secondary'}>Chi tiết tour</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Đặt tour
                        </Breadcrumb.Item>
                    </>
                )}
                {pathname === "/Checkout" && (
                    <>
                        <Breadcrumb.Item>
                            <span className={'text-secondary'}>Chi tiết tour</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                           <span className={'text-secondary'}> Đặt tour</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Chọn phương thức thanh toán
                        </Breadcrumb.Item>
                    </>
                    )}
                {pathname === "/InfoUser" && (
                    <>
                        <Breadcrumb.Item active>
                            Thông tin cá nhân
                        </Breadcrumb.Item>

                    </>
                )}
                {pathname === "/TourWatched" && (
                    <>
                        <Breadcrumb.Item active>
                            Tour đã xem
                        </Breadcrumb.Item>

                    </>
                )}
                {pathname === "/Invoice" && (
                    <>
                        <Breadcrumb.Item active>
                            Danh sách đơn hàng đã đặt
                        </Breadcrumb.Item>

                    </>
                )}
                {pathname === "/InvoiceDetail" && (
                    <>
                        <Breadcrumb.Item > <span className={'text-secondary'}>   Danh sách đơn hàng đã đặt</span>

                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Chi tiết đơn hàng
                        </Breadcrumb.Item>

                    </>
                )}
            </Breadcrumb>

        </Container>
    );
}

export default Breadcrumbs;