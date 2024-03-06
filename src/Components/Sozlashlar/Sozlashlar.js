import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, message, Modal, Row, Space, Switch, Table} from "antd";
import {
    CheckCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./Sozlamalar.css";
import axios from "axios";
import {getToken} from "../../utilits";
import {tokenKey} from "../../constants/Constants";

function Settings() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [setting, setSetting] = useState([]);
    const authToken = getToken(tokenKey);
    const columns = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        }
    ];
    const getData = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken} `
            }
        }
        axios.get(`/api/settings/getSettings?pageNumber=0&pageSize=20`, config)
            .then((response) => {
                setSetting(response.data.object);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const updateWifi = () => {
        message.success("Join type updated successfully!")
    }

    const showModal = () => {
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const editModal = (item) => {
        setIsModalOpen(true);
        form.setFieldsValue({
            name: item.name,
            ip: item.ip,
            active: item.active,
        });
        form.id = item.id;
    };

    const deleteUser = (id) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            icon: <ExclamationCircleOutlined/>,
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                axios.delete(`/api/settings/deleteSettings/${id}`, config)
                    .then(res => {
                        if (res && res.data.success) {
                            message.success("User deleted successfully");
                            const updatedUsers = setting.filter(user => user.id !== id);
                            setSetting(updatedUsers);
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
    const handleOk = (values) => {
        const url = form.id ? `/api/settings/updateSettings/${form.id}` : "/api/settings/createSettings";
        const method = form.id ? 'PUT' : 'POST';
        const headers = {
            'Authorization': `Bearer ${authToken}`,
        };
        axios({
            url: url,
            method: method,
            data: values,
            headers: headers,
        })
            .then(res => {
                if (res && res.data) {
                    message.success(form.id ? "User updated successfully" : "User added successfully");
                    handleCancel();
                    getData();
                } else {
                    message.error("Failed to save user");
                }
            })
            .catch(error => {
                message.error("An error occurred while processing the request");
            });
    };


    const dataSource = setting.map((item, index) => ({
        number: index + 1,
        key: item.id,
        id: item.id,
        name: item.name,
        ip: item.ip,
        active: item.active ? <span style={{color: 'green', fontSize: '22px'}}><CheckCircleOutlined/></span> :
            <span style={{color: 'red', fontSize: '22px'}}><ExclamationCircleOutlined/></span>,
        action: (
            <div>
            <span onClick={() => editModal(item)} style={{color: 'green', fontSize: '22px', cursor: 'pointer'}}>
                <EditOutlined/>
            </span>
                <span onClick={() => deleteUser(item.id)} style={{color: 'red', fontSize: '22px', cursor: 'pointer'}}>
                <DeleteOutlined/>
            </span>
            </div>
        )
    }));

    return (
        <section>
            <Row style={{marginBottom: '15px'}}>
                <Col md={20}><h3>Settings</h3></Col>
                <Col md={4}>
                    <Row>
                        <Col md={12}><Space><Switch checked={false} onClick={updateWifi} checkedChildren="coonect"
                                                    unCheckedChildren="Wifi"/></Space></Col>
                        <Col md={12}><Button type="primary" onClick={showModal}>+Add</Button></Col>
                    </Row>
                </Col>
            </Row>
            <Modal title={form.getFieldValue("name") ? "Tahrirlash" : "Yaratish"} open={isModalOpen}
                   onCancel={handleCancel} footer={null}>
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={handleOk}>
                    <Form.Item name="name" label="Name" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="ip" label="Ip address" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="active" label="Active">
                        <Switch/>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit">
                            Saqlash
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={dataSource} columns={columns} rowClassName={(record, index) => index % 2 === 0 ? 'white-row' : 'grey-row'}/>
        </section>
    )
}

export default Settings;
