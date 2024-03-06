import React, {useEffect, useState} from "react";
import {Button, Col, Form, Modal, Row, Select, Table} from "antd";
import {DatePicker, Space} from 'antd';
import {
    CheckOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {getToken} from "../../utilits";
import {tokenKey} from "../../constants/Constants";
import axios from "axios";

const {RangePicker} = DatePicker;

function Davomad() {
    const [selectedDates, setSelectedDates] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [davomad, setDavomad] = useState([]);
    const [start, setStart] = useState('2024-02-01');
    const [end, setEnd] = useState('2024-02-17');
    const [form] = Form.useForm();
    const authToken = getToken(tokenKey);

    const getData = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken} `
            }
        }
        axios.get(`/api/user/davomat/getUserDavomatList?pageNumber=0&pageSize=5&start=${start}&end=${end}`, config)
            .then((response) => {
                setDavomad(response.data.object);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };
    useEffect(() => {
        getData();
    }, [start, end]);

    const handleDateChange = (dates, dateStrings) => {
        if (dateStrings.length > 0) {
            const startDateString = dateStrings[0];
            const endDAteString = dateStrings[1];
            setSelectedDates(startDateString);
            setStart(startDateString);
            setEnd(endDAteString);
            getData();
        } else {
            setSelectedDates(formattedDate);
        }
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    const showModal = () => {
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
            title: 'Kirish',
            dataIndex: 'enter',
            key: 'enter',
        },
        {
            title: 'Chiqish',
            dataIndex: 'exit',
            key: 'exit',
        },
        {
            title: 'Ishlagan soati',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Ishdami',
            dataIndex: 'condition',
            key: 'condition',
        },
        {
            title: 'Sana',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Qurilma',
            dataIndex: 'qurilma',
            key: 'qurilma',
        },
        {
            title: 'Sabab',
            dataIndex: 'reason',
            key: 'reason',
        }
    ];


    const dataSource = davomad.map((item, index) => ({
        key: {index},
        id: 1,
        name: item.userName,
        enter: item.startDate.substring(11, 16),
        exit: item.endDate.substring(11, 16),
        time: item.workingHours + ' soat',
        condition: (
            <Row>
                <Col md={2}>
                    <div style={{
                        width: '5px',
                        height: '5px',
                        backgroundColor: '#FFC107',
                        borderRadius: '50%',
                        marginTop: '10px'
                    }}></div>
                </Col>
                <Col md={22}>Ishda emas</Col>
            </Row>
        ),
        date: item.date.substring(0 ,10),
        qurilma: item.deviceName,
        reason: (
            <button onClick={showModal}
                    style={{backgroundColor: '#FFC107', fontSize: "20px", borderRadius: '10px', cursor: 'pointer'}}>
                <CheckOutlined/></button>
        ),
    }));

    const options = davomad.map((item, index) => ({
        key: {index},
        value: item.id,
        label: item.userName,

    }));
    return (
        <section>
            <Row>
                <Col md={12}>
                    <h2>Davomad ( <span
                        style={{color: 'blue'}}>{!selectedDates ? formattedDate : selectedDates} {selectedDates ? "<->" : ""} {selectedDates && selectedDates}</span> )
                    </h2>
                </Col>
                <Col md={12}>
                    <Select
                        placeholder="Select a person"
                        optionFilterProp="children"
                        style={{width: 250, marginRight: "15px"}}
                        options={options}
                    />
                    <Space direction="vertical" style={{width: 250}}>
                        <RangePicker onChange={handleDateChange}/>
                    </Space>
                </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} rowClassName={(record, index) => index % 2 === 0 ? 'grey-row' : 'white-row'}/>
            <Modal title="Reason text!" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                    <Form.Item name="message" label="Xabar matni">
                        <TextArea placeholder="Reason message!" rows={6}/>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" onClick={handleCancel} htmlType="submit">
                            Saqlash
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    )
}

export default Davomad;
