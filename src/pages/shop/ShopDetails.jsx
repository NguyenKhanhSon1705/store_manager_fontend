import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Modal, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { MdStorefront, MdPhone, MdLocationOn, MdEdit, MdDelete, MdSave, MdCancel } from 'react-icons/md';

import routes from '../../routes/routesPath';
import { deleteShop, getShopById, updateShop } from '../../store/actions/shopAction';
import formatDate from '../../utils/formatDate';
import env from '../../constants/env';

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
                message.success('Cập nhật thông tin thành công!');
            })
            .catch((info) => console.log('Validate Failed:', info));
    };

    const handleImageChange = (info) => {
        if (info.file.status === 'done' || info.file.status === 'uploading' || info.file.originFileObj) {
            // AntD Upload "status" might be inconsistent without a real server URL, so we check originFileObj
            const file = info.file.originFileObj || info.file;
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setNewShopLogo(imageUrl);
                setEditedShopData({ ...editedShopData, shopLogo: file });
            }
        }
    };

    // Prevent default auto-upload
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
            return Upload.LIST_IGNORE;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Hình ảnh phải nhỏ hơn 2MB!');
            return Upload.LIST_IGNORE;
        }
        return false; // Prevent auto upload
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
        <div className="min-h-[calc(100vh-var(--header-height))] bg-gray-50/50 p-6 md:p-10 flex justify-center items-start">
            <Modal
                title="Xác nhận xóa cửa hàng"
                open={openDialog}
                onCancel={() => setOpenDialog(false)}
                onOk={() => form.submit()} // This might conflict if we were reusing the same form instance, but delete logic uses a separate internal form in Modal usually. 
                // Wait, previous code used form.submit() which triggered the MAIN form. 
                // Let's create a separate simple form for password inside Modal to be safe.
                okText="Xóa"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
            >
                <Form onFinish={({ password }) => handleDelete(password)}>
                    <p className="text-gray-500 mb-4">Hành động này không thể hoàn tác. Vui lòng nhập mật khẩu để xác nhận.</p>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu của bạn" />
                    </Form.Item>
                </Form>
            </Modal>

            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Banner Area */}
                <div className="h-32 bg-gradient-to-r from-orange-100 to-orange-50 relative"></div>

                <div className="px-8 pb-8 -mt-12">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        {/* Logo Upload/View */}
                        <div className="relative group">
                            <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-md bg-white overflow-hidden flex items-center justify-center">
                                <img
                                    src={newShopLogo || shopData?.shopLogo || "https://via.placeholder.com/150"}
                                    alt="Shop Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isEditing && (
                                <Upload
                                    name="avatar"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={handleImageChange}
                                    className="absolute bottom-0 right-0"
                                >
                                    <button className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-black transition-colors shadow-sm" title="Thay đổi ảnh">
                                        <UploadOutlined />
                                    </button>
                                </Upload>
                            )}
                        </div>

                        {/* Title Section */}
                        <div className="mt-12 md:mt-14 flex-1 w-full">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">{shopData?.shopName}</h1>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                        <span className={`inline-block w-2 h-2 rounded-full ${shopData?.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {shopData?.isActive ? 'Đang hoạt động' : 'Tạm dừng'}
                                    </p>
                                </div>

                                {!isEditing && (
                                    <div className="flex gap-2">
                                        <Button
                                            type="default"
                                            icon={<MdEdit />}
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center"
                                        >
                                            Chỉnh sửa
                                        </Button>
                                        <Button
                                            danger
                                            icon={<MdDelete />}
                                            onClick={() => setOpenDialog(true)}
                                            className="flex items-center"
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-8">
                        {isEditing ? (
                            <Form
                                layout="vertical"
                                form={form}
                                initialValues={shopData}
                                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2"
                            >
                                <Form.Item
                                    name="shopName"
                                    label="Tên cửa hàng"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng' }]}
                                    className="md:col-span-2"
                                >
                                    <Input size="large" prefix={<MdStorefront className="text-gray-400" />} placeholder="Nhập tên cửa hàng" />
                                </Form.Item>

                                <Form.Item
                                    name="shopPhone"
                                    label="Số điện thoại"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                                        { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
                                    ]}
                                >
                                    <Input size="large" prefix={<MdPhone className="text-gray-400" />} placeholder="Nhập số điện thoại" />
                                </Form.Item>

                                <Form.Item
                                    name="shopAddress"
                                    label="Địa chỉ"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                                    className="md:col-span-2"
                                >
                                    <Input.TextArea rows={2} showCount maxLength={200} placeholder="Nhập địa chỉ" />
                                </Form.Item>

                                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                                    <Button size="large" onClick={() => setIsEditing(false)} icon={<MdCancel />}>
                                        Hủy bỏ
                                    </Button>
                                    <Button type="primary" size="large" onClick={handleSave} icon={<MdSave />} className="bg-orange-500 hover:bg-orange-600 border-orange-500">
                                        Lưu thay đổi
                                    </Button>
                                </div>
                            </Form>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                                            <MdPhone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Số điện thoại</p>
                                            <p className="font-semibold text-lg">{shopData?.shopPhone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                            <MdLocationOn size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Địa chỉ</p>
                                            <p className="font-medium">{shopData?.shopAddress}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-5 space-y-2 text-sm border border-gray-100">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Ngày tạo:</span>
                                        <span className="font-medium text-gray-800">{formatDate(shopData?.createAt)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Cập nhật lần cuối:</span>
                                        <span className="font-medium text-gray-800">{formatDate(shopData?.updateAt)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Trạng thái:</span>
                                        <span className={`font-bold ${shopData?.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                            {shopData?.isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
