import { LockOutlined, TwitterOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { signinCyberbugAction } from '../../../redux/actions/CyberBugsAction';


function LoginCyberBugs(props) {


    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <form className="container" style={{ height: window.innerHeight }} onSubmit={handleSubmit}>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }} >
                <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>Login CyberBugs</h3>

                <div className="d-flex mt-3" >
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                </div>
                <div className="text-danger">
                    {errors.email}
                </div>
                <div className="d-flex mt-3">
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="password" size="large" placeholder="password" prefix={<LockOutlined />} />
                </div>
                <div className="text-danger">
                    {errors.password}
                </div>
                <Button htmlType="submit" size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5">Login</Button>


                <div className="social mt-3 d-flex">
                    <Button style={{ backgroundColor: 'rgb(59,89,152)' }} shape="circle" size={"large"}>
                        <span className="font-weight-bold" style={{ color: '#fff' }} >F</span>
                    </Button>
                    <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined />} size={"large"}>

                    </Button>
                </div>
            </div>

        </form>
    )
}

const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is require!').email('email is invalid'),
        password: Yup.string().min(6, 'password min 6 characters').max(32, 'password less than 32 characters')
    }),
    handleSubmit: ({ email, password }, { props, setSubmitting }) => {
        console.log(props)
        props.dispatch(signinCyberbugAction(email, password))

    },

    displayName: 'BasicForm',
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik)
