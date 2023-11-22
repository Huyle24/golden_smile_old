'use client'
import Slider from "react-slick";

function Banner() {
  const settings = {
    dots: true, // hiển thị chỉ số ảnh
    infinite: true,
    speed: 1000,
    slidesToShow: 1, //hiển thị số ảnh xuất hiện
    slidesToScroll: 1, // scoll từng ảnh
    autoplay: false, // ảnh tự chuyển động
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: false, // hiển thị hai đấu mũi tên điều hướng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 790,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  };
  const list = [
    {
      image: "https://nhanhtravel.com/wp-content/uploads/2023/09/avatar-3.png",
      name: "Chợ Lớn Tourist",
      date: "Mr. Nguyễn Ngọc Thái - Giám đốc",
      content:"Peego Travel hoạt động chủ yếu ở thị trường Thái Lan, tôi đã phải chật vật rất nhiều để quản lý cả 2 chi nhánh Thái Lan và Việt Nam. Từ khi áp dụng phần mềm Nhanh Travel cho công ty mình, tôi hoàn toàn có thể quản lý đội ngũ từ xa. Việc kinh doanh trở nên dễ dàng và hiệu quả.",
    },
    {
      image: "https://nhanhtravel.com/wp-content/uploads/2023/09/avatar.png",
      name: "Golden Smile Corporation",
      date: "Mr. Nguyễn Trần Hoàng Phương - Chủ tịch",
      content:"Từ khi sử dụng Nhanh Travel, tôi có nhiều thời gian hơn để ra ngoài gặp gỡ đối tác, khách hàng, xây dựng các mối quan hệ mới. Không còn bù đầu ở văn phòng để quản lý nhân viên. Quy trình làm việc của các bộ phận được phân chia rõ ràng, phù hợp. Tài liệu được lưu trữ rõ ràng, không cần hồ sơ giấy tờ thủ công rườm rà như trước.Cảm ơn Nhanh Travel !",
    },
    {
      image: "https://nhanhtravel.com/wp-content/uploads/2023/09/avatar-2.png",
      name: "Công ty TNHH Dịch vụ Premier Tour",
      date: "Ms. Thi Phương - Giám đốc",
      content:"Premier Tour đã áp dụng thành công phần mềm Nhanh Travel vào quy trình vận hành doanh nghiệp của mình. Việc sử dụng kết hợp 2 phiên bản Web và App giúp chúng tôi đơn giản hóa các đầu việc, gửi báo giá nhanh hơn, quản lý tour dễ dàng hơn, khách hàng hài lòng hơn. Xin cảm ơn Nhanh Travel !",
    },
    {
      image: "https://nhanhtravel.com/wp-content/uploads/2023/06/Screenshot_1.png",
      name: "Phú Quốc Today Travel",
      date: "Mr. Đường Văn Khôn - Tổng Giám đốc",
      content:"Nhanh Travel giúp chúng tôi có được một hệ thống vận hành doanh nghiệp bài bản chuyên nghiệp, rút ngắn thời gian làm việc của tất cả phòng ban.Giao việc đúng người, có deadline. Giúp tăng doanh thu và đạt hiệu quả cao.Chúng tôi đã có nhiều thời gian chăm sóc và hiểu khách hàng của mình hơn",
    },
  ];
  return (
    <div className="backgroundBanner shadow-lg mt-5">
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col col-6 customer_banner">
            <div className="text-center mb-5">
              <div className="Banner-Title">Khách hàng</div>
              <div className="Banner-Heading">Nói về chúng tôi</div>
            </div>
            <Slider {...settings} className="slick_slider_banner">
              {list.map((item) => (
                
                    <div className="text-center">
                      <div className="text-xanhlacay">
                        <i className="bi bi-star-fill mx-1"></i>
                        <i className="bi bi-star-fill mx-1"></i>
                        <i className="bi bi-star-fill mx-1"></i>
                        <i className="bi bi-star-fill mx-1"></i>
                        <i className="bi bi-star-fill mx-1"></i>
                      </div>
                      <div className="Banner-list-Content mb-3">
                        "{item.content}"
                      </div>
                      <div className="row">
                        <div className="col col-6 customer_tellme">
                              <img src={item.image} alt="" />
                        </div>
                        <div className="col col-6 Banner-list-Date mb-3">
                          <strong className="name_company">{item.name}</strong>
                            <div className="name_sir">{item.date}</div>
                        </div>
                      </div>
                    </div>
              ))}
            </Slider>
          </div>
          <div className="col col-6 banner_image">
            <div className="row pb-5 pt-5">
              <div className="col-6">
                <img
                  src="https://demo2.themelexus.com/bexper/wp-content/uploads/2023/07/about-images-9.jpg"
                  alt=""
                  className="img-tilted-left"
                />
              </div>
              <div className="col-6">
                <img
                  src="https://demo2.themelexus.com/bexper/wp-content/uploads/2023/07/about-images-8.jpg"
                  alt=""
                  className="img-tilted-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Banner;
