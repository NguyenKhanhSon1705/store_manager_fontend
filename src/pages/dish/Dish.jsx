import { Button, Checkbox, Image, Pagination, Select,Modal } from "antd";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import CreateDish from "../components/dish/CreateDish";
import Breadcrumb from "~/components/helper/Breadcrumb";
import dishAction from "../../store/actions/dishAction";
import LoadingSyncLoader from "../../components/loading/LoadingSyncLoader";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import images from "../../assets/images";
import { validatePriceVND } from "~/utils/validatePriceVND";

const { confirm } = Modal;
function Dish() {
  const [openCreate, setOpenCreate] = useState(true);
  const [itemUpdate , setItemUpdate] = useState({})
  const [showPage, setShowPage] = useState({
    pageIndex: 1,
    search: "",
    limit: 5,
    index: 1,
  });

  const { data, loading, update } = useSelector((state) => state.dish);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch( dishAction.getListDish({ pageIndex: 1, pageSize: 10, search: "" }));
  }, [dispatch]);

  const handleShowPage = (value) => {
    setShowPage((prev) => ({ ...prev, limit: value, pageIndex: 1, index: 1 }));
  };

  
  const showDeleteConfirm = (item) => {
    confirm({
      title: 'Bạn chắc chắn xóa món ăn này không ?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      centered:true,
      onOk() {
        dispatch(dishAction.deleteDish(item))
      }
    });
  };

  const handleOpenCreate = (item) =>{
    setItemUpdate(item)
  }
  return (
    <div>
      <Breadcrumb items={[{ name: "Thông tin món ăn", href: "" }]} />
      {openCreate && <CreateDish items = {itemUpdate} />}
      {update && <LoadingSyncLoader />}
      <div className="flex justify-between mb-5">
        <div className="flex items-center">
          <Select
            onChange={(e) => handleShowPage(e)}
            defaultValue={5}
            style={{ width: 100 }}
            options={[
              { value: 5, label: "5/Trang" },
              { value: 10, label: "10/Trang" },
              { value: 20, label: "20/Trang" },
            ]}
          />
        </div>
        <div className="w-1/4 ">
          <TextField
            id="standard-basic"
            label="Tìm kiếm"
            fullWidth
            variant="standard"
            // onChange={e => setShowPage(prev=> ({...prev, search:e.target.value}))}
            // value={showPage.search}
          />
        </div>
        <div className="mb-5 text-[18px]" aria-hidden>
          <Button
            onClick={() => setOpenCreate(!openCreate)}
            className="bg-[var(--primary)] text-[var(--textlight)]"
          >
            {openCreate ? "Ẩn" : "Thêm món ăn"}
          </Button>
        </div>
      </div>
      {loading ? (
        <LoadingSkeleton count={showPage.limit} />
      ) : (
        <div className="relative overflow-x-auto sm:rounded-md">
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-4 py-3">
                  #
                </th>
                <th scope="col" className="px-4 py-3">
                  Tên thực đơn
                </th>
                <th scope="col" className="px-4 py-3">
                  Hình ảnh
                </th>
                <th scope="col" className="px-4 py-3">
                  Thuộc nhóm
                </th>
                <th scope="col" className="px-4 py-3">
                  Giá bán
                </th>

                <th scope="col" className="px-4 py-3 w-[10%]">
                  Thứ tự
                </th>
                <th scope="col" className="px-4 py-3 w-[5%]">
                  Hot
                </th>

                <th scope="col" className="px-4 py-3 w-[10%]">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.items?.length > 0 &&
                data?.items?.map((item, index) => {
                  return (
                    <tr
                      key={item?.id}
                      className="odd:bg-gray-200 even:bg-white border-b "
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {showPage.index + index}
                      </th>
                      <td className="px-4 py-3">{item?.dish_Name}</td>
                      <td className="px-4 py-3 ">
                        <Image
                          width={90}
                          height={50}
                          objectfit="cover"
                          className="rounded-lg"
                          src={item?.image || images.img_default}
                          alt={item?.dish_Name}
                          fallback= {images.img_default}
                        />
                      </td>
                      <td className="px-4 py-3 ">
                        {item?.arr_Menu_Group.map((i) => i.name + ", ")}
                      </td>
                      <td className="px-4 py-3 text-red-500">
                        {validatePriceVND("" + item?.selling_Price)} đ
                      </td>
                      <td className="px-4 py-3 ">{item?.order}</td>
                      <td className="px-4 py-3 ">
                        <Checkbox checked={item?.is_Hot}></Checkbox>
                      </td>
                      <td className="px-4 py-3">
                        <button
                            onClick={() => handleOpenCreate(item)}
                          className="font-medium p-2 text-white rounded-md text-[16px] mr-1 bg-[var(--bg-btn-edit)] hover:opacity-70 "
                        >
                          <FaRegEdit />
                        </button>
                        
                        <button
                            onClick={() => showDeleteConfirm(item)}
                          className="font-medium p-2 text-white rounded-md text-[16px]  ml-1 bg-[var(--bg-btn-delete)] hover:opacity-70"
                        >
                          <MdDeleteOutline />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="p-4 float-end">
            <Pagination defaultCurrent={1} total={data?.totalCount} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dish;
