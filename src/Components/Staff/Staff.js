import React, {useEffect, useState} from "react";
import {Table, Switch, Row, Col, Button, Modal, Form, Input, Upload, message} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
    CopyOutlined,
    RedoOutlined
} from "@ant-design/icons";
import axios from "axios";
import {tokenKey} from "../../constants/Constants";
import {getToken} from "../../utilits";

function Staff() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [form] = Form.useForm();
    const authToken = getToken(tokenKey);
    const getData = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken} `
            }
        }
        axios.get(`/api/user/getUsers?pageNumber=0&pageSize=40`, config)
            .then((response) => {
                setUsers(response.data.object);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const editModal = (item) => {
        setIsModalOpen(true);
        const avatar = Array.isArray(item.images) && item.images.length > 0 ? item.images[0].actualName : null;
        form.setFieldsValue({
            firstname: item.firstName,
            lastname: item.lastName,
            position: item.position,
            // avatar: avatar
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
                axios.delete(`/api/user/deleteUser/${id}`, config)
                    .then(res => {
                        if (res && res.data.success) {
                            message.success("User deleted successfully");
                            const updatedUsers = users.filter(user => user.id !== id);
                            setUsers(updatedUsers);
                            getData();
                        } else {
                            message.error("Failed to delete user");
                        }
                    })
                    .catch(error => {
                        message.error("An error occurred while deleting user");
                    });
            },
            onCancel() {
                console.log("Deletion canceled");
            },
        });
    };

    const handleOk = (values) => {
        const formData = new FormData();
        formData.append('firstName', values.firstname);
        formData.append('lastName', values.lastname);
        formData.append('position', values.position);
        if (values.avatar && values.avatar.length > 0) {
            formData.append('files', values.avatar[0].originFileObj, values.avatar[0].name);
        }
        const url = form.id ? `/api/user/updateUser/${form.id}` : "/api/user/addUserAndFile";
        const method = form.id ? 'PUT' : 'POST';
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
        };
        axios({
            url: url,
            method: method,
            data: formData,
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
                console.error(error);
                message.error("An error occurred while processing the request");
            });
    };


    const beforeUpload = (file) => {
        const extension = file.name.split('.').pop().toLowerCase();
        const isJpgOrPng = extension === 'jpg' || extension === 'jpeg' || extension === 'png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG files!');
        }
        return isJpgOrPng;
    };


    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const handleCopy = (item) => {
        const textToCopy = item.randomCode;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                message.success(item.firstName + " " + item.lastName + " " + "ning bir martalik kodi nusxalandi");
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };


    const dataSource = users.map((item, index) => ({
        number: index + 1,
        key: item.id,
        id: item.id,
        avatar: (<img style={{width: '35px'}}
                      src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                      alt=""/>),
        // avatar: Array.isArray(item.images) && item.images.length > 0 ? (
        //     <img style={{width:'35px'}} src={item.images[0].actualName} alt="Error"/>
        // ) : null,
        name: item.firstName,
        surname: item.lastName,
        kod: (
            <div>
                <p style={{
                    backgroundColor: '#FAAD14',
                    width: '45%',
                    borderRadius: '20px',
                    textAlign: 'center',
                    color: 'white',
                    display: 'inline-block',
                    marginRight: '5px'
                }}>
                    <del>{item.randomCode}</del>
                </p>
                <span onClick={() => handleCopy(item)}
                      style={{color: 'blue', marginRight: '5px', cursor: 'pointer'}}><abbr
                    title="Nusxa olish uchun cherting"><CopyOutlined/></abbr></span>
                <span style={{color: 'red', cursor: 'pointer'}}><RedoOutlined/></span>
            </div>
        ),
        connect: item.connection ? (
            <p style={{
                backgroundColor: 'green',
                width: '50%',
                borderRadius: '20px',
                textAlign: 'center',
                color: 'white'
            }}>
                Ulangan
            </p>
        ) : (
            <p style={{
                backgroundColor: '#FAAD14',
                width: '50%',
                borderRadius: '20px',
                textAlign: 'center',
                color: 'white'
            }}>
                Ulanmagan
            </p>
        ),
        qurilma: 'Windows',
        blok: <Switch checked={false}/>,
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
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
        },
        {
            title: 'Ismi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Familiyasi',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Bir martalik kod',
            dataIndex: 'kod',
            key: 'kod',
        },
        {
            title: 'Qurilmaga ulangan',
            dataIndex: 'connect',
            key: 'connect',
        },
        {
            title: 'Qurilma',
            dataIndex: 'qurilma',
            key: 'qurilma',
        },
        {
            title: 'Bloklash',
            dataIndex: 'blok',
            key: 'blok',
        },
        {
            title: 'Harakatar',
            dataIndex: 'action',
            key: 'action',
        },
    ];

    return (
        <section>
            <Row style={{marginBottom: '15px'}}>
                <Col md={22}><h2>Xodimlar</h2></Col> <Col md={1}><Button onClick={showModal}
                                                                         type="primary">+Add</Button></Col>
            </Row>
            <Modal title={form.getFieldValue("firstname") ? "Tahrirlash" : "Yaratish"} open={isModalOpen}
                   onCancel={handleCancel} footer={null}>
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={handleOk}>
                    <Form.Item name="firstname" label="First name" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="lastname" label="Last name" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="position" label="Position" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Upload" name="avatar" valuePropName="fileList" getValueFromEvent={normFile}
                               rules={[{required: true, message: 'Please upload an image'}]}>
                        <Upload
                            customRequest={({onSuccess}) => {
                                onSuccess("ok")
                            }}
                            beforeUpload={beforeUpload}
                            listType="picture-card"
                        >
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit">
                            Saqlash
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={dataSource} columns={columns} rowClassName={(record, index) => index % 2 === 0 ? 'grey-row' : 'white-row'}/>
        </section>
    );
}

export default Staff;
