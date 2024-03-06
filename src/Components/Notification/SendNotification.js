import React, {useState} from "react";
import {Button, Col, Form, Input, message, Modal, Radio, Row, Switch, Table, TimePicker} from "antd";
import TextArea from "antd/es/input/TextArea";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

function SendNotification() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState([]);
    const [form] = Form.useForm();
    const columns = [
        {
            title: 'Barchasi',
            dataIndex: 'all',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },

    ];
    const data = [
        {
            key: 1,
            name: (<div>
                <img style={{width: '35px',float:'left'}} src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt=""/>
                <span style={{marginLeft:'10px',marginTop:'15px'}}>Nazarov Behruz</span>
            </div>),
        },
        {
            key: 2,
            name: 'sghkho iyiupi',

        },
        {
            key: 3,
            name: 'Joe Black',
        },
    ];
    const columns1 = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Sarlavha',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Xabar matni',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Vaqt',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Holat',
            dataIndex: 'condition',
            key: 'condition',
        },
        {
            title: 'Harakatlar',
            dataIndex: 'action',
            key: 'action',
        }
    ];
    const data1 = [
        {
            number: '1',
            title: 'John Brown',
            message: 'Hurmatli foydalanuvchilar iltimos ishdan ketishdan avval statusni chiqishga o\'zgartiring',
            time: '12:00',
            action: (
                <div>
            <span onClick={() => editModal()} style={{color: 'blue', fontSize: '22px', cursor: 'pointer'}}>
                <EditOutlined/>
            </span>
                    <span onClick={() => deleteUser()} style={{color: 'red', fontSize: '22px', cursor: 'pointer'}}>
                <DeleteOutlined/>
            </span>
                </div>
            )
        },
    ];
    const showModal = () => {
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = () => {
        form.submit();
    };
    const editModal = (item) => {
        setIsModalOpen(true);
        form.setFieldsValue({
            name: item.username,
            ip: item.ip,
            active: item.active,
        });
        form.id = item.id;
    };

    const deleteUser = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            icon: <ExclamationCircleOutlined/>,
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                axios.delete(`/api/user/deleteUser/${id}`)
                    .then(res => {
                        if (res && res.data.success) {
                            message.success("User deleted successfully");
                            const updateMessage = message.filter(user => user.id !== id);
                            setMessage(updateMessage);
                        } else {
                            message.error("Failed to delete user");
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting user:", error);
                        message.error("An error occurred while deleting user");
                    });
            },
            onCancel() {
                console.log("Deletion canceled");
            },
        });
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };
    const format = 'HH:mm';
    return (
        <section>
            <h3>Bildirishnomalar</h3>
            <Row>
                <Col md={10}>
                    <div style={{width: '90%'}}>
                        <Table
                            rowSelection={{
                                type: "checkbox",
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={data}
                        />
                    </div>
                </Col>
                <Col md={14}>
                    <Form
                        name="wrap"
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{flex: 1}}
                        colon={false}
                        layout="vertical"
                    >
                        <Form.Item label="Sarlavha" name="name" rules={[{required: true, message: 'Sarlavha!'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Xabar matni" name="text"
                                   rules={[{required: true, message: 'Xabar matnini kiriting:'}]}>
                            <TextArea rows={4}/>
                        </Form.Item>

                        <Form.Item style={{position: 'absolute', right: '0 px'}}>
                            <Button type="primary" htmlType="submit">
                                Saqlash
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Modal title="Add users" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                    <Form.Item name="titlename" label="Sarlavha matni" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="message" label="Xabar matni" rules={[{required: true}]}>
                        <TextArea rows={4} maxLength={6}/>
                    </Form.Item>
                    <Form.Item name="time" label="Vaqti" rules={[{required: true}]}>
                        <TimePicker defaultValue={dayjs('00:00', format)} format={format}/>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" danger onClick={handleCancel} style={{marginRight: '20px'}}>
                            Bekor qilish
                        </Button>
                        <Button type="primary" onClick={handleFormSubmit} htmlType="submit">
                            Saqlash
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Row style={{marginTop: '15px'}}>
                <Col md={22}><h2>Doimiy bildirishnomalar</h2></Col> <Col md={1}><Button onClick={showModal} type="primary">+Qo'shish</Button></Col>
            </Row>
            <Table dataSource={data1} columns={columns1}/>
        </section>
    )
}

export default SendNotification;