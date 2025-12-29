import { memo, useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Switch, Upload, message, Typography } from 'antd';
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import images from '~/assets/images';
import PropTypes from 'prop-types';

const { TextArea } = Input;
const { Text } = Typography;

function DialogMenuGroup({
    title = "Tạo nhóm sản phẩm",
    open,
    onClose,
    onSubmit,
    items = {}
}) {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(images.img_default);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (open) {
            form.setFieldsValue({
                name: items?.name || '',
                order: items?.order || '',
                description: items?.description || '',
                status: items?.status ?? true
            });
            setImageUrl(items?.image || images.img_default);
            setFileList([]); // Reset file list on open
        } else {
            form.resetFields();
            setImageUrl(images.img_default);
        }
    }, [open, items, form]);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                const submitData = {
                    ...values,
                    image: fileList.length > 0 ? fileList[0].originFileObj : items?.image, // Send file object if new, else keep old
                    id: items?.id
                };
                // If it's a file upload, usually we send FormData, but here we keep existing logic structure.
                // The parent component seems to handle the actual API call logic.
                // We just pass the data back.

                // Correction based on original logic:
                // original logic: setValueInput(prev => ({ ...prev, image: file }));
                // So valid image submission is the File object itself if changed.

                onSubmit(submitData);
                onClose();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length > 0) {
            const file = newFileList[0].originFileObj;
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        } else {
            setImageUrl(items?.image || images.img_default);
        }
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Hình ảnh phải nhỏ hơn 2MB!');
        }
        return false; // Prevent auto upload, we handle it manually on submit
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh</div>
        </div>
    );

    return (
        <Modal
            title={<span className="text-xl font-bold text-gray-800">{title}</span>}
            open={open}
            onOk={handleOk}
            onCancel={onClose}
            okText="Lưu"
            cancelText="Hủy"
            okButtonProps={{ className: "bg-orange-500 hover:bg-orange-600 border-none" }}
            centered
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                className="mt-4"
            >
                <div className="flex gap-6">
                    {/* Image Upload Column */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            fileList={fileList}
                            maxCount={1}
                        >
                            {imageUrl ? (
                                <div className="relative group w-full h-full">
                                    <img src={imageUrl} alt="avatar" className="w-full h-full object-cover rounded-lg" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg text-white">
                                        <span className="text-xs">Thay đổi</span>
                                    </div>
                                </div>
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                        {imageUrl && imageUrl !== images.img_default && (
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageUrl(images.img_default);
                                    setFileList([]);
                                }}
                            >
                                Xóa ảnh
                            </Button>
                        )}
                    </div>

                    {/* Inputs Column */}
                    <div className="flex-1">
                        <Form.Item
                            name="name"
                            label="Tên nhóm món"
                            rules={[{ required: true, message: 'Vui lòng nhập tên nhóm món!' }]}
                        >
                            <Input placeholder="Nhập tên nhóm (VD: Món khai vị)" size="large" />
                        </Form.Item>

                        <div className="flex gap-4">
                            <Form.Item
                                name="order"
                                label="Thứ tự"
                                className="flex-1"
                            >
                                <Input type="number" placeholder="1" />
                            </Form.Item>

                            <Form.Item
                                name="status"
                                label="Trạng thái"
                                className="flex-1"
                                valuePropName="checked"
                            >
                                <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="description"
                            label="Mô tả"
                        >
                            <TextArea rows={3} placeholder="Mô tả ngắn về nhóm món này..." />
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Modal>
    );
}

DialogMenuGroup.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    items: PropTypes.object,
};

export default memo(DialogMenuGroup);

