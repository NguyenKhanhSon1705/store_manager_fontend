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
  const { data, loading } = useSelector((state) => state.report);

  const handleDateChange = (dates, dateStrings) => {
    const startDate = dateStrings[0];
    const endDate = dateStrings[1];

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
    const today = moment();

    switch (value) {
      case "1": // Hôm nay
        newStartDate = today.clone().startOf("day");
        newEndDate = today.clone().endOf("day");
        break;
      case "2": // Hôm qua
        newStartDate = today.clone().subtract(1, "days").startOf("day");
        newEndDate = today.clone().subtract(1, "days").endOf("day");
        break;
      case "3": // Tuần này
        newStartDate = today.clone().startOf("week");
        newEndDate = today.clone().endOf("week");
        break;
      case "4": // Tháng này
        newStartDate = today.clone().startOf("month");
        newEndDate = today.clone().endOf("month");
        break;
      case "5": // Tháng trước
        newStartDate = today.clone().subtract(1, "month").startOf("month");
        newEndDate = today.clone().subtract(1, "month").endOf("month");
        break;
      case "6": // Quý này
        newStartDate = today.clone().startOf("quarter");
        newEndDate = today.clone().endOf("quarter");
        break;
      case "7": // Quý trước
        newStartDate = today.clone().subtract(1, "quarter").startOf("quarter");
        newEndDate = today.clone().subtract(1, "quarter").endOf("quarter");
        break;
      case "8": // Năm nay
        newStartDate = today.clone().startOf("year");
        newEndDate = today.clone().endOf("year");
        break;
      default:
        newStartDate = newEndDate = today;
    }

    setFilterData((prev) => ({
      ...prev,
      start_date: newStartDate.format("YYYY/MM/DD HH:mm:ss"),
      end_date: newEndDate.format("YYYY/MM/DD HH:mm:ss"),
    }));
  };

  const uData = [0, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

  const xLabels = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
  ];

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-navy-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-700">
        <Breadcrumb items={[{ name: "Bảng điều khiển", href: "" }]} />

        <div className="flex flex-wrap items-center gap-3">
          <Select
            defaultValue="1"
            className="w-40"
            size="large"
            onChange={handleChange}
            options={options}
            style={{ borderRadius: '12px' }}
          />
          <RangePicker
            placeholder={["Từ ngày", "Đến ngày"]}
            format="DD/MM/YYYY"
            className="rounded-xl"
            onChange={handleDateChange}
            size="large"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <Widget
          icon={<MdBarChart size={28} />}
          title="Tổng doanh thu"
          subtitle={validatePriceVND(" " + (data?.total_nuvenue || 0)) + " đ"}
          color="orange"
        />
        <Widget
          icon={<FaMoneyBill size={24} />}
          title="Thanh toán Online"
          subtitle={validatePriceVND(" " + (data?.total_transaction_online || 0)) + " đ"}
          color="blue"
        />
        <Widget
          icon={<MdOutlinePendingActions size={28} />}
          title="Doanh thu chờ"
          subtitle={validatePriceVND(" " + (data?.pendding_nuvenue || 0)) + " đ"}
          color="purple"
        />
        <Widget
          icon={<MdDashboard size={24} />}
          title="Tổng hóa đơn"
          subtitle={(data?.total_billed || 0) + (data?.pendding_bill || 0)}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-navy-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-navy-700">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">Xu hướng doanh thu</h4>
            <div className="h-2 w-24 bg-orange-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-2/3"></div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <LineChart
              height={400}
              series={[
                { data: pData, label: "Doanh thu", color: '#F97316' },
                { data: uData, label: "Lợi nhuận", color: '#3B82F6' },
              ]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
              margin={{ left: 60, right: 20, top: 40, bottom: 40 }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-orange-600 rounded-3xl p-6 text-white shadow-xl shadow-orange-200 dark:shadow-none relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full transition-transform group-hover:scale-150 duration-700"></div>
            <p className="text-orange-100 text-sm font-medium">Hóa đơn chờ xử lý</p>
            <h2 className="text-4xl font-bold mt-2">{data?.pendding_bill || 0}</h2>
            <div className="mt-6 flex items-center gap-2 text-sm text-orange-100">
              <IoTabletPortrait />
              <span>Cần xử lý ngay lập tức</span>
            </div>
          </div>

          <div className="bg-white dark:bg-navy-800 rounded-3xl p-5 border border-gray-100 dark:border-navy-700 shadow-sm flex-1">
            <h5 className="font-bold text-gray-700 dark:text-white mb-4">Chi tiết trạng thái</h5>
            <div className="space-y-4">
              {[
                { label: "Đã thanh toán", value: data?.total_billed, color: "bg-green-500", icon: <RiBillLine /> },
                { label: "Đã hủy món", value: data?.total_aborted, color: "bg-red-500", icon: <MdOutlineFreeCancellation /> },
                { label: "Món đã hủy", value: data?.total_aborted_dish, color: "bg-orange-500", icon: <MdOutlineNumbers /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-navy-900 border border-transparent hover:border-gray-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.color} text-white`}>{item.icon}</div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.label}</span>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-white">{item.value || 0}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
              <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-1 uppercase tracking-wider">Tiền số lượng hủy</p>
              <p className="text-lg font-bold text-red-700 dark:text-red-500">{validatePriceVND(" " + (data?.total_aborted_money || 0))} đ</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-6 px-4">
          <h4 className="text-xl font-bold text-gray-800 dark:text-white">
            ⭐ Món ăn bán chạy nhất
          </h4>
          <span className="text-sm text-orange-500 font-semibold cursor-pointer hover:underline text-poppins">Xem tất cả</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.isArray(data?.list_dish_hot) &&
            data?.list_dish_hot.slice(0, 3).map((item, index) => (
              <NftCard
                key={index}
                title={item.dish_Name}
                quantity={item.quantity}
                price={validatePriceVND("" + item.selling_Price) + " đ"}
                image={item.image}
              />
            ))}
        </div>
      </div>

      <div className="mt-4 pb-10">
        <div className="flex items-center justify-between mb-6 px-4">
          <h4 className="text-xl font-bold text-gray-800 dark:text-white">
            📉 Món ăn cần đẩy mạnh
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.isArray(data?.list_dish_not_hot) &&
            data?.list_dish_not_hot.slice(0, 3).map((item, index) => (
              <NftCard
                key={index}
                title={item.dish_Name}
                quantity={item.quantity}
                price={validatePriceVND("" + item.selling_Price) + " đ"}
                image={item.image}
                extra="opacity-80 grayscale-[0.3] hover:grayscale-0 transition-all hover:opacity-100"
              />
            ))}
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
