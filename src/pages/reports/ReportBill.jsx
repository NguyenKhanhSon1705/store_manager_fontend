import { DatePicker, Input, Modal, Pagination, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { LuCornerUpRight } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "~/components/helper/Breadcrumb";
import LoadingSkeleton from "~/components/loading/LoadingSkeleton";
import useDebounce from "~/hook/useDebounce";
import reportAction from "~/store/actions/reportAction";
import formatTime from "~/utils/functions/formatTime";
import { validatePriceVND } from "~/utils/validatePriceVND";
import ReportDetail from "./ReportDetails";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Search } = Input;
function ReportBill() {
  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "bill_code",
      render: (bill_code) => (
        <span className="font-bold text-gray-800">{bill_code}</span>
      ),
    },
    {
      title: "Nhân viên",
      dataIndex: "user_name",
    },
    {
      title: "Bàn",
      dataIndex: "table_name",
    },
    {
      title: "Khu vực",
      dataIndex: "area_name",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_money",
      sorter: (a, b) => a.total_money - b.total_money,
      render: (total_money) => (
        <span className="font-bold text-red-600">
          {validatePriceVND("" + total_money) + " đ"}
        </span>
      ),
    },
    {
      title: "Tổng số lượng",
      dataIndex: "total_quantity",
      width: "5%",
      sorter: (a, b) => a.total_quantity - b.total_quantity,
    },
    {
      title: "Giờ vào",
      dataIndex: "time_start",
      render: (time_start) => (
        <span className="font-bold">
          {formatTime.hourAndMinute(time_start)}
        </span>
      ),
    },
    {
      title: "Giờ ra",
      dataIndex: "time_end",
      render: (time_end) => (
        <span className="font-bold">{formatTime.hourAndMinute(time_end)}</span>
      ),
    },
    {
      title: "Ngày ra",
      dataIndex: "time_end",
      sorter: true,
      render: (time_end) => (
        <span className="font-bold">{formatTime.dateAndYear(time_end)}</span>
      ),
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      render: (discount) => (
        <span className="font-bold text-red-600">
          {validatePriceVND("" + discount) + " đ"}
        </span>
      ),
    },
    {
      title: "VAT",
      dataIndex: "vat",
      render: (vat) => (
        <span className="font-bold text-red-600">
          {validatePriceVND("" + vat) + " đ"}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "data",
      with: "10%",
      ellipsis: true,
      render: (data) => (
        <Space align="center">
          <button
            onClick={() => handleOpenDetail(data)}
            className="font-medium p-2 text-white rounded-md text-[16px] mr-1 bg-[var(--bg-btn-add)] hover:opacity-70"
          >
            <BsEyeSlash />
          </button>
          <button
            // onClick={() => handleOpenCreate(data)}
            className="font-medium p-2 text-white rounded-md text-[16px] mr-1 bg-[var(--bg-btn-edit)] hover:opacity-70"
          >
            <LuCornerUpRight />
          </button>

          <button
            // onClick={() => showDeleteConfirm(data)}
            className="font-medium p-2 text-white rounded-md text-[16px]  ml-1 bg-[var(--bg-btn-delete)] hover:opacity-70"
          >
            <MdDeleteOutline />
          </button>
        </Space>
      ),
    },
  ];
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis: true,
  }));

  (tableColumns[0].fixed = true),
    (tableColumns[tableColumns.length - 1].fixed = "right");
  (scroll.y = 440), (scroll.x = "100vw");

  const { data, loading, update , details } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [dataBill, setDataBill] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filterData, setFilterData] = useState({
    page_index: 1,
    limit: 10,
    start_date: null,
    end_date: null,
    employee_id: null,
    search_bill_code: null,
  });
  const debounce = useDebounce(filterData, 700);
console.log(details);

  useEffect(() => {
    dispatch(reportAction.getReportBill(debounce));
  }, [dispatch, debounce]);

  useEffect(() => {
    if (data && data?.items?.length > 0) {
      const formattedList = data.items.map((item) => ({
        ...item,
        key: item.id,
        data: item,
      }));
      setDataBill(formattedList);
    } else {
      setDataBill([]);
    }
  }, [data]);
  const handleDateChange = (dates, dateStrings) => {
    const startDate = dateStrings[0]; // Date format "DD/MM/YYYY"
    const endDate = dateStrings[1];

    // Kiểm tra và chuyển đổi nếu ngày hợp lệ
     // Kiểm tra và chuyển đổi nếu ngày hợp lệ
        const formattedStartDate = startDate
          ? moment(startDate, "DD/MM/YYYY").format("YYYY-MM-DD")
          : null;
        const formattedEndDate = endDate
          ? moment(endDate, "DD/MM/YYYY").format("YYYY-MM-DD")
          : null;
    setFilterData((prev) => ({
      ...prev,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    }));
  };
  const onSearch = (value) =>
    setFilterData((prev) => ({ ...prev, search_bill_code: value }));
  
  const handleOpenDetail = (data) => {
    dispatch(reportAction.getReportBillDetail(data.id))
    setOpenModal(true);
  }
  return (
    <>
    <Modal
        title={<p>Chi tiết</p>}
        width={"75%"}
        loading={update}
        open={openModal}
        
        onCancel={() => setOpenModal(false)}
      >
        <ReportDetail data = {details} />
      </Modal>
      <Breadcrumb items={[{ name: "Lịch sử thanh toán", href: "" }]} />
      <div className="flex justify-between mb-5 dark:text-white">
        <div>
          <Select
            onChange={(e) => setFilterData((prev) => ({ ...prev, limit: e }))}
            defaultValue={10}
            style={{ width: 150 }}
            options={[
              { value: 5, label: "5/Trang" },
              { value: 10, label: "10/Trang" },
              { value: 20, label: "20/Trang" },
              { value: 50, label: "50/Trang" },
              { value: 100, label: "100/Trang" },
            ]}
          />
        </div>
        <div className="">
          <Search
            className="mt-[7px]"
            placeholder="Tìm kiếm theo mã hóa đơn"
            allowClear
            onSearch={onSearch}
          />
        </div>
        <div>
          <Space className="w-full" direction="vertical" size={12}>
            <RangePicker
              placeholder={["Từ ngày", "đến ngày"]}
              format="DD/MM/YYYY"
              className="w-full"
              onChange={handleDateChange}
              size={"middle"}
            />
          </Space>
        </div>
        <div className="">
          <Select
            onChange={(e) => setFilterData((prev) => ({ ...prev, limit: e }))}
            placeholder="Lọc theo nhân viên"
            style={{ width: 300 }}
            options={[
              { value: 5, label: "5/Trang" },
              { value: 10, label: "10/Trang" },
              { value: 20, label: "20/Trang" },
              { value: 50, label: "50/Trang" },
              { value: 100, label: "100/Trang" },
            ]}
          />
        </div>
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <Table
          showHeader={true}
          tableLayout
          columns={tableColumns}
          dataSource={dataBill ?? []}
          scroll={scroll}
          rowSelection
          locale={{
            triggerAsc: "Sắp xếp tăng dần", // Nội dung tooltip khi sắp xếp tăng
            triggerDesc: "Sắp xếp giảm dần", // Nội dung tooltip khi sắp xếp giảm
            cancelSort: "Bỏ sắp xếp", // Nội dung tooltip khi bỏ sắp xếp
          }}
          pagination={false}
        />
      )}

      <Pagination
        className="mt-5"
        showSizeChanger={false}
        defaultCurrent={filterData?.page_index}
        total={data.totalPages}
        onChange={(value) =>
          setFilterData((prev) => ({ ...prev, page_index: value }))
        }
        pageSize
        align="end"
      />
    </>
  );
}

export default ReportBill;
