import { LoginFormDTO } from '@/api/dto/auth.dto'
import { Button, Form, Input, notification } from 'antd'
import React from 'react'
import styles from './Auth.module.scss'
import Api from '@/api';
import { setCookie } from 'nookies';

export const LoginForm:React.FC = () => {
    const onSubmit = async (values: LoginFormDTO) =>{
        try {
            const {token} = await Api.login(values);

            notification.success({
                message:"Login success",
                description:"You have successfully logged in",
                duration:2
            })

            setCookie(null, "token", token, {path:"/"})
            location.href = '/dashboard';

        } catch (error) {
            console.warn('Login', error)
            notification.error({
                message:"Login failed",
                description:"Invalid password or email",
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
            <Input
                type="email"
            />
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
            <Button type="primary" htmlType="submit">Login</Button>
        </Form>
    </div>
  )
}
