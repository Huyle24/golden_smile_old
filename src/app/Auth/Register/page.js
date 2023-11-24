"use client"
import {Button, Container, Form} from "react-bootstrap";
import Link from 'next/link'
import { BASE_URL_API } from '../../../../redux/actions/type';
import axios from 'axios';
import "../auth.css";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import * as actions from "../../../../redux/actions";
import { connect } from "react-redux";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {useState} from "react";

function Register(props){
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneCode, setPhoneCode] = useState('vn');

    const handleRegister = async () => {
        let url_api = BASE_URL_API + "Balotour/Info/auth"
        let fd = new FormData()
        if (name == '') {
            Toast.fire({
                title: "Chưa nhập tên",
                icon: "error"
            })
            return false
        }
        if (email == '') {
            Toast.fire({
                title: "Chưa nhập email",
                icon: "error"
            })
            return false
        }
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
        fd.append("name", name)
        fd.append("email", email)

        axios.post(url_api, fd, {
            headers: {
                "x-api-key": "api_key",
                "Content-Type": "multipart/form-data"
            }
        }).then(async function (response) {
            console.log(response);
            if(response.data.check_user == true){
                Toast.fire({
                    title: "Tài khoản đã được đăng ký",
                    icon: "error"
                })
            }else{
                Toast.fire({
                    title: "Đăng ký tài khoản thành công",
                    icon: "success"
                })
                await localStorage.setItem('token', JSON.stringify(response.data.user_token))
                window.location.replace('/')
                // await props.getUserInfo()
                // await props.fetchAddCartList()
                // history.back()
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    const keydownLogin = (event) => {

        if (event.keyCode === 13) {

            handleRegister()
        }
    }
    const changeInput = ({ phone, country }) => {

        setPhone(phone)
        setPhoneCode(country.countryCode)
    }
    const changeName = (e)=>{
        setName(e.target.value)
    }
    const changeEmail = (e)=>{
        setEmail(e.target.value)
    }

    return (
        <div className="bg_login">
            <Container className="page_login">
                <div>
                    <div className="form_login">
                        <span className="color-text fw-bold">Đăng ký</span>
                        <Form className="mt-4">
                                 <div className='mb-3'>
                                    <label>Tên khách hàng</label>
                                    <input type='text' className='form-control' onChange={(e)=>changeName(e)} />
                                </div>
                                <div className='mb-3'>
                                    <label>Email</label>
                                    <input type='text' className='form-control' onChange={(e)=>changeEmail(e)}/>
                                </div>
                                <div className="phone_input mb-3">
                                    <label>SĐT</label>
                                    <PhoneInput

                                        country={phoneCode}
                                        onChange={(phone, country) => changeInput({ phone, country })}
                                        onKeyDown={(event) => keydownLogin(event)}
                                    />
                                </div>
                                <button type='button' onClick={() => handleRegister()} className="btn btn-primary form-control mb-3">
                                    <span>Đăng ký</span>
                                </button>
                        </Form>
                    </div>

                </div>

            </Container>

        </div>
    )
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
});
export default connect(mapStateToProps, actions)(Register);
