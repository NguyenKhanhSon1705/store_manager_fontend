import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Tag,
  Space,
  Tooltip,
  Popconfirm,
  Card
} from "antd";
import { FaRegEdit } from "react-icons/fa";
import { MdAdd, MdDeleteOutline } from "react-icons/md";

import Breadcrumb from "../../components/helper/Breadcrumb";
import {
  createTables,
  deleteTables,
  getListTables,
  updateTables,
} from "../../store/actions/tablesAction";
import DialogCreateTables from "../../components/dialog/DialogCreateTables";
import LoadingSyncLoader from "../../components/loading/LoadingSyncLoader";

function Tables() {
  const dispatch = useDispatch();
  const { data, loading, update } = useSelector((state) => state.table);
  const [openDialog, setOpenDialog] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({ open: false, items: null });

  useEffect(() => {
    dispatch(getListTables());
  }, [dispatch]);

  const handleUpdate = (item) => {
    setUpdateInfo({ open: true, items: item });
  };

  const handleOpenCreate = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteTables(id));
  };

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setUpdateInfo({ open: false, items: null });
  }, []);

  const handleSubmitCreate = useCallback(
    (values) => {
      dispatch(createTables(values));
    },
    [dispatch]
  );

  const handleSubmitUpdate = useCallback(
    (values) => {
      dispatch(updateTables(values));
    },
    [dispatch]
  );

  const columns = [
    {
      title: "#",
      key: "index",
      align: "center",
      width: 70,
      render: (text, record, index) => <span className="text-gray-500">{index + 1}</span>,
    },
    {
      title: "Khu vực",
      dataIndex: "areaName",
      key: "areaName",
      render: (text) => <Tag color="blue" className="rounded-md px-2 py-0.5">{text}</Tag>,
    },
    {
      title: "Phòng / Bàn",
      dataIndex: "nameTable",
      key: "nameTable",
      render: (text) => <span className="font-bold text-gray-800">{text}</span>,
    },
    {
      title: "Tính giờ",
      dataIndex: "hasHourlyRate",
      key: "hasHourlyRate",
      align: "center",
      render: (hasHourlyRate) => (
        <Tag color={hasHourlyRate ? "green" : "red"} className="rounded-full w-8 h-8 flex items-center justify-center border-none mx-auto">
          <div className={`w-3 h-3 rounded-full ${hasHourlyRate ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/50'}`}></div>
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      render: (isActive) => (
        <Tag color={isActive ? "success" : "default"} className="rounded-full px-3">
          {isActive ? "Hoạt động" : "Ngưng"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      align: "right",
      width: 140,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              shape="circle"
              icon={<FaRegEdit className="text-blue-500" size={18} />}
              onClick={() => handleUpdate(record)}
              className="hover:bg-blue-50"
            />
          </Tooltip>
          <Popconfirm
            title="Xóa phòng bàn"
            description="Bạn có chắc chắn muốn xóa bàn này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Xóa">
              <Button
                type="text"
                shape="circle"
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

      <DialogCreateTables
        title="Thêm phòng bàn mới"
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitCreate}
      />

      <DialogCreateTables
        title="Cập nhật phòng bàn"
        open={updateInfo.open}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitUpdate}
        items={updateInfo.items}
      />

      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <Breadcrumb items={[{ name: "Quản lý phòng bàn", href: "" }]} />
        <Button
          type="primary"
          icon={<MdAdd size={20} />}
          onClick={handleOpenCreate}
          className="bg-gradient-to-r from-orange-500 to-red-500 border-0 shadow-md shadow-orange-200"
          size="large"
        >
          Thêm phòng bàn
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table
          columns={columns}
          dataSource={data || []}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng ${total} bàn`,
            showSizeChanger: true,
          }}
          className="w-full"
          rowClassName="hover:bg-orange-50/30 transition-colors"
        />
      </div>
    </div>
  );
}

export default memo(Tables);

