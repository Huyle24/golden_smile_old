import Link from "next/link";

export default function Intruct() {
    return (
        <div className="container main_showcustomer">
            <div className={'text-red text-center fw-bold fs-4'}> HƯỚNG DẪN ĐẶT TOUR</div>
            <p className={'my-4'} style={{lineHeight: '38px'}}>
                <span className={'text-red fw-bold '}> Bước 1:</span> Truy cập vào web của Golden Smile Travel
                <br/>
                Để đặt tour thì bạn vào web: <Link href={'https://goldensmile.vercel.app/'}
                                                   target={'_blank'}>https://goldensmile.vercel.app/</Link>
                <br/>
                Bạn sẽ thấy giao diện web đặt tour du lịch, chọn <b>công cụ tìm kiếm</b> như hình dưới đây:
                <img src={'https://goldensmiletravel.com/uploads/images/2023/02/02/1-1675304697.png'} alt=""/>
                <span className={'text-red fw-bold '}> Bước 2:</span> Tìm tour du lịch trọn gói:
                <br/>
                Trong khung tìm kiếm ở bên dưới, nếu bạn cần tìm tour trong nước, bạn hãy click vào “TÌM TOUR NƯỚC
                NGOÀI”. Sau đó, bạn chọn các thông tin như sau:
                <br/>
                <ul>
                    <li>· Điểm đến: Chọn địa điểm bạn muốn đến thăm.</li>
                    <li>· Chọn khoảng thời gian đi: Chọn khoảng thời gian bạn muốn đi tour</li>
                    <li>. Chọn xong các mục, ấn vào <b>TÌM KIẾM</b> để hệ thống tìm các tour du lịch bạn mong muốn.</li>
                </ul>
                Chọn xong các mục, ấn vào <b>TÌM KIẾM</b> để hệ thống tìm các tour du lịch bạn mong muốn.
                <img src={'https://goldensmiletravel.com/uploads/images/2023/02/02/2-1675304717.png'} alt=""/>
                Sau khi hệ thống tìm kiếm xong sẽ trả về kết quả một danh sách các tour du lịch cho bạn lựa chọn.
                <img src={'https://goldensmiletravel.com/uploads/images/2023/02/02/3-1675304735.png'} alt=""/>
                <span className={'text-red fw-bold '}> Bước 3:</span> Chọn và đặt tour du lịch:
                <br/>
                Bạn click vào tên của tour bạn muốn đi để xem chi tiết các thông tin như: <b>số chỗ còn nhận, lịch trình
                tour, chi tiết tour, thông tin chuyến bay, thông tin khách sạn và các lưu ý khác về tour</b>,…
                <br/>
                Sau khi tìm được tour ưng ý, click vào nút để đặt tour.
                <img src={'https://goldensmiletravel.com/uploads/images/2023/02/02/4-1675304751.png'} alt=""/>
                <span className={'text-red fw-bold '}> Bước 4:</span>Nhập thông tin đặt tour:
                <br/>
                Bạn điền đầy đủ thông tin như hình bên dưới. Chú ý các mục đánh dấu * là bắt buộc.
                <img src={"https://goldensmiletravel.com/uploads/images/2023/02/02/5-1675304769.png"} alt=""/>
                Sau khi điền đầy đủ thông tin bạn nhớ đọc kỹ điều khoản, quy tắc của Golden Smile Travel. Sau khi đã OK
                hết thì bạn tích vào tôi đồng ý rồi click vào <b>ĐẶT NGAY</b> để đăng ký tour đó.
                <br/>
                <img src={'https://goldensmiletravel.com/uploads/images/2023/02/02/6-1675304795.png'} alt=""/>
                <span className={'text-red fw-bold '}> Bước 5:</span> Golden Smile Travel xác nhận thông tin:
                <br/>
                Sau khi click vào <b>ĐẶT NGAY</b> Golden Smile Travel sẽ trả thông tin ở phía trên để thông báo cho Quý
                Khách
                đã đặt tour thành công hay không. Nếu chưa thì Quý khách vui lòng kiểm tra lại thông đã điền đủ thông
                tin chưa.
                <br/>
                Sau đó Golden Smile Travel sẽ liên hệ với Quý khách để xác nhận thông tin và hướng dẫn Quý khách các
                bước thanh toán.
                <br/>
                <span className={'text-red fw-bold '}> Bước 6:</span> Thanh toán
                <br/>
                Đây là bước cuối cùng để hoàn thành việc book tour trên Golden Smile Travel. Golden Smile Travel hỗ trợ
                rất nhiều hình thức thanh toán từ thanh toán tiền mặt, chuyển khoản, thanh toán bằng thẻ tín dụng,… Bạn
                chọn hình thức thanh toán nào đó phù hợp rồi thanh toán theo hướng dẫn của Golden Smile Travel.
                <br/>
                Sau khi thanh toán xong thì bạn chỉ chờ tới ngày khởi hành thôi. Nếu có bất cứ thắc mắc gì có thể liên
                hệ với nhân viên hỗ trợ của Golden Smile Travel (thông tin thường đính kèm theo trong nội dung email xác
                nhận).
                <br/>
                <span className={'text-red fw-bold '}> Lời kết:</span>
                <br/>
                Đó là tất cả những gì mình muốn chia sẻ cho bạn về kinh nghiệm đặt tour du lịch trên Golden Smile
                Travel. Nhớ chia sẻ cho bạn bè để họ cũng biết cách đặt những tour du lịch trên Golden Smile Travel và
                bạn cũng nhớ lưu lại trang này để lần sau đi du lịch đâu đó thì vào đây để kiếm tour. Chúc bạn và gia
                đình luôn có những chuyến đi vui vẻ!


            </p>
        </div>
    )
}