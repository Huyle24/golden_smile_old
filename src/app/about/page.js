/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect, useState } from "react"
import * as actions from "../../../redux/actions";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import { BASE_URL_API, GET_TOKEN,GET_LANG_CODE } from '../../../redux/actions/type';
import { GET_LANG_vi,GET_LANG_ko } from '../../../js/lang';
function Page(props) {
    const [textShow, setTextShow] = useState('');
    let slide_partner_image_list = props.slideImageListInfo.data && props.slideImageListInfo.isLoading == false ? props.slideImageListInfo.data.slide_partner_img : '';
    useEffect(() => {
        props.fetchSlideImageList()
        getLangText()
      }, [])
      const getLangText = async () => {
        let lang_code = await GET_LANG_CODE();
        let lang_text ={}
        switch (JSON.parse(lang_code)) {
            case 'vi':
                lang_text = GET_LANG_vi().about
                break;
            default:
                lang_text = GET_LANG_ko().about
                break;
        }
        setTextShow(lang_text)
    }

    return (
        <main>

            <div className="main_about pb-4" style={{ backgroundImage: `url("https://nhanhtravel.com/wp-content/uploads/2022/12/%E2%80%94Pngtree%E2%80%94blue-gradient-minimalistic-template-background_1140882.jpg")` }}>
               <div className="container">
                    <div className=" about-balotour">
                        <div className="title text-center ">{textShow ? textShow.About_Balotour :''}</div>
                        <div className="text-center content">{textShow ? textShow.About_Balotour_Text : ''}</div>
                    </div>
               </div>
            </div>
            <div className="main_about_content pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 d-flex justify-content-center align-items-center">
                            <div>
                                <div className="content-about mb-3">
                                    {textShow ? textShow.Text : ''}
                                </div>
                                <div className="content-about mb-3">
                                {textShow ? textShow.Text_1 : ''}
                                </div>
                                <div className="content-about mb-3">
                                {textShow ? textShow.Text_2 : ''}
                                </div>
                                <div className="content-about mb-3">
                                    <b>NhanhTravel</b> {textShow ? textShow.Text_3 :''}
                                </div>
                                {/*<div className="content-about ">*/}
                                {/*    <b>NhanhTravel</b> {textShow ? textShow.Text_4 : ''}*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                {/*    Nhiệm vụ của chúng tôi là hỗ trợ những nhà quản trị có thể điều hành doanh nghiệp du lịch chuyên nghiệp và đạt hiệu quả cao nhất.*/}

                                {/*    Thông qua hệ thống khép kín của Nhanh Travel, doanh nghiệp sẽ tối ưu được quy trình quản lý đơn hàng; điều hành tour; quản lý sản phẩm; quản lý lịch trình xe, tài xế, huấn luyện viên; quản lý nhà cung cấp; quản lý đại lý, cộng tác viên; giao việc và đề xuất; tài chính kế toán; quản lý nhân sự; hệ thống báo cáo; chăm sóc khách hàng. Qua đó nâng cao hiệu quả kinh doanh, đáp ứng được nhu cầu của khách hàng cũng như là bắt kịp xu hướng chuyển đổi số trên toàn thế giới.*/}

                                {/*    Cùng với sự phát triển của cách mạng công nghệ 4.0, Nhanh Travel đã, đang và sẽ tiếp tục hoàn thiện và hỗ trợ các doanh nghiệp du lịch trong quá trình phát triển.*/}

                                {/*    Nhanh Travel – Giúp vận hành nhanh, tinh gọn, rõ ràng, rút ngắn thời gian vận hành của chủ doanh nghiệp lữ hành và sân Golf. Chúng tôi hy vọng mình có thể góp phần công sức nhỏ giúp phát triển ngành du lịch Việt Nam càng phát triển thịnh vượng.*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <img className="img-about" src="https://nhanhtravel.com/wp-content/uploads/2022/12/telework-g5879ec90a_1280.jpg"/>
                        </div>
                    </div>
                </div>

            </div>
            <div className="main_about_mission">
                <div className=" title_main_about mb-4 pt-4 text-center">{textShow ? textShow.Vison_Misson_Titile : ''}</div>
                <div className="container mb-4">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="d-flex">
                                <div>
                                    <img width="50" height="50" src="https://nhanhtravel.com/wp-content/uploads/2022/12/focus-e1670649317822.png"  alt="" decoding="async" loading="lazy" />
                                </div>
                                <div className="mission-content">
                                    <div className="title">{textShow ? textShow.Vison_Titile : ''}</div>
                                    <p>
                                        {textShow ? textShow.Vison_Titile_Text : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="d-flex">
                                <div>
                                    <img width="50" height="50" src="https://nhanhtravel.com/wp-content/uploads/2022/12/target-1-e1670648841357.png"  alt="" decoding="async" loading="lazy" />
                                </div>
                                <div className="mission-content">
                                    <div className="title">{textShow ? textShow.Misson_Titile : ''}</div>
                                    <p>
                                    {textShow ? textShow.Misson_Titile_Text : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main_core_values main_diagram">
                <div className=" title_main_about mb-4 pt-4 text-center">{textShow ? textShow.Core_Values_Title : ''}</div>
                <div className="container">
                    <div className="wid-value">
                        <div className="width30">


                                <div className="value-content">
                                    <div className="title">{textShow ? textShow.Enthusiasm : ''}</div>
                                    <div>{textShow ? textShow.Enthusiasm_Text : ''}</div>
                                </div>
                                <div className="value-content">
                                    <div className="title">{textShow ? textShow.Creative : ''}</div>
                                    <div>{textShow ? textShow.Creative_Text : ''}</div>
                                </div>

                        </div>
                        <div className="width39">
                            <img src="https://nhanhtravel.com/wp-content/uploads/2022/12/Group-19128.png" />
                        </div>
                        <div className="width30">
                            <div className="value-content">
                                <div className="title">{textShow ? textShow.Responsibility : ''}</div>
                                <div>{textShow ? textShow.Responsibility_Text : ''}</div>
                            </div>
                            <div className="value-content">
                                <div className="title">{textShow ? textShow.Honest : ''}</div>
                                <div>{textShow ? textShow.Honest_Text : ''}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="main_diagram pb-4">
                <div className=" title_main_about mb-4 pt-4 text-center">{textShow ? textShow.Company_Chart : ''}</div>
                <div className="container">
                    <img src="image/so-do-cong-ty.jpg" alt="" />
                </div>
            </div>
            <div className="main_partner">
                <div className=" title_main_about mb-4  text-center">{textShow ? textShow.Partner : ''}</div>
                <div className="container">
                    <div className="about_doitac_wrapper">
                       {
                        slide_partner_image_list ? slide_partner_image_list.map((item,index)=>{
                            return(
                                <div className="about_doitac_box_img" key={index}>
                                    <img src={item}  />
                                </div>
                            )
                        }):null

                       }

                    </div>
                    <div className="about_doitac_wrapper_mb">
                        <Swiper
                            cssMode={true}
                            navigation={true}

                            breakpoints={{
                                "@0.00": {
                                slidesPerView: 1,
                                spaceBetween: 10,
                                },
                                "@0.65": {
                                slidesPerView: 2,
                                spaceBetween: 10,
                                },
                                "@0.75": {
                                slidesPerView: 3,
                                spaceBetween: 10,
                                },
                                "@1.00": {
                                slidesPerView: 4,
                                spaceBetween: 20,
                                },

                                "@1.50": {
                                slidesPerView: 4,
                                spaceBetween: 20,
                                },
                                "@1.75": {
                                slidesPerView: 4,
                                spaceBetween: 20,
                                },
                                "@2.0": {
                                slidesPerView: 4,
                                spaceBetween: 20,
                                },
                            }}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Navigation,Autoplay]}
                            className="mySwiper"
                        >

                            {
                            slide_partner_image_list ? slide_partner_image_list.map((item,index)=>{

                                return (


                                    <SwiperSlide key={index} >
                                        <div className="about_doitac_box_img" key={index}>
                                            <img src={item}  alt='about'/>
                                        </div>
                                    </SwiperSlide>


                                )
                            }) : null
                            }

                        </Swiper>
                    </div>
                </div>
            </div>
            <div className="main_customer pb-4">
                <div  className=" title_main_about mb-4 pt-4 text-center">{textShow ? textShow.Client : ''}</div >
                <div className="container">
                    <div className="image_customer">
                        <div className="">
                            <div className="">
                                <div className="grid-item grid-item--width50 grid-item--height4">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/1.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height2 grid-item--width25">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/2.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height2 grid-item--width25">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/3.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height2 grid-item--width25">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/4.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height2 grid-item--width25">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/5.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height2">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/6.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height2">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/7.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height2">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/18.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height2">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/9.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height2">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/10.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height4">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/11.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height4">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/12.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height4">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/16.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height4">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/14.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--height4">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/15.jpg" alt="" />
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="mt-5">
                                <div className="grid-item grid-item--width33 grid-item--height3">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/1.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--width33 grid-item--height3">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/2.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--width33 grid-item--height3">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/3.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--width33 grid-item--height3">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/4.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--width33 grid-item--height3">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/5.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--width33 grid-item--height3">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/6.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--width33 grid-item--height3">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/7.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--width33 grid-item--height3">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/12.jpg" alt="" />
                                </div>
                                <div className="grid-item grid-item--width33 grid-item--height3">
                                    <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/9.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="image_customer_mb">
                        <Swiper
                            cssMode={true}
                            navigation={true}

                            breakpoints={{
                                "@0.00": {
                                slidesPerView: 1,
                                spaceBetween: 10,
                                },
                                "@0.65": {
                                slidesPerView: 2,
                                spaceBetween: 10,
                                },
                                "@0.75": {
                                slidesPerView: 3,
                                spaceBetween: 10,
                                },
                                "@1.00": {
                                slidesPerView: 4,
                                spaceBetween: 20,
                                },

                                "@1.50": {
                                slidesPerView: 4,
                                spaceBetween: 20,
                                },
                                "@1.75": {
                                slidesPerView: 4,
                                spaceBetween: 20,
                                },
                                "@2.0": {
                                slidesPerView: 4,
                                spaceBetween: 20,
                                },
                            }}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Navigation,Autoplay]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/1.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/2.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/3.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/4.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/5.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/6.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/7.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/9.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/10.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/11.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/12.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/14.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/15.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/16.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://vigomanager.com/app-assets/mobile/mau_web_3/18.jpg" alt="" />
                            </SwiperSlide>


                        </Swiper>
                    </div>
                </div>
            </div>
            <div className="main_youtube  pb-4">
                <div className="container">
                    <div className="text-center about_video_box">
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/hQmKOnxA-oQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      </div>
                </div>
            </div>

        </main>


    )
}
const mapStateToProps = state => ({
    slideImageListInfo: state.slideImageListInfo,
});
export default connect(mapStateToProps, actions)(Page);
