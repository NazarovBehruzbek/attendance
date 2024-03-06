import React from "react";
import "./PasswordChange.css"
import { Button, Form, Input } from 'antd';
function PasswordChange(){
    return(
        <section>
            <div className="form">
                <h1>Parolni yangilash</h1>
                <Form
                    name="wrap"
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600 }}
                    layout="vertical"
                >
                    <Form.Item label="Parol" name="password" rules={[{ required: true, message: 'Yangi parolni kiriting!' }]}>
                        <Input placeholder="Yangi parolni yozing!"/>
                    </Form.Item>
                    <Form.Item label="Parolni qayta tering" name="password" rules={[{ required: true,message: 'Parolni qayta kiriting!' }]}>
                        <Input placeholder="Parolni qayta yozing!" />
                    </Form.Item>

                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit">
                            Saqlash
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    )
}
export default PasswordChange;