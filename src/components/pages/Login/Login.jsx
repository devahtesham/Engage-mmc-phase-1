import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, InputGroup } from "react-bootstrap"
import {
    successNotify,
    errorNotify, promiseNotify
} from "../../../Toastify/Toastify"
import "./Login.css"
import axios from 'axios';
import { useState } from 'react';
import Loader from '../../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import CompanyLogo from "../../../assets/img/logo.png"
import { BiSolidUser } from "react-icons/bi"
import { RiLockPasswordFill } from "react-icons/ri"
import { BiSolidShow } from "react-icons/bi"      // show password
import { BiSolidHide } from "react-icons/bi"      // hide password



const Login = () => {
    const navigate = useNavigate()
    const [isPasswordShow,setIsPasswordShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // login handler
    const loginHandler = async (e) => {
        e.preventDefault()
        const { email, password } = formData
        if (!email || !password && password.length < 8) {
            errorNotify('Invalid Details ❗')
            return
        } else {
            console.log(email, password);
            setIsLoading(true)
            axios.post('https://sea-turtle-app-9x3dp.ondigitalocean.app/auth/login',
                {
                    'Email': email,
                    'Password': password
                },
                {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then((response) => {
                    console.log(response);
                    setIsLoading(false)
                    // save token in local storage
                    localStorage.setItem("token", response.data.AuthToken)
                    navigate("/home/map")
                    successNotify("Login Successfully ! 🔓")
                    setFormData({
                        email: "",
                        password: ""
                    })
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false)
                    errorNotify(err.response.data.message)
                })
        }
    }

    // show hide password
    const passwordShowHideHandler = ()=>{
        setIsPasswordShow(!isPasswordShow)
    }
    return (
        <>
            {
                isLoading ? <Loader /> : (
                    <Container fluid className='h-100 d-flex flex-column justify-content-center'>
                        <Row className='login-section'>
                            <Col xl={4} lg={5} md={6} >
                                <div className="text- dark login-form-container">
                                    <div>
                                        <div className="company-logo d-flex flex-column align-items-center">
                                            <div className='mb-2'>
                                                <img src={CompanyLogo} alt="logo" />
                                            </div>
                                            <span className='fw-bolder company-name'>MAINTENANCE</span>
                                            <span className='fw-bolder company-name'>MANAGEMENT SYSTEM</span>
                                        </div>

                                    </div>


                                    <Form className='form login-form' onSubmit={loginHandler}>
                                        <div className='form-heading mb-3'>
                                            <h2 className='fw-700 m-0'>Welcome Back !</h2>
                                        </div>
                                        <Form.Group className="mb-3 icon-input" controlId="formBasicEmail">
                                            <BiSolidUser size={20} color='#E8090C' />
                                            <Form.Control type="email" placeholder="Username or email" name='email' value={formData.email} onChange={handleChange} />
                                        </Form.Group>

                                        <Form.Group className="mb-3 icon-input" controlId="formBasicPassword">
                                            <RiLockPasswordFill size={20} color='#E8090C' />
                                            {
                                                !isPasswordShow ? <BiSolidHide onClick={passwordShowHideHandler} size={20} color='#E8090C' className='password-show-hide'/> : <BiSolidShow onClick={passwordShowHideHandler} size={20} color='#E8090C' className='password-show-hide'/>
                                            }
                                            

                                            <Form.Control type={isPasswordShow ? "text" : "password" } placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
                                        </Form.Group>
                                        <div className='login-form-footer mb-3 d-flex justify-content-between align-align-items-center d-none'>
                                            <div className='remember-pass'>
                                                {/* <label class="my-checkbox-container">Remember Password
                                                    <input type="checkbox" style={{display:'none'}} />
                                                    <span class="checkmark"></span>
                                                </label> */}
                                                <input type="checkbox" id="rememberPassword" name="rememberPassword" value="rememberPassword" />
                                                <label for="rememberPassword" className=''>Remember Password</label>
                                            </div>
                                            <div className='forgot-pass'>
                                                <span>Forgot Password</span>
                                            </div>

                                        </div>
                                        <Button variant="" type="submit" className='text-center w-100 bg-main-clr text-white fw-700'>
                                            Login
                                        </Button>
                                    </Form>

                                </div>
                            </Col>
                            <Col xl={8} lg={7} md={6} className='pe-md-0 d-sm-block d-none'  >
                                <div className='login-form-bg'></div>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        </>
    );
}

export default Login;