import { IoMdHome } from "react-icons/io";
import { IoTabletPortrait } from "react-icons/io5";
import {
  MdBarChart,
  MdDashboard,
  MdOutlineFreeCancellation,
  MdOutlineNumbers,
  MdOutlinePendingActions,
} from "react-icons/md";

import Widget from "~/components/widget/Widget";

import { DatePicker, Select, Space } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import reportAction from "~/store/actions/reportAction";
import useDebounce from "~/hook/useDebounce";
import { validatePriceVND } from "~/utils/validatePriceVND";
import { FaMoneyBill } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import Breadcrumb from "~/components/helper/Breadcrumb";
import NftCard from "~/components/card/NftCard";
import { LineChart } from "@mui/x-charts";
const { RangePicker } = DatePicker;
const options = [
  {
    value: "1",
    label: "Hôm nay",
  },
  {
    value: "2",
    label: "Hôm qua",
  },
  {
    value: "3",
    label: "Tuần này",
  },
  {
    value: "4",
    label: "Tháng này",
  },
  {
    value: "5",
    label: "Tháng trước",
  },
  {
    value: "6",
    label: "Quý này",
  },
  {
    value: "7",
    label: "Quý trước",
  },
  {
    value: "8",
    label: "Năm nay",
  },
];
const Dashboard = () => {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({
    start_date: null,
    end_date: null,
  });
  const { data } = useSelector((state) => state.report);
  console.log("data", data);
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
  const debounce = useDebounce(filterData, 300);
  useEffect(() => {
    dispatch(reportAction.getRevenueReport(debounce));
  }, [dispatch, debounce]);

  const handleChange = (value) => {
    let newStartDate, newEndDate;
    const today = moment(); // Lấy thời gian hiện tại

    switch (value) {
      case "1": // Hôm nay
        newStartDate = today.clone().startOf("day"); // Từ 00:00 hôm nay
        newEndDate = today.clone().endOf("day"); // Đến 23:59 hôm nay
        break;
      case "2": // Hôm qua
        newStartDate = today.clone().subtract(1, "days").startOf("day"); // Từ 00:00 hôm qua
        newEndDate = today.clone().subtract(1, "days").endOf("day"); // Đến 23:59 hôm qua
        break;
      case "3": // Tuần này
        newStartDate = today.clone().startOf("week"); // Từ 00:00 ngày đầu tuần
        newEndDate = today.clone().endOf("week"); // Đến 23:59 ngày cuối tuần
        break;
      case "4": // Tháng này
        newStartDate = today.clone().startOf("month"); // Từ 00:00 ngày đầu tháng
        newEndDate = today.clone().endOf("month"); // Đến 23:59 ngày cuối tháng
        break;
      case "5": // Tháng trước
        newStartDate = today.clone().subtract(1, "month").startOf("month"); // Từ 00:00 ngày đầu tháng trước
        newEndDate = today.clone().subtract(1, "month").endOf("month"); // Đến 23:59 ngày cuối tháng trước
        break;
      case "6": // Quý này
        newStartDate = today.clone().startOf("quarter"); // Từ 00:00 ngày đầu quý
        newEndDate = today.clone().endOf("quarter"); // Đến 23:59 ngày cuối quý
        break;
      case "7": // Quý trước
        newStartDate = today.clone().subtract(1, "quarter").startOf("quarter"); // Từ 00:00 ngày đầu quý trước
        newEndDate = today.clone().subtract(1, "quarter").endOf("quarter"); // Đến 23:59 ngày cuối quý trước
        break;
      case "8": // Năm nay
        newStartDate = today.clone().startOf("year"); // Từ 00:00 ngày đầu năm
        newEndDate = today.clone().endOf("year"); // Đến 23:59 ngày cuối năm
        break;
      default:
        newStartDate = newEndDate = today; // Nếu không chọn gì, trả về thời gian hiện tại
    }

    setFilterData((prev) => ({
      ...prev,
      start_date: newStartDate.format("YYYY/MM/DD HH:mm:ss"), // Bao gồm thời gian
      end_date: newEndDate.format("YYYY/MM/DD HH:mm:ss"), // Bao gồm thời gian
    }));
  };
  const uData = [0, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  
  const xLabels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  return (
    <div>
      <Breadcrumb items={[{ name: "Tổng quan", href: "" }]} />
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        <LineChart
          height={400}
          series={[
            { data: pData, label: "Doanh thu" },
            { data: uData, label: "Lợi nhuận" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <div>
          <Space className="w-full" direction="vertical" size={12}>
            <Select
              defaultValue="Hôm nay"
              className="w-full"
              size="large"
              onChange={handleChange}
              options={options}
            />
          </Space>
        </div>
        <div>
          <Space className="w-full" direction="vertical" size={12}>
            <RangePicker
              placeholder={["Từ ngày", "đến ngày"]}
              format="DD/MM/YYYY"
              className="w-full"
              onChange={handleDateChange}
              size={"large"}
            />
          </Space>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Doanh thu"}
          subtitle={validatePriceVND(" " + data?.total_nuvenue) + " VNĐ"}
        />
        <Widget
          icon={<FaMoneyBill className="h-6 w-6" />}
          title={"Thanh toán online"}
          subtitle={
            validatePriceVND(" " + data?.total_transaction_online) + " VNĐ"
          }
        />
        <Widget
          icon={<MdOutlinePendingActions className="h-7 w-7" />}
          title={"Chờ thanh toán"}
          subtitle={validatePriceVND(" " + data?.pendding_nuvenue) + " VNĐ"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Tổng hóa đơn"}
          subtitle={data?.total_billed + data?.pendding_bill || ""}
        />
        <Widget
          icon={<RiBillLine className="h-7 w-7" />}
          title={"Đã thanh toán"}
          subtitle={data?.total_billed}
        />
        <Widget
          icon={<IoTabletPortrait className="h-6 w-6" />}
          title={"Hóa đơn chờ thanh toán"}
          subtitle={data?.pendding_bill}
        />
        <Widget
          icon={<MdOutlineFreeCancellation className="h-6 w-6" />}
          title={"Hóa đơn trả món"}
          subtitle={data?.total_aborted}
        />
        <Widget
          icon={<MdOutlineNumbers className="h-7 w-7" />}
          title={"Số lượng món hủy"}
          subtitle={data?.total_aborted_dish}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Tổng tiền hủy tạm tính"}
          subtitle={validatePriceVND(" " + data?.total_aborted_money) + " VNĐ"}
        />
      </div>

      <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          Món ăn bán được nhiều nhất
        </h4>
      </div>
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
        {Array.isArray(data?.list_dish_hot) &&
          data?.list_dish_hot.map((item, index) => {
            return (
              <NftCard
                key={index}
                // bidders={[avatar1, avatar2, avatar3]}
                title={item.dish_Name}
                quantity={item.quantity}
                price={validatePriceVND("" + item.selling_Price) + " VNĐ"}
                image={item.image}
              />
            );
          })}
      </div>

      <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          Món ăn bán được ít nhất
        </h4>
      </div>
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
        {Array.isArray(data?.list_dish_not_hot) &&
          data?.list_dish_not_hot.map((item, index) => {
            return (
              <NftCard
                key={index}
                // bidders={[avatar1, avatar2, avatar3]}
                title={item.dish_Name}
                quantity={item.quantity}
                price={validatePriceVND("" + item.selling_Price) + " VNĐ"}
                image={item.image}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
