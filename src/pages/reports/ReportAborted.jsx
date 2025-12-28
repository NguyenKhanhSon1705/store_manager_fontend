import { DatePicker, Modal, Pagination, Select, Space, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { LuCornerUpRight } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "~/components/helper/Breadcrumb";
import LoadingSkeleton from "~/components/loading/LoadingSkeleton";
import LoadingSyncLoader from "~/components/loading/LoadingSyncLoader";
import useDebounce from "~/hook/useDebounce";
import reportAction from "~/store/actions/reportAction";
import formatTime from "~/utils/functions/formatTime";
import { validatePriceVND } from "~/utils/validatePriceVND";
const { RangePicker } = DatePicker;
function ReportAborted() {
  const columns = [
    {
      title: "Lý do hủy",
      dataIndex: "reason_abort",
      render: (reason_abort) => (
        <span className="font-bold text-gray-800">{reason_abort}</span>
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
      width: "10%",
      sorter: (a, b) => a.total_quantity - b.total_quantity,
    },
    {
      title: "Giờ vào",
      dataIndex: "created_table_at",
      render: (created_table_at) => (
        <span className="font-bold">
          {formatTime.hourAndMinute(created_table_at)}
        </span>
      ),
    },
    {
      title: "Giờ hủy",
      dataIndex: "aborted_date",
      render: (aborted_date) => (
        <span className="font-bold">{formatTime.hourAndMinute(aborted_date)}</span>
      ),
    },
    {
      title: "Ngày hủy",
      dataIndex: "aborted_date",
      sorter: true,
      render: (aborted_date) => (
        <span className="font-bold">{formatTime.dateAndYear(aborted_date)}</span>
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

  const { data, loading, update } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [dataAborted, setDataAborted] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [filterData, setFilterData] = useState({
    pageIndex: 1,
    limit: 10,
    start_date: null,
    end_date:null,
    employee_id: null
  });
  const debounce = useDebounce(filterData, 700);

  useEffect(()=> {
    dispatch(reportAction.getReportAborted(debounce));
  },[dispatch,debounce])
  
  useEffect(() => {
    if (data && data?.items?.length > 0) {
      const formattedList = data.items.map((item) => ({
        ...item,
        key: item.id,
        data: item,
      }));
      setDataAborted(formattedList);
    } else {
      setDataAborted([]);
    }
  }, [data]);

const handleDateChange = (dates, dateStrings) => {
    const startDate = dateStrings[0]; // Date format "DD/MM/YYYY"
    const endDate = dateStrings[1];

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

  const handleOpenDetail = (data) => {
    console.log(data);
    setOpenModal(true);
  }
  return (
    <>
    <Modal
        title={<p>Loading Modal</p>}
        loading={loading}
        open={openModal}
        onCancel={() => setOpenModal(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Breadcrumb items={[{ name: "Lịch sử hủy bàn", href: "" }]} />
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
        
        <div>
          <Space className="w-full" direction="vertical" size={12}>
            <RangePicker
              placeholder={["Từ ngày", "đến ngày"]}
              format="DD/MM/YYYY"
              className="w-full"
              onChange={handleDateChange}
              size={"middle"}
              //   value={selectedDate?.format("DD/MM/YYYY")}
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
      {update && <LoadingSyncLoader />}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <Table
          showHeader={true}
          tableLayout
          columns={tableColumns}
          dataSource={dataAborted ?? []}
          scroll={scroll}
          rowSelection
          locale={{
            triggerAsc: "Sắp xếp tăng dần", // Nội dung tooltip khi sắp xếp tăng
            triggerDesc: "Sắp xếp giảm dần", // Nội dung tooltip khi sắp xếp giảm
            cancelSort: "Bỏ sắp xếp", // Nội dung tooltip khi bỏ sắp xếp
            emptyText: "Không có dữ liệu", // Nội dung hiển thị khi không có dữ liệu
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

export default ReportAborted;
