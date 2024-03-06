import {Form, Input, Button, message} from 'antd';
import './login.css';
import { signin } from "../server/auth/Auth";
import { useNavigate } from 'react-router-dom';
import { setLocalStorage } from "../utilits";
import { tokenKey } from "../constants/Constants";

const Login = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        signin(values).then(res => {
            if (res && res.data && res.data.jwt_token) {
                setLocalStorage(tokenKey, res.data.jwt_token);
                message.success("Muvaffaqiyatli o'tildi")
                navigate('/dashboard');
            } else {
                message.error("Login yoki parol noto'g'ri");
            }
        }).catch(res => {
            message.error("Login yoki parol noto'g'ri");
        });
    };

    return (
        <Form
            className="login-form"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Login"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Parol"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Kirish
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Login;
