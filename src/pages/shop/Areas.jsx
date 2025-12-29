import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Tooltip,
  Popconfirm,
  Card,
  Typography
} from "antd";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline, MdAdd } from "react-icons/md";

import {
  createArea,
  deleteArea,
  getListAreas,
  updateArea,
} from "../../store/actions/areasAction";
import Breadcrumb from "../../components/helper/Breadcrumb";
import LoadingSyncLoader from "../../components/loading/LoadingSyncLoader";

const { Title } = Typography;

function Areas() {
  const dispatch = useDispatch();
  const { data, loading, update } = useSelector((state) => state.area);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(getListAreas());
  }, [dispatch]);

  const handleOpenModal = (item = null) => {
    setSelectedItem(item);
    if (item) {
      form.setFieldsValue({ areaName: item.areaName });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    form.resetFields();
  };

  const onFinish = (values) => {
    if (selectedItem) {
      dispatch(updateArea({ ...values, id: selectedItem.id }));
    } else {
      dispatch(createArea(values));
    }
    handleCancel();
  };

  const handleDelete = (id) => {
    dispatch(deleteArea(id));
  };

  const columns = [
    {
      title: "#",
      key: "index",
      align: "center",
      width: 80,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên Khu vực",
      dataIndex: "areaName",
      key: "areaName",
      render: (text) => <span className="font-medium text-gray-700">{text}</span>,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<FaRegEdit className="text-blue-500" size={18} />}
              onClick={() => handleOpenModal(record)}
              className="hover:bg-blue-50"
            />
          </Tooltip>
          <Popconfirm
            title="Xóa khu vực"
            description="Bạn có chắc chắn muốn xóa khu vực này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Xóa">
              <Button
                type="text"
                icon={<MdDeleteOutline className="text-red-500" size={20} />}
                className="hover:bg-red-50"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-2 h-full">
      {update && <LoadingSyncLoader />}

      {/* Header Section */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <Breadcrumb items={[{ name: "Quản lý khu vực", href: "" }]} />
        <Button
          type="primary"
          icon={<MdAdd size={20} />}
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-orange-500 to-red-500 border-0 shadow-md shadow-orange-200"
          size="large"
        >
          Thêm khu vực
        </Button>
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table
          columns={columns}
          dataSource={data || []}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng ${total} khu vực`,
          }}
          className="w-full"
          rowClassName="hover:bg-gray-50 transition-colors"
        />
      </div>

      {/* Form Modal */}
      <Modal
        title={
          <Title level={4} style={{ margin: 0 }}>
            {selectedItem ? "Cập nhật khu vực" : "Thêm khu vực mới"}
          </Title>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            className="bg-orange-600 hover:bg-orange-500 border-none px-6"
          >
            {selectedItem ? "Cập nhật" : "Lưu"}
          </Button>,
        ]}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="mt-6"
          initialValues={{ areaName: "" }}
        >
          <Form.Item
            name="areaName"
            label="Tên khu vực"
            rules={[{ required: true, message: "Vui lòng nhập tên khu vực!" }]}
          >
            <Input size="large" placeholder="Ví dụ: Tầng 1, Sân vườn..." autoFocus />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Areas;

