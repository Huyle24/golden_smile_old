import { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";

export default function ConfirmCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [checkTT, setCheckTT] = useState(false);
  
  const handleCheck = () => setCheckTT(!checkTT);
  
  return (
    <Col lg="4">
      <div className="p-4 border rounded">
        <h5 className="fw-bold text-danger border-bottom pb-3">
          PHIẾU XÁC NHẬN BOOKING
        </h5>
        <div className="border-bottom pb-3">
          <p className="text-color-primary">
            Phú Quốc: VinWonders - Vinpearl Safari - Hòn Thơm Nature Park - Cáp
            Treo Vượt Biển - Công Viên Nước Aquatopia
          </p>
          <span className="color-text">Số booking: </span>
          <span className="fw-bold text-danger">230821244788</span>
        </div>
        <Row>
          <Col lg="4" className="my-3">
            <span className="text-color-primary">Mã tour</span>
          </Col>
          <Col lg="8" className="my-3 text-end">
            <span className="color-text">NDSGN879-097-230823VU-D</span>
          </Col>
          <Col lg="4" className="mb-3">
            <span className="text-color-primary">Hành trình</span>
          </Col>
          <Col lg="8" className="text-end">
            <span className="color-text">HCM - Phu Quoc - HCM</span>
          </Col>
          <Col lg="4" className="mb-3">
            <span className="text-color-primary">Ngày đi</span>
          </Col>
          <Col lg="8" className="text-end">
            <span className="color-text">23/08/2023</span>
          </Col>
          <Col lg="4" className="mb-3">
            <span className="text-color-primary">Ngày về</span>
          </Col>
          <Col lg="8" className="text-end">
            <span className="color-text">25/08/2023</span>
          </Col>
          <Col lg="4" className="mb-3">
            <span className="text-color-primary">Nơi khởi hành</span>
          </Col>
          <Col lg="8" className="text-end">
            <span className="color-text">TP. Hồ Chí Minh</span>
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <div className="img_prcode">
            <img
              src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://travel.com.vn/du-lich/track-booking-no-230821244788/tra-cuu-booking.aspx?utm_source=BookingSearch%26utm_medium=referral%26utm_campaign=qrcode&choe=UTF-8"
              className="w-100"
            />
          </div>
        </div>
        <div>
          <p className="color-text">
            Để xem thông tin chương trình tour mới nhất Quý khách có thể dùng
            điện thoại để quét mã QR bên cạnh để truy cập vào website.
          </p>
          <p className="color-text">
            Để cài phần mềm quét mã QR Code quý khách có thể tìm trong kho ứng
            dụng của điện thoại với từ khóa sau: QRCode Scanner, QRCode
            Reader,..
          </p>
        </div>
        <Button className="bg-danger w-100 border-0" onClick={handleShow}>
          Thanh toán
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>XÁC NHẬN THANH TOÁN ONLINE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check
              type="checkbox"
              id="check_xacnhan"
              label="Tôi đã đọc và hiểu rõ các nội dung sau"
              onChange={handleCheck}
            />
          </Form>
          {
            checkTT ? <div className="d-flex justify-content-center">
            <Button className="me-2 bg-danger border-0" >Thanh toán</Button>
            <Button className="bg-warning border-0">Hướng dẫn</Button>
            </div> : null
          }
          
          <div style={{height: '400px', overflow: 'auto'}} className="color-text">
            Nhanhtravel sẽ xuất hóa đơn GTGT theo đúng quy định hiện hành trong
            vòng 7 ngày làm việc sau khi tour kết thúc. Sau thời gian trên
            Nhanhtravel sẽ từ chối xuất hóa đơn cho khách hàng và tiến hành xuất
            hóa đơn khách lẻ không lấy hóa đơn. Cam kết đã biết và hiểu rõ tour
            giảm giá khi đặt và thanh toán trực tuyến : không hoàn, không hủy,
            không đổi hành trình. Cam kết đã hiểu rõ và đồng ý với các nội dung
            liên quan đến chương trình tour và điều kiện bán tour như sau : 1.
            Đồng ý với toàn bộ Nội dung quy định trong Điều kiện bán vé các
            chương trình du lịch trong nước (Vé du lịch) kèm theo. 2. Đồng ý giá
            tour ngay thời điểm đăng ký và biết có nhiều mức giá trên một chương
            trình tour. Những chi phí bao gồm và không bao gồm trong chương
            trình. 3. Dịch vụ phòng khách sạn có thể xảy ra trường hợp phòng
            không cạnh nhau, phòng không cùng tầng cho cả gia đình, loại phòng
            một giường đôi/ hai giường đơn không theo yêu cầu,... tùy theo điều
            kiện thực tế của từng đối tác khách sạn. Nhanhtravel sẽ cố gắng hỗ trợ
            thương lượng với đối tác để sắp xếp phòng phù hợp nhất. 4. Giờ bay
            và chương trình có thể linh hoạt thay đổi theo điều kiện thực tế của
            hãng Hàng Không. Trường hợp chuyến bay bị hủy, hoãn, thay đổi chuyến
            không thuộc trách nhiệm của Nhanhtravel. Tùy vào tình hình thực tế,
            chương trình và điểm tham quan có thể linh động thay đổi thứ tự các
            điểm phù hợp điều kiện giờ bay và thời tiết thực tế. Nhanhtravel có
            trách nhiệm liên lạc với hãng Hàng Không và thông tin sớm nhất cho
            khách hàng. 5. Đã cung cấp tên chính xác đầy đủ trên CMND/ Hộ
            chiếu/Giấy khai sinh (trẻ em dưới 14 tuổi). Khách hàng chịu trách
            nhiệm hoàn toàn đối với các vấn đề xảy ra do việc cung cấp sai thông
            tin. Quý khách khi đăng ký cung cấp tên theo giấy tờ tùy thân nào,
            khi đi tour phải mang theo giấy tờ tùy thân đó. 6. Quy định giấy tờ
            tuỳ thân khi đi tour: Đối với Khách Quốc tịch Việt Nam: Khi đi tour
            Trẻ em từ 14 tuổi trở lên và người lớn cần đem theo CMND/Hộ chiếu
            bản chính còn hạn sử dụng, hình ảnh rõ (CMND có thời hạn sử dụng
            không quá 15 năm, tính từ ngày cấp)/ Giấy khai sinh bản chính (trẻ
            em dưới 14 tuổi). Trường hợp trẻ em đủ 14 tuổi chưa có CMND hoặc Hộ
            Chiếu thì Quý khách phải làm giấy xác nhận nhân thân tại chính quyền
            địa phương nơi lưu trú theo mẫu quy định. Khách Nước ngoài/Việt
            Kiều: Khi đi tour phải mang theo đầy đủ Hộ Chiếu bản chính còn hạn
            sử dụng hoặc thẻ xanh kèm theo Visa và giấy tái xuất nhập Việt Nam.
            7. Quý khách dưới 18 tuổi phải có Bố/Mẹ hoặc người nhà trên 18 tuổi
            đi cùng. Trường hợp quý khách dưới 18 tuổi đi cùng người thân thì Bố
            và Mẹ phải ủy quyền (có xác nhận của chính quyền địa phương) cho
            người thân. 8. Hướng dẫn viên trong tour chỉ thuyết minh bằng tiếng
            Việt, đặt ăn theo thực đơn khách Việt,… 9. Nhanhtravel sẽ không chịu
            trách nhiệm bảo đảm các điểm tham quan trong trường hợp: Các điểm
            tham quan đóng cửa/ sửa chữa/ bảo trì hoặc xảy ra thiên tai: bão
            lụt, hạn hán, động đất, dịch bệnh…Sự cố về an ninh: khủng bố, biểu
            tình. Sự cố về hàng không: trục trặc kỹ thuật, an ninh, dời, hủy,
            hoãn chuyến bay và các sự kiện bất khả kháng kháng theo quy định
            pháp luật. Trường hợp trên xảy ra, Nhanhtravel sẽ xem xét để hoàn trả
            chi phí không tham quan cho khách trong điều kiện có thể (sau khi đã
            trừ lại các dịch vụ đã thực hiện….và không chịu trách nhiệm bồi
            thường thêm bất kỳ chi phí nào khác).Trường hợp hủy toàn bộ chuyến
            đi với các lý do bất khả kháng trên, thời gian hoàn tiền dịch vụ sẽ
            được hoàn tất trong vòng 60 – 90 ngày phụ thuộc điều kiện các đối
            tác cung ứng dịch vụ. 10. Cam kết không tách đoàn trong suốt quá
            trình tham quan cùng Nhanhtravel.
          </div>
        </Modal.Body>
      </Modal>
    </Col>
  );
}
