import {Container, Row, Col, Form, Button} from "react-bootstrap";
import {FaMailBulk, FaPhoneAlt, FaRegMoneyBillAlt} from "react-icons/fa";
import {useEffect, useState} from "react";
import * as actionType from "../../../../redux/actions/type";
import axios from "axios";
import * as GlobalJs from "../../../../js/global";
import {connect} from "react-redux";
import * as actions from "../../../../redux/actions";
import {useRouter, useSearchParams} from "next/navigation";
import Swal from "sweetalert2";
import {BASE_URL_API, GET_LANG_CODE, GET_TOKEN} from "../../../../redux/actions/type";
import {GET_LANG_ko, GET_LANG_vi} from "../../../../js/lang";
function PaymentMethod(props) {
  const [dataDetail,setDataDetail] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [agree, setAgree] = useState(false);
  const handleInputChange = (index) => {
    setActiveIndex(index);
  };

  function createMarkup(c) {
    return {__html: c};
  }
  const searchParams = useSearchParams()
  useEffect(() => {
    props.fetchTourDetailW3(searchParams.get('id'))
  },[searchParams.get('id')])
  let timeline_detail_info = props.tourDetailInfoW3 && props.tourDetailInfoW3.isLoading === false ? props.tourDetailInfoW3.data : '';

  let listCartItem = props ? props.getToCart : '';
  useEffect(()=> {
    props.getToCartAction();
  },[])
  const [listCart, setListCart] = useState([])
  const [tot, setTot] = useState(0)
  useEffect(()=> {
    setListCart(listCartItem)
  },[listCartItem])

  useEffect(() => {
    let totalPrice = listCart.reduce(function (accumulator, item) {
      return accumulator + parseInt(item.total_price) ;
    }, 0);
    setTot(totalPrice);
  }, [listCart]);

  let [dataCartList, setdataCartList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [userInput, setUserInput] = useState([]);
  const [emailInput, setEmailInput] = useState([]);
  const [phoneInput, setPhoneInput] = useState([]);
  const [nationalityNameInput, setNationalityNameInput] = useState([]);
  const [userMore, setUserMore] = useState([]);
  const [textShow, setTextShow] = useState('');

  let router = useRouter();
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  const get_user_more =async () => {

    let user_more = await localStorage.getItem("user_more");
    if(user_more){
      setUserMore(JSON.parse(user_more))
    }

  }


  const [allTotal, setallTotal] = useState(0);

  useEffect(() => {
    props.fetchAddCartDetail(1)
    get_user_more()
    getLangText()
  }, [])

  useEffect(() => {
    props.fetchSetupAddressDetail(userMore.id_setup_address)
  }, [userMore.id_setup_address])


  const getLangText = async () => {
    let lang_code = await GET_LANG_CODE();
    let lang_text ={}
    switch (JSON.parse(lang_code)) {
      case 'vi':
        lang_text = GET_LANG_vi().payment_method
        break;
      default:
        lang_text = GET_LANG_ko().payment_method
        break;
    }
    setTextShow(lang_text)
  }



  let add_cart_list = props.addCartDetailInfo.data && props.addCartDetailInfo.isLoading == false && props.addCartDetailInfo.data.cart ? props.addCartDetailInfo.data.cart : '';
  let payment_method_list = props.addCartDetailInfo.data && props.addCartDetailInfo.isLoading == false ? props.addCartDetailInfo.data.payment_method_list : '';
  let user_data = props.userInfo.data && props.userInfo.isLoading == false ? props.userInfo.data : '';

  let setup_address_detail = props.setupAddressDetailInfo.data && props.setupAddressDetailInfo.isLoading == false ? props.setupAddressDetailInfo.data : '';
  // let user_more =  localStorage.getItem("user_more");
  // console.log(user_more);

  useEffect(() => {
    setdataCartList(add_cart_list)

  }, [add_cart_list])


  useEffect(() => {
    if (user_data) {
      setUserInput(user_data.fullname)
      setEmailInput(user_data.email)
      setPhoneInput(user_data.phone)
      setNationalityNameInput(user_data.nationality_name)

    }

  }, [user_data])




  const pay_cart = async () => {


    if (paymentMethod == '') {
        Toast.fire({
            title: "Chưa chọn phương thức thanh toán",
            icon: "error"
        })
        return false
    }
    if (agree == '') {
      Toast.fire({
        title: "Quý khách cần chọn Điều khoản đăng ký online",
        icon: "error"
      })
      return false
    }

    let url_api = BASE_URL_API + "Balotour/Cart/add_golf_package_tour"
    let token = await GET_TOKEN();
    let user_more = await localStorage.getItem("user_more");

    let fd = new FormData()

    fd.append("tour_arr", listCart ? JSON.stringify(listCart) : '')
    // fd.append("price_tour_total", tot ? tot : '')
    fd.append("total_bill", tot ? tot : '')
    fd.append("payment_method_id", paymentMethod ? paymentMethod : '')
    fd.append("user_more", user_more ? user_more : '')
    await axios.post(url_api, fd, {
      headers: {
        "x-api-key": "api_key",
        'USER-TOKEN': JSON.parse(token),
        "Content-Type": "multipart/form-data"
      }
    }).then(async function (response) {
      console.log(response);
      Toast.fire({
        title: "Thanh toán thành công",
        icon: "success"
      })
      // window.location.replace(BASE_URL + 'ViewVoucher?code=' + response.data.data.code);

      // router.push('/cart/order_view',query: { permalink: "" + item.permalink + "" },);

      // router.push({
      //     pathname: '/Cartt/ShowCustomerInfo',
      //     query: { order_code: response.data.data.code },
      // })
      router.push('/CartBackup/ShowCustomerInfo?order_code=' + response.data.data.code)

    })
        .catch(function (error) {
          console.log(error);
        });

  };
  return (
    <Container  className="mt-3 mb-4">
      <span className="tour_detail_title">Thanh Toán</span>
      <div className="mt-3">
        <span className="text-700">Các hình thức thanh toán</span>
        <Row className="mt-2">
          <Col xl={8} className="mb-4">
            <Row className="mt-2">
              {payment_method_list ? (payment_method_list.map((item,index) => (
                  <Col lg={2} xs={6} key={index}>
                    <div className={`payments d-flex flex-column align-items-center ${index === activeIndex ? 'active' : ''}`}>
                      <div className="icon-payment">
                        <img src={item.img}  alt="tienmat"/>
                      </div>
                      <span>{item.name}</span>
                      <input name="ckb" type="radio" className="momo-payment" value={item.id} checked={index === activeIndex} onChange={() => handleInputChange(index)} onClick={(e) => setPaymentMethod(e.target.value)}/>
                    </div>
                  </Col>
              ))) : ''}

            </Row>
            <div className="mt-4">
              <span className="text-700">
                Điều khoản bắt buộc khi đăng ký online
              </span>
              <div className="term_content mt-3">
                <div className="mb-3"><strong>Chính sách hủy</strong><p>Từ ngày chuyển khoản
                  thanh toán đến trước 8 ngày khởi hành chịu phí 20% tổng đơn hàng.</p>
                  <p>Từ 7 đến trước 2 ngày khởi hành chịu phí 50% tổng đơn hàng.</p>
                  <p>Trước ngày khởi hành 1 ngày chịu phí 100% tổng đơn hàng.</p>
                  <p>Hủy ngay ngày khởi hành, không tham gia tour chịu phí hủy 100% tổng đơn
                    hàng.</p>
                  <p>** Nếu chuyến đi bị hủy do thiên tai,thời tiết, điều kiện bất khả kháng
                    sẽ hoàn 100%</p>
                  <p>&nbsp;</p>
                  <p>Balotour với tư cách là đại lý du lịch đặt các dịch vụ như vé máy bay,
                    tour du lịch…nếu lịch trình có thay đổi và điều chỉnh thời gian do tình
                    hình thời tiết, thiên tai, nội chiến, điều kiện hàng không… thì chúng
                    tôi cam kết sẽ cố gắng giải quyết mọi trường hợp chậm trễ không theo
                    lịch trình dự kiến cho quý khách hàng nhưng không có trách nhiệm bồi
                    thường.</p></div>
                <div className="mb-3"><strong>Chính sách thanh toán</strong><p>Sau khi đăng ký
                  tour, Quý khách đặt cọc 50%.</p>
                  <p>Phần còn lại vui lòng thanh toán trước 07 ngày khởi hành.</p>
                  <p>Quý khách đăng ký tour trong vòng 7 ngày so với ngày khởi hành, vui lòng
                    thanh toán toàn bộ tiền tour.</p></div>
                <div className="mb-3"><strong>Chính sách trẻ em</strong><p>Miễn phí cho trẻ em 4
                  tuổi, trẻ em từ 5 đến 7 tuổi tính 75% giá của người lớn, còn từ 8 tuổi trở
                  lên thì tính theo giá của người lớn.</p></div>

              </div>
              <Form>
                <Form.Check
                  inline
                  label="Tôi đồng ý với các điều kiện trên"
                  name="group1"
                  type="checkbox"
                  id="checkbox1"
                  className="text-primary"
                  onChange={() => setAgree(!agree)}
                />
              </Form>
            </div>
          </Col>

          <Col xl={4}>
            <div>
                    <div>
                      <span className="text-primary">Quý khách cần hỗ trợ?</span>
                      <div className="mt-2">
                        <div className="d-flex justify-content-between">
                          <Button className="support_btn"><FaPhoneAlt className="me-2"/>Gọi miễn phí qua internet</Button>
                          <Button className="support_btn bg-white text-black boder-0 rounded-end"><FaMailBulk className="me-2"/>Gửi yêu cầu hỗ trợ ngay</Button>
                        </div>
                      </div>
                    </div>
                    <div className="border border-dark p-3 mt-4">
                      <span className="text-700">Tóm tắt đơn hàng</span>
                      <div>
                        {/*<span className="color-text fw-bold">Tour trọn gói <span className="text-primary fs-6">(9 khách)</span></span>*/}
                        {listCart ? (listCart.map((item,index) => (
                            <Row className="my-2" key={index}>
                              <Col lg="3">
                                <img src={item.image ? item.image[0] : ''} className="w-100 rounded h-100 object-fit-cover"/>
                              </Col>
                              <Col lg="9">
                                <span className="title_booking color-text fw-bold">{item.name}</span>
                              </Col>
                              <Col lg={{span: 9, offset: 3}}>
                                <div className=" fw-bold color-text">Số lượng : {item.adult} người lớn, {item.child} trẻ em</div>
                              </Col>
                              <Col lg={12}>
                                <div className="text-end mt-2">
                                  <span className="text-danger fw-bold">{GlobalJs.format_currency(item.total_price)}đ</span>
                                </div>
                              </Col>
                            </Row>
                        ))): ''}
                        <div className="d-flex justify-content-between border-top pt-2">
                          <span className="fw-bold color-text fs-5">Tổng Cộng:</span>
                          <span className="fw-bold text-danger fs-5">{GlobalJs.format_currency(tot)}đ</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button className="w-100 btn-danger py-2 mt-3" onClick={() => pay_cart()}>THANH TOÁN NGAY</Button>
                    </div>
                  </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  tourDetailInfoW3: state.tourDetailInfoW3,
  getToCart: state.getToCart,
  userInfo: state.userInfo,
  addCartDetailInfo: state.addCartDetailInfo,
  setupAddressDetailInfo:state.setupAddressDetailInfo,
});
export default connect(mapStateToProps, actions)(PaymentMethod);
