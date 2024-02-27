import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./ListTour.scss"
import {useEffect, useState} from "react";
import {BASE_URL_API, GET_LANG_CODE, GET_TOKEN} from "../../../../redux/actions/type";
import axios from "axios";
import Link from "next/link";
import {log} from "qrcode/lib/core/galois-field";

export default function ListTour() {
    const getTourList = async (key_work = '', tour_type = '', typeDate = '') => {
        let url_api = BASE_URL_API + "Balotour/Tour/tourList?off=9&limit=&keyword=" + key_work + "&tour_type=" + tour_type + "&typedate=" + typeDate;
        let token = await GET_TOKEN();

        axios.get(url_api, {
            headers: {
                "x-api-key": "api_key",
                'USER-TOKEN': JSON.parse(token),
                'LANG-CODE': JSON.parse(GET_LANG_CODE()),
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {
            console.log('response')
            console.log(response.data)

            setTourlist(response.data.data.tour_list)
            // if (response.data.data.tour_list == '' || response.data.data.tour_list.length < OFF_DEFAULT){
            //     setSeemore(true)
            // }else{
            //     setSeemore(false)
            // }
            // setLimit(0)
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getTourList()
    }, []);

    const [tourList, setTourlist] = useState([])
    console.log(tourList)
    const change_input = (event) => {
        setSearchKeyWord(event.target.value)
        getTourList(event.target.value, checkboxOrder, checkboxTypeDate)
    }


    const ListCard = tourList ? (
        tourList.map((item, index) => (

            <Card key={index} className={'card-tour '}>
                <Row className={'px-1'}>
                    <Col sm={4}>
                        <Link href={`/Tour?id=${item.id}`}>
                            {/*<div className={'container-img'}>*/}
                            {/*    <img*/}
                            {/*        src="https://vigomanager.com/app-assets/mobile/img-huy/quang-truong-lam-vien-da-lat-tophomestay-19-1607005088550-1638779196.jpg"*/}
                            {/*        className="card-tour-img"/>*/}
                            {/*</div>*/}
                            <div className="overlay-outer">
                                    <div className="overlay"></div>
                                <img src={item.bucket_img} alt="Image"/>
                                <div className="content-details fadeIn_bottom">
                                        {/*<h3 className="content-title">Giá từ</h3>*/}
                                        <p className="content-text">Xem chi tiết</p>
                                    </div>

                            </div>
                        </Link>

                    </Col>
                    <Col sm={8}>
                        <Link href={`/Tour?id=${item.id}`}>
                            <Card.Title className={'card-tour-title'}>{item.name}</Card.Title>
                            <Card.Text>
                                <div className={'card-text-line-star'}>
                                    {[...Array(3)].map((_, i) => (
                                        <i className='bx bxs-star me-1'></i>
                                    ))}
                                    {[...Array(2)].map((_, i) => (
                                        <i className='bx bx-star me-1'></i>
                                    ))}
                                </div>
                            </Card.Text>
                            <Card.Text>
                                <Row>
                                    <Col sm={6}>
                                        <i className='bx bx-calendar me-2'></i>
                                        <span>Số ngày: {item.date_type_name}</span>
                                    </Col>
                                    <Col sm={6}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-people me-2" viewBox="0 0 16 16">
                                            <path
                                                d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                                        </svg>
                                        <span>Số chỗ còn: 100</span>
                                    </Col>
                                </Row>
                                <Row className={'mt-1'}>
                                    <div>
                                        <i className='bx bx-calendar me-2'></i>
                                        <span>Khởi hành: 02/03/2024</span>
                                    </div>
                                </Row>
                            </Card.Text>
                        </Link>
                    </Col>
                </Row>
                <div className="tour-price-horizontal">
                    <span className="tour-price-horizontal-label">Giá từ</span>
                    <span className="tour-price-horizontal-value"> Liên hệ</span>
                </div>
            </Card>
        ))
    ) : null;


    return (
        <>

            <Card className={'card-description'}>
                <Card.Body>
                    Tour MICE tên đầy đủ tiếng Anh là Meeting Incentive Conference Event là loại hình du lịch kết hợp
                    hội nghị, hội thảo, triển lãm, tổ chức sự kiện, du lịch khen thưởng của các công ty cho nhân viên,
                    đối tác.
                </Card.Body>
            </Card>
            <div className={'tour_cat_title'}> Tất cả tour hiện có</div>
            <Card className={'box_list_tool'}>
                <Card.Body>
                    <i className='bx bx-map text-danger my-auto me-2'></i>
                    <span>Có 4 tour</span>
                </Card.Body>
            </Card>
            {ListCard}
        </>
    )
}
