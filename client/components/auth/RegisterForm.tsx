import { RegisterFormDTO } from '@/api/dto/auth.dto'
import { Button, Form, Input, notification } from 'antd'
import React from 'react'
import Api from '@/api';
import styles from './Auth.module.scss'
import { setCookie } from 'nookies';

export const RegisterForm:React.FC = ()  => {
    const onSubmit = async (values:RegisterFormDTO ) =>{
        try {
            const {token} = await Api.register(values);

            setCookie(null, "token", token, {path:"/"})

            notification.success({
                message:"Register success",
                description:"You have successfully registered",
                duration:2
            })
            location.href = '/dashboard';
        } catch (error) {
            console.warn('Register', error);

            notification.error({
                message:"Register failed",
                description:"Something went wrong",
                duration:2
            })
        }
    }

  return (
    <div className={styles.formBlock}>

    <Form
    name="basic"
    labelCol={{ span: 8 }}
    onFinish = {onSubmit}
    >
        <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
    label="Full Name"
    name="fullName"
    rules={[{ required: true, message: 'Please enter your full name!' }]}
    >
        <Input/>
    </Form.Item>

    <Form.Item
    label="Password"
    name="password"
    rules={[{ required: true, message: 'Please enter password!' }]}
    >
        <Input.Password
        placeholder='Password'
        />
    </Form.Item>
    <Button type="primary" htmlType="submit">Register</Button>
    </Form>
    </div>
  )
}

export default RegisterForm