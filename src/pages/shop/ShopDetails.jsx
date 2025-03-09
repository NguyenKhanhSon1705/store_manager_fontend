import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Modal, Form, Upload, Image, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import routes from '../../routes/routesPath';
import { deleteShop, getShopById, updateShop } from '../../store/actions/shopAction';
import formatDate from '../../utils/formatDate';
import env from '../../constants/env';

const { Title, Text } = Typography;

export default function ShopDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: shopData } = useSelector((state) => state.shop);

    const [isEditing, setIsEditing] = useState(false);
    const [newShopLogo, setNewShopLogo] = useState(null);
    const [editedShopData, setEditedShopData] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const idShop = localStorage.getItem(env.REACT_APP_IDSHOP);
        if (idShop) {
            dispatch(getShopById(+atob(idShop)));
        } else {
            navigate(routes.shop);
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        if (shopData && isEditing) {
            setEditedShopData(shopData);
            form.setFieldsValue(shopData);
        }
    }, [shopData, isEditing, form]);

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                setIsEditing(false);
                dispatch(updateShop({ ...editedShopData, ...values }));
            })
            .catch((info) => console.log('Validate Failed:', info));
    };

    const handleImageChange = (info) => {
        if (info.file.status === 'done') {
            const file = info.file.originFileObj;
            const imageUrl = URL.createObjectURL(file);
            setNewShopLogo(imageUrl);
            setEditedShopData({ ...editedShopData, shopLogo: file });
        }
    };

    const handleDelete = (password) => {
        const payload = {
            id: shopData.id,
            password,
        };
        dispatch(deleteShop(payload));
        setOpenDialog(false);
    };

    return (
        <div className="container">
            <Modal
                title="Xác nhận xóa cửa hàng"
                visible={openDialog}
                onCancel={() => setOpenDialog(false)}
                onOk={() => form.submit()}
                okText="Xóa"
                cancelText="Hủy"
            >
                <Form onFinish={({ password }) => handleDelete(password)}>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                </Form>
            </Modal>

            <div className="flex-center mb-6">
                <Image
                    width={128}
                    height={128}
                    src={newShopLogo || shopData?.shopLogo}
                    alt="Shop Logo"
                    style={{ borderRadius: '50%' }}
                />
            </div>

            {isEditing ? (
                <Form layout="vertical" form={form} initialValues={shopData}>
                    <Form.Item
                        name="shopName"
                        label="Tên cửa hàng"
                        rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng' }]}
                    >
                        <Input placeholder="Nhập tên cửa hàng" />
                    </Form.Item>

                    <Form.Item
                        name="shopPhone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        name="shopAddress"
                        label="Địa chỉ"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                    >
                        <Input placeholder="Nhập địa chỉ" />
                    </Form.Item>

                    <Form.Item name="shopLogo" label="Thay đổi ảnh">
                        <Upload
                            accept="image/*"
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleImageChange}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" onClick={handleSave} style={{ marginRight: 8 }}>
                            Lưu
                        </Button>
                        <Button onClick={() => setIsEditing(false)}>Hủy</Button>
                    </Form.Item>
                </Form>
            ) : (
                <div>
                    <Title level={3}>{shopData?.shopName}</Title>
                    <Text strong>Số điện thoại:</Text> <Text>{shopData?.shopPhone}</Text>
                    <br />
                    <Text strong>Địa chỉ:</Text> <Text>{shopData?.shopAddress}</Text>
                    <br />
                    <Text
                        strong
                        type={shopData?.isActive ? 'success' : 'danger'}
                    >
                        {shopData?.isActive ? 'Đang mở cửa' : 'Đang đóng cửa'}
                    </Text>
                    <br />
                    <Text strong>Ngày tạo:</Text> {formatDate(shopData?.createAt)}
                    <br />
                    <Text strong>Cập nhật lần cuối:</Text> {formatDate(shopData?.updateAt)}

                    <div style={{ marginTop: 16 }}>
                        <Button type="primary" onClick={() => setIsEditing(true)} style={{ marginRight: 8 }}>
                            Sửa thông tin
                        </Button>
                        <Button danger onClick={() => setOpenDialog(true)}>
                            Xóa cửa hàng
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
