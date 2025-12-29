import { useCallback, useLayoutEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdAdd, MdDeleteOutline, MdSearch } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Pagination, Table, Input, Button, Tag, Tooltip, Card, Space } from "antd";

import images from "../../assets/images";
import DialogMenuGroup from "../../components/dialog/DialogMenuGroup";
import Breadcrumb from "../../components/helper/Breadcrumb";
import {
  createMenuGroup,
  deleteMenuGroup,
  getAllMenuGroup,
  updateMenuGroup,
} from "../../store/actions/menuGroupAction";
import LoadingSyncLoader from "../../components/loading/LoadingSyncLoader";
import useDebounce from "../../hook/useDebounce"; // Assuming you have this hook based on Dish.jsx

const { confirm } = Modal;

function GroupMenu() {
  const dispatch = useDispatch();
  const { data, loading, update } = useSelector((state) => state.menuGroup);
  const [openDialog, setOpenDialog] = useState({ open: false, items: {} });
  const [showPage, setShowPage] = useState({
    pageIndex: 1,
    search: "",
    limit: 10, // Default to 10 for Table
  });

  const debouncedSearch = useDebounce(showPage.search, 500);

  useLayoutEffect(() => {
    dispatch(getAllMenuGroup({ ...showPage, search: debouncedSearch || showPage.search }));
  }, [showPage.pageIndex, showPage.limit, debouncedSearch, dispatch]);

  const handleOpenCreate = (items = {}) => {
    setOpenDialog({ open: true, items: items });
  };

  const handleCloseDialog = useCallback(() => {
    setOpenDialog({ open: false, items: {} });
  }, []);

  const handleSubmit = useCallback(
    (data) => {
      if (data.id) {
        dispatch(updateMenuGroup(data));
      } else {
        dispatch(createMenuGroup(data));
      }
    },
    [dispatch]
  );

  const handleSubmitDelete = (id) => {
    confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa nhóm món ăn này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      centered: true,
      onOk() {
        dispatch(deleteMenuGroup(id));
      },
    });
  };

  const handleTableChange = (pagination) => {
    setShowPage((prev) => ({
      ...prev,
      pageIndex: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const columns = [
    {
      title: "#",
      key: "index",
      width: 60,
      align: "center",
      render: (text, record, index) => {
        return (showPage.pageIndex - 1) * showPage.limit + index + 1;
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 120,
      render: (image, record) => (
        <div className="w-[80px] h-[50px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <img
            src={image || images.img_default}
            alt={record.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = images.img_default)}
          />
        </div>
      ),
    },
    {
      title: "Tên nhóm thực đơn",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-semibold text-gray-700">{text}</span>,
    },
    {
      title: "Thứ tự",
      dataIndex: "order",
      key: "order",
      width: 100,
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => (
        <Tag color={status ? "success" : "error"} className="px-3 py-1 rounded-full text-sm font-medium border-0">
          {status ? "Hoạt động" : "Ngưng hoạt động"}
        </Tag>
      ),
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
              icon={<FaRegEdit size={18} />}
              onClick={() => handleOpenCreate(record)}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full w-9 h-9 flex items-center justify-center p-0"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<MdDeleteOutline size={20} />}
              onClick={() => handleSubmitDelete(record.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full w-9 h-9 flex items-center justify-center p-0"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-2 h-full flex flex-col gap-4">
      {update && <LoadingSyncLoader />}

      <DialogMenuGroup
        open={openDialog.open}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        items={openDialog.items}
      />

      {/* Header Section */}
      <Card
        bordered={false}
        className="shadow-sm rounded-xl"
        bodyStyle={{ padding: "12px 24px" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Breadcrumb items={[{ name: "Quản lý nhóm món", href: "" }]} />

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Input
              size="large"
              placeholder="Tìm kiếm nhóm món..."
              prefix={<MdSearch className="text-gray-400 text-xl" />}
              value={showPage.search}
              onChange={(e) => setShowPage((prev) => ({ ...prev, search: e.target.value }))}
              className="min-w-[300px] rounded-xl border-gray-200 hover:border-orange-400 focus:border-orange-500"
            />
            <Button
              type="primary"
              size="large"
              icon={<MdAdd size={20} />}
              onClick={() => handleOpenCreate({})}
              className="bg-gradient-to-r from-orange-500 to-red-500 border-0 hover:opacity-90 shadow-md shadow-orange-200 rounded-xl px-6 font-medium flex items-center"
            >
              Thêm mới
            </Button>
          </div>
        </div>
      </Card>

      {/* Table Section */}
      <Card
        bordered={false}
        className="shadow-sm rounded-xl flex-1 overflow-hidden flex flex-col"
        bodyStyle={{ padding: 0, height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Table
          columns={columns}
          dataSource={data?.items || []}
          loading={loading}
          rowKey="id"
          pagination={{
            current: showPage.pageIndex,
            pageSize: showPage.limit,
            total: data?.totalPages ? data.totalPages * showPage.limit : 0, // Estimating total items if API only returns totalPages
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
          }}
          onChange={handleTableChange}
          scroll={{ y: 'calc(100vh - 280px)' }} // Sticky header and scrollable body
          className="h-full"
          rowClassName="hover:bg-orange-50 transition-colors duration-200 cursor-pointer"
          onRow={(record) => ({
            onClick: () => handleOpenCreate(record),
          })}
        />
      </Card>
    </div>
  );
}

export default GroupMenu;

