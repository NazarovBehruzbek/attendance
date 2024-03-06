import React, { useEffect, useState } from "react";
import {Button, Col, Form, Modal, Row, Table, TimePicker, DatePicker, Space, message} from "antd";
import { getToken } from "../../utilits";
import { tokenKey } from "../../constants/Constants";
import axios from "axios";
import { CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function CheckDavomad() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [davomad, setDavomad] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [form] = Form.useForm();
    const authToken = getToken(tokenKey);

    const getData = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken} `
            }
        };
        axios.get(`/api/user/davomat/getUserDavomatList?pageNumber=0&pageSize=5&start=2024-02-01&end=2024-02-29`, config)
            .then((response) => {
                setDavomad(response.data.object);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };

    const updateUserDavomat = async (values) => {
        const { startDateInput, endDateInput, dateInput } = values;
        const startDate = dayjs(startDateInput).format('YYYY-MM-DD HH:mm:ss');
        const endDate = dayjs(endDateInput).format('YYYY-MM-DD HH:mm:ss');
        const date = dayjs(dateInput).format('YYYY-MM-DD HH:mm:ss');
        const url = `/api/user/davomat/updateUserDavomat/${selectedUserId}?startDate=${startDate}&endDate=${endDate}&date=${date}`;

        try {
            const response = await axios.put(url, null, { headers: { 'Authorization': `Bearer ${authToken}` } });
            message.success("Davomad belgilandi")
            getData();
            handleCancel(); // Close modal after update
        } catch (error) {
            message.error("Xatolik")
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ismi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Davomad',
            dataIndex: 'action',
            key: 'action',
        },
    ];

    const dataSource = davomad.map((item, index) => ({
        key: item.id,
        id: index + 1,
        name: item.userName,
        action: (
            <button onClick={() => handleUserClick(item.id)}
                    style={{
                        fontSize: "20px",
                        borderRadius: '10px',
                        cursor: 'pointer'
                    }}>
                {selectedUserId === item.id ? (
                    <CheckOutlined style={{ color: 'green' }} />
                ) : (
                    <ExclamationCircleOutlined style={{ color: 'red' }} />
                )}
            </button>
        ),
    }));

    const format = 'HH:mm:ss';

    return (
        <section>
            <Row>
                <Col md={12}>
                    <h2>Davomad kiritish </h2>
                </Col>
                <Col md={12}> </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} />
            <Modal title="Davomad qilish!" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={updateUserDavomat}>
                    <Form.Item name="startDateInput" label="Kirish" style={{ display: 'inline-block', marginRight: '20px' }}>
                        <TimePicker  format={format} />
                    </Form.Item>
                    <Form.Item name="endDateInput" label="Chiqish" style={{ display: 'inline-block', marginRight: '10px' }}>
                        <TimePicker  format={format} />
                    </Form.Item>
                    <Form.Item name="dateInput" label="Sana" style={{ display: 'inline-block' }}>
                        <Space>
                            <DatePicker format="YYYY-MM-DD" />
                        </Space>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit">
                            Saqlash
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
}

export default CheckDavomad;
