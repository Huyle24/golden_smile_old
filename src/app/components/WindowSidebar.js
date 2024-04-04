import {Col, Row} from "react-bootstrap";
import Link from "next/link";

export default function WindowSidebar() {
    return (
        <>
            <div className={'window-corporation'}>
                <div className={'text'}><i className='bx bx-chevron-left'></i></div>
                <div className={'content'}>
                    <div className={'content-body'}>
                        <Row>
                            <Col xl={6} className={'col-left'}>
                                <div className={'div-img'}>
                                    <Link href={'#'}>
                                        <img
                                            src="https://goldensmiletravel.com/uploads/images/setting/admingst/2022/12/07/lan-3-1-gst-1670401032.jpg"
                                            alt="" className={'w-100'}/>
                                    </Link>
                                </div>
                                <div className={'div-img mt-2'}>
                                    <Link href={'https://ist.org.vn/'} target={'_blank'}>
                                        <img
                                            src="https://goldensmiletravel.com/uploads/images/setting/admingst/2022/12/07/lan-1-logo-ist-final-01-1670401059.jpg"
                                            alt="" className={'w-100'}/>
                                    </Link>
                                </div>
                            </Col>
                            <Col xl={6} className={'pl-0 col-right'}>
                                <div className={'div-img'}>
                                    <Link href={'https://goldensmileevent.com.vn/'} target={'_blank'}>
                                        <img
                                            src="https://goldensmiletravel.com/uploads/images/setting/admingst/2023/02/01/gse-tn-600x600-2-1675250896.png"
                                            alt="" style={{height: '74px'}}/>
                                    </Link>
                                </div>
                                <div className={'div-img mt-2'}>
                                    <Link href={'https://goldensmilefilm.com.vn/'} target={'_blank'}>
                                        <img
                                            src="https://goldensmiletravel.com/uploads/images/setting/admingst/2023/02/01/gsf-tn-600x600-2-1675250681.png"
                                            alt="" className={'w-100'}/>
                                    </Link>
                                </div>
                                <div className={'div-img mt-2'}>
                                    <Link href={'https://truyenthongmarketing.vn/'} target={'_blank'}>
                                        <img
                                            src="https://goldensmiletravel.com/uploads/images/setting/admingst/2023/02/27/logo-gs-communication-01-1677498253.jpg"
                                            alt="" className={'w-100'}/>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>


            </div>
            <div className={'window-instruct'}>
                <div className={'text'}><i className='bx bx-edit'></i></div>
                <div className={'content'}>
                    <Link href={'./Intruct'} target={'_blank'}>
                    <div className={'content-body text-center'}>
                        Hướng dẫn đặt tour
                    </div>
                    </Link>
                </div>
            </div>
            <div className={'window-call'}>
                <div className={'text'}><i className='bx bx-phone-call'></i></div>
                <div className={'content'}>
                    <div className={'content-body text-center'}>
                        <div>   028 7100 2828</div>
                        <div> 1900 2644 </div>

                    </div>
                </div>
            </div>
        </>
    )
}