"use client"
import Link from 'next/link'
import { BASE_URL_API } from '../../../../redux/actions/type';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import * as actions from "../../../../redux/actions";
import { connect } from "react-redux";
import "../auth.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {useState} from "react";
function Login(props) {
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
    let route = useRouter();
    const [phone, setPhone] = useState('');
    const [phoneCode, setPhoneCode] = useState('vn');
    const handleLogin = async () => {

        let url_api = BASE_URL_API + "Balotour/Info/login"
        let fd = new FormData()
        if (phone == '') {
            Toast.fire({
                title: "Chưa nhập số điện thoại",
                icon: "error"
            })
            return false
        }
        // let phone_post = phone.replace(phoneCode, 0) chua biet lam
        let phone_post = phone.replace("84", 0)

        fd.append("phone", phone_post)
        fd.append("phone_code", phoneCode)
        axios.post(url_api, fd, {
            headers: {
                "x-api-key": "api_key",
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {

            if(response.data.check_user === true){
                Toast.fire({
                    title: "Tài khoản chưa đăng kí",
                    icon: "error"
                })
            }else{
                Toast.fire({
                    title: "Đăng nhập thành công",
                    icon: "success"
                })
                await localStorage.setItem('token', JSON.stringify(response.data.user_token))
                await props.getUserInfo()
                await props.fetchAddCartList()
                // window.location.replace('/')
                // history.back()
                window.location.replace('/')
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const keydownLogin = (event) => {
        if (event.keyCode === 13) {
            handleLogin()
        }
    }

    const changeInput = ({phone,country}) => {

        setPhone(phone)
        setPhoneCode(country.countryCode)
    }

    return (
        <main>
            <div className='main_login' style={{ backgroundImage: `url("https://namecard.nhanhtravel.com/app-assets/mobile/mau_web_4/%E6%B3%B3%E6%B1%A0%E5%85%A8%E6%99%AF_2880%E5%8E%8B%E7%BC%A9%E7%89%88.jpg")` }}>
                <div className='container'>
                    <div className='singn_loigin'>
                        <div>
                            <div className='login_item'>
                                <h2 className='title'>Đăng nhập</h2>
                                <div className='mb-3 text-small'>Đăng nhập tài khoản Nhanhtravel ngay!</div>
                                <div>
                                    <div className="phone_input mb-3">
                                        <PhoneInput
                                            country={phoneCode}
                                            onChange={(phone,country) => changeInput({ phone ,country})}
                                            onKeyDown={(event) => keydownLogin(event)}
                                        />
                                    </div>
                                    <button type='button' onClick={() => handleLogin()} className="btn btn-primary form-control mb-3">
                                        <span>Đăng nhập</span>
                                    </button>
                                </div>

                                <div className='bot-item-login'>
                                    <span>Bạn chưa có tài khoản?
                                        <Link href='/Auth/Register' className="text-primary">
                                        Đăng ký ngay!
                                        </Link>
                                    </span>
                                </div>
                            </div>

                            <div className='text-small-bot-pc'>
                                <div className='text-center text-white'>Bằng cách đăng ký hoặc đăng nhập, bạn đã hiểu và đồng ý với </div>
                                <div className='text-center text-white '>
                                    <a href="#" className='text-white text-small-bot-login'>Điều Khoản Sử Dụng Chung</a> và <a href="#" className='text-white text-small-bot-login'> Chính Sách Bảo Mật</a>  của Nhanhtravel.
                                </div>
                            </div>
                            
                            <div className='text-small-bot-mb'>
                                <div className='text-white'>
                                    Bằng cách đăng ký hoặc đăng nhập, bạn đã hiểu và đồng ý với
                                    <a href="#" className='text-white text-small-bot-login'> Điều Khoản Sử Dụng Chung</a> và <a href="#" className='text-white text-small-bot-login'> Chính Sách Bảo Mật</a>  của Nhanhtravel.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
const mapStateToProps = state => ({
});
export default connect(mapStateToProps, actions)(Login);