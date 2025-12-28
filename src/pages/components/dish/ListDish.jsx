import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { Button, Modal, Pagination, Tag } from "antd";
import { Image, Select, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import images from "~/assets/images";
import { validatePriceVND } from "~/utils/validatePriceVND";
import LoadingSkeleton from "~/components/loading/LoadingSkeleton";
import dishAction from "~/store/actions/dishAction";
import Search from "antd/es/transfer/search";
import LoadingSyncLoader from "~/components/loading/LoadingSyncLoader";
import { CiLock } from "react-icons/ci";
import useDebounce from "~/hook/useDebounce";
import ImportExcelDish from "./ImportExcelDish";
const { confirm } = Modal;

// eslint-disable-next-line react/prop-types
const ListDish = ({ onUpdate  }) => {
  const columns = [
    {
      title: "Tên món ăn",
      dataIndex: "dish_Name",
      render: (dish_Name) => (
        <span className="font-bold text-gray-800">{dish_Name}</span>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (image) => (
        <Image
          width={90}
          // height={50}
          objectfit="cover"
          className="rounded-lg"
          src={image || images.img_default}
          alt={images.img_default}
          fallback={images.img_default}
        />
      ),
    },
    {
      title: "Giá bán",
      dataIndex: "selling_Price",
      render: (selling_Price) => (
        <span className="font-bold text-red-600">
          {validatePriceVND("" + selling_Price) + " đ"}
        </span>
      ),
      sorter: (a, b) => a.selling_Price - b.selling_Price,
    },
    {
      title: "Giá bán cũ",
      dataIndex: "selling_Price_old",
    },
    {
      title: "Giá gốc",
      dataIndex: "origin_Price",
      render: (origin_Price) => (
        <span className="font-bold text-blue-600">
          {validatePriceVND("" + origin_Price) + " đ"}
        </span>
      ),
      sorter: (a, b) => a.origin_Price - b.origin_Price,
    },
    {
      title: "Thuộc nhóm",
      dataIndex: "menu_groups",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit_Name",
    },

    {
      title: "Hot",
      dataIndex: "is_Hot",
      render: (is_Hot) => (is_Hot ? <Tag color="cyan">Bán chạy</Tag> : ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) =>
        status ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Không hoạt động</Tag>
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
            onClick={() => handleOpenCreate(data)}
            className="font-medium p-2 text-white rounded-md text-[16px] mr-1 bg-[var(--bg-btn-edit)] hover:opacity-70"
          >
            <FaRegEdit />
          </button>
          <button
            onClick={() => handleOpenCreate(data)}
            className="font-medium p-2 text-white rounded-md text-[16px] mr-1 bg-[var(--bg-btn-edit)] hover:opacity-70"
          >
            <CiLock />
          </button>

          <button
            onClick={() => showDeleteConfirm(data)}
            className="font-medium p-2 text-white rounded-md text-[16px]  ml-1 bg-[var(--bg-btn-delete)] hover:opacity-70"
          >
            <MdDeleteOutline />
          </button>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [openModal , setOpenModel] = useState(false)
  const { data: list, loading, update } = useSelector((state) => state.dish);
  const [pagingData, setPagingData] = useState({
    pageIndex: 1,
    pageSize: 10,
    search: "",
  });
  const dispatch = useDispatch();

  const handleOpenCreate = (data) => {
    onUpdate(data);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Tạo hiệu ứng cuộn mượt
    });
  };
  const showDeleteConfirm = (data) => {
    confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc muốn xóa món này không?",
      onOk: () => {
        dispatch(dishAction.deleteDish(data.id));
      },
      onCancel() {},
    });
  };
 
  useEffect(() => {
    if (list && list?.items?.length > 0) {
      const formattedList = list.items.map((item) => ({
        data: item,
        key: item.id, // Id của món ��n+
        dish_Name: item.dish_Name, // Chuyển đổi tên món ăn
        unit_Name: item.unit_Name, // Đơn vị của món ăn
        origin_Price: item.origin_Price, // Giá gốc
        selling_Price: item?.list_price.find((item) => item.status === true)
          ?.selling_price, // Giá bán
        status: item.status, // Trạng thái món ăn
        is_Hot: item.is_Hot, // Món ăn có phải món hot không
        image: item.image, // Ảnh của món ăn
        menu_groups: item.arr_Menu_Group.map((group, index) => (
          <Tag key={index} color="gold">
            {group.name}
          </Tag>
        )),

        selling_Price_old: item.list_price.map((price, index) =>
          price.status ? (
            ""
          ) : (
            <Tag
              // onClick={() => handleChangePrice(item)}
              key={index}
              color="red"
            >
              {validatePriceVND("" + price?.selling_price) + " đ"}
            </Tag>
          )
        ),
      }));
      setData(formattedList);
    } else {
      setData([]);
    }
  }, [list]);

  const scroll = {};
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis: true, // Cho phép xem nội dung tràn ngang
  }));

  (tableColumns[0].fixed = true),
    (tableColumns[tableColumns.length - 1].fixed = "right");
  (scroll.y = 440), (scroll.x = "100vw");

  const handleShowPage = (e) => {
    setPagingData((prev) => ({ ...prev, pageSize: e, pageIndex: 1 }));
  };

  const handleSeachDish = (value) => {
    setPagingData((prev) => ({ ...prev, pageIndex: 1, search: value }));
  };

  const debounce = useDebounce(pagingData, 700);

  useEffect(() => {
    dispatch(dishAction.getListDish(debounce));
  }, [debounce, dispatch]);

  const exportExcel = () => {
    console.log(list.items);

    const exportExcel = list.items.map((item) => {
      return {
        "Tên món ăn": item.dish_Name,
        "Hình ảnh": item.image,
        "Giá bán": validatePriceVND(
          "" +
            item.list_price.find((item) => item.status === true).selling_price
        ),
        "Giá bán cũ ": item.list_price
          .map((price) => {
            if (!price.status) {
              return validatePriceVND("" + price?.selling_price);
            }
            return null; // Trả về null nếu không thoả điều kiện
          })
          .filter((price) => price !== null) // Loại bỏ các giá trị null
          .join(", "),
        "Giá gốc": validatePriceVND("" + item.origin_Price),
        "Thứ tự": item.order,
        "Thuộc nhóm": item.arr_Menu_Group.map((el) => el.name).join(", "),
        "Đơn vị": item.unit_Name,
        Hot: item.is_Hot ? "Bán chạy" : "",
        "Trạng thái": item.status ? "Hoạt động" : "Không hoạt động",
      };
    });
    console.log(exportExcel);

    const worksheet = XLSX.utils.json_to_sheet(exportExcel);

// Định dạng dòng đầu tiên (dòng tiêu đề) in đậm
const range = XLSX.utils.decode_range(worksheet['!ref']); // Lấy phạm vi của sheet
for (let col = range.s.c; col <= range.e.c; col++) {
    const address = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!worksheet[address]) continue;
    worksheet[address].s = { font: { bold: true } }; // In đậm cho các ô ở dòng đầu tiên
}

const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

saveAs(blob, 'danh_sach_san_pham.xlsx');
  };
  return (
    <>
    {
    openModal && <ImportExcelDish
     onCancel={()=>setOpenModel(false)}
     />
    }
      <div className="flex justify-between mb-5 dark:text-white">
        <div>
          <Select
            onChange={(e) => handleShowPage(e)}
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
        <div className="w-1/3 ">
          <Search
            style={{
              backgroundColor: "red",
            }}
            placeholder="Tìm kiếm món ăn"
            loading
            enterButton
            onChange={(e) => handleSeachDish(e.target.value)}
          />
        </div>
        <div className="" aria-hidden>
          <Button onClick={() => setOpenModel(true)} className="bg-green-600 mx-2 text-white">
            Nhập dữ liệu file excel
          </Button>

          <Button
            onClick={() => exportExcel()}
            className="bg-blue-600 text-white"
          >
            Xuất file excel
          </Button>
        </div>
      </div>
      {update && <LoadingSyncLoader />}
      {loading ? (
        <LoadingSkeleton count={pagingData.pageSize} />
      ) : (
        <Table
          // loading={loading}
          showHeader={true}
          tableLayout
          columns={tableColumns}
          dataSource={data ?? []}
          scroll={scroll}
          rowSelection
          locale={{
            triggerAsc: "Sắp xếp tăng dần",
            triggerDesc: "Sắp xếp giảm dần",
            cancelSort: "Bỏ sắp xếp",
          }}
          pagination={false}
        />
      )}

      <Pagination
        className="mt-5"
        showSizeChanger={false}
        current={pagingData?.pageIndex}
        total={list?.totalCount}
        pageSize={pagingData?.pageSize}
        onChange={(curent) =>
          setPagingData((prev) => ({ ...prev, pageIndex: curent }))
        }
        align="end"
      />
    </>
  );
};

export default ListDish;
