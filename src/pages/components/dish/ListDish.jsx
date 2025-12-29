import { useEffect, useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Button,
  Table,
  Tag,
  Space,
  Tooltip,
  Input,
  Card,
  Popconfirm
} from "antd";
import {
  FaRegEdit,
} from "react-icons/fa";
import {
  MdDeleteOutline,
  MdSearch,
  MdFileDownload,
  MdFileUpload
} from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

import images from "~/assets/images";
import { validatePriceVND } from "~/utils/validatePriceVND";
import LoadingSkeleton from "~/components/loading/LoadingSkeleton";
import dishAction from "~/store/actions/dishAction";
import LoadingSyncLoader from "~/components/loading/LoadingSyncLoader";
import useDebounce from "~/hook/useDebounce";
import ImportExcelDish from "./ImportExcelDish";

const ListDish = ({ onUpdate }) => {
  const dispatch = useDispatch();
  const { data: list, loading, update } = useSelector((state) => state.dish);

  const [openImportModal, setOpenImportModal] = useState(false);
  const [pagingData, setPagingData] = useState({
    pageIndex: 1,
    pageSize: 10,
    search: "",
  });

  const debouncedSearch = useDebounce(pagingData.search, 700);

  // Trigger search when debounce value changes
  useEffect(() => {
    dispatch(dishAction.getListDish({
      ...pagingData,
      search: debouncedSearch
    }));
  }, [debouncedSearch, pagingData.pageIndex, pagingData.pageSize, dispatch]);

  // Handle Delete
  const handleDelete = (id) => {
    dispatch(dishAction.deleteDish(id));
  };

  // Export Excel
  const exportExcel = () => {
    if (!list?.items) return;

    const exportData = list.items.map((item) => ({
      "Tên món ăn": item.dish_Name,
      "Hình ảnh": item.image,
      "Giá bán": validatePriceVND(
        "" + (item.list_price.find((p) => p.status)?.selling_price || 0)
      ),
      "Giá bán cũ": item.list_price
        .filter((p) => !p.status)
        .map((p) => validatePriceVND("" + p.selling_price))
        .join(", "),
      "Giá gốc": validatePriceVND("" + item.origin_Price),
      "Thứ tự": item.order,
      "Thuộc nhóm": item.arr_Menu_Group.map((el) => el.name).join(", "),
      "Đơn vị": item.unit_Name,
      "Hot": item.is_Hot ? "Có" : "",
      "Trạng thái": item.status ? "Hoạt động" : "Ngưng",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Bold Header
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let col = range.s.c; col <= range.e.c; col++) {
      const address = XLSX.utils.encode_cell({ r: 0, c: col });
      if (worksheet[address]) {
        worksheet[address].s = { font: { bold: true } };
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DanhSachMonAn');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'danh_sach_san_pham.xlsx');
  };

  // Table Columns
  const columns = [
    {
      title: "#",
      key: "index",
      width: 60,
      align: "center",
      render: (text, record, index) => (pagingData.pageIndex - 1) * pagingData.pageSize + index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (image, record) => (
        <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200 shadow-sm relative group">
          <img
            src={image || images.img_default}
            alt={record.dish_Name}
            className="w-full h-full object-cover"
            onError={(e) => e.target.src = images.img_default}
          />
        </div>
      )
    },
    {
      title: "Thông tin món",
      dataIndex: "dish_Name",
      key: "dish_Name",
      render: (text, record) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-base">{text}</span>
          <span className="text-gray-500 text-xs">{record.unit_Name}</span>
          {record.is_Hot && <Tag color="orange" className="w-fit mt-1 text-[10px]">Bán chạy</Tag>}
        </div>
      )
    },
    {
      title: "Giá bán",
      dataIndex: "selling_Price",
      key: "selling_Price",
      width: 150,
      sorter: (a, b) => {
        const priceA = a.list_price?.find(p => p.status)?.selling_price || 0;
        const priceB = b.list_price?.find(p => p.status)?.selling_price || 0;
        return priceA - priceB;
      },
      render: (_, record) => {
        const currentPrice = record.list_price?.find(p => p.status)?.selling_price;
        const oldPrices = record.list_price?.filter(p => !p.status) || [];

        return (
          <div className="flex flex-col items-start gap-1">
            <span className="font-bold text-orange-600 text-[15px]">
              {validatePriceVND(String(currentPrice))} đ
            </span>
            {oldPrices.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {oldPrices.slice(0, 2).map((p, idx) => (
                  <span key={idx} className="text-xs text-gray-400 line-through">
                    {validatePriceVND(String(p.selling_price))}
                  </span>
                ))}
              </div>
            )}
          </div>
        )
      }
    },
    {
      title: "Nhóm / Loại",
      dataIndex: "arr_Menu_Group",
      key: "groups",
      width: 200,
      render: (groups) => (
        <div className="flex flex-wrap gap-1">
          {groups?.map((g, idx) => (
            <Tag key={idx} color="blue">{g.name}</Tag>
          ))}
        </div>
      )
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag color={status ? "success" : "error"} className="rounded-full px-2">
          {status ? "Hoạt động" : "Ngưng"}
        </Tag>
      )
    },
    {
      title: "Thao tác",
      key: "action",
      width: 140,
      align: "right",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              shape="circle"
              icon={<FaRegEdit className="text-blue-600" size={16} />}
              onClick={() => onUpdate(record)}
              className="hover:bg-blue-50"
            />
          </Tooltip>

          <Tooltip title="Ngưng kinh doanh (Khóa)">
            <Button
              type="text"
              shape="circle"
              icon={<CiLock size={18} className="text-gray-500" />}
              // Logic for lock can be added here or reuse update
              onClick={() => onUpdate({ ...record, status: !record.status })} // Quick toggle status maybe? Or just open edit
              className="hover:bg-gray-100"
            />
          </Tooltip>

          <Popconfirm
            title="Xóa món ăn"
            description="Bạn có chắc chắn muốn xóa món này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Xóa">
              <Button
                type="text"
                shape="circle"
                icon={<MdDeleteOutline className="text-red-500" size={18} />}
                className="hover:bg-red-50"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {update && <LoadingSyncLoader />}

      {openImportModal && (
        <ImportExcelDish onCancel={() => setOpenImportModal(false)} />
      )}

      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-white">
        <Input
          prefix={<MdSearch className="text-gray-400 text-lg" />}
          placeholder="Tìm kiếm món ăn..."
          size="large"
          className="w-full md:w-1/3 rounded-xl border-gray-200 focus:border-orange-500 hover:border-orange-400"
          onChange={(e) => setPagingData(prev => ({ ...prev, search: e.target.value, pageIndex: 1 }))}
        />

        <div className="flex gap-2">
          <Button
            icon={<MdFileUpload />}
            onClick={() => setOpenImportModal(true)}
            className="rounded-lg border-green-200 text-green-600 hover:text-green-700 hover:border-green-300 bg-green-50"
          >
            Nhập Excel
          </Button>
          <Button
            icon={<MdFileDownload />}
            onClick={exportExcel}
            className="rounded-lg border-blue-200 text-blue-600 hover:text-blue-700 hover:border-blue-300 bg-blue-50"
          >
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-hidden p-0 relative">
        <Table
          columns={columns}
          dataSource={list?.items || []}
          loading={loading}
          rowKey="id"
          pagination={{
            current: pagingData.pageIndex,
            pageSize: pagingData.pageSize,
            total: list?.totalCount || 0,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            onChange: (page, pageSize) => setPagingData(prev => ({ ...prev, pageIndex: page, pageSize })),
            showTotal: (total) => `Tổng ${total} món`
          }}
          scroll={{ y: 'calc(100vh - 350px)' }} // Adjust based on layout
          className="h-full w-full"
          rowClassName="hover:bg-orange-50 transition-colors cursor-pointer"
          onRow={(record) => ({
            onClick: (e) => {
              // Prevent triggering when clicking actions
              if (e.target.closest('button')) return;
              onUpdate(record);
            }
          })}
        />
      </div>
    </div>
  );
};

export default ListDish;

