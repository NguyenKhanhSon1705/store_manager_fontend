import { TextField } from "@mui/material";
import { useCallback, useLayoutEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Pagination, Select } from "antd";

import images from "../../assets/images";
import Button from "../../components/buttons/Button";
import DialogMenuGroup from "../../components/dialog/DialogMenuGroup";
import Breadcrumb from "../../components/helper/Breadcrumb";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import {
  createMenuGroup,
  deleteMenuGroup,
  getAllMenuGroup,
  updateMenuGroup,
} from "../../store/actions/menuGroupAction";
import LoadingSyncLoader from "../../components/loading/LoadingSyncLoader";

const { confirm } = Modal;
function GroupMenu() {
  const dispatch = useDispatch();
  const { data, loading, update } = useSelector((state) => state.menuGroup);
  const [openDialog, setOpenDialog] = useState({ open: false, items: {} });
  const [showPage, setShowPage] = useState({
    pageIndex: 1,
    search: "",
    limit: 5,
    index: 1,
  });

  useLayoutEffect(() => {
    dispatch(getAllMenuGroup(showPage));
  }, [showPage, dispatch]);

  const handleOpenCreate = (items) => {
    setOpenDialog({ open: true, items: items });
  };

  const handleCloseDialog = useCallback(() => {
    setOpenDialog({ open: false });
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

  const handleSubmitDelete = (items) => {
    confirm({
      title: "Bạn chắc chắn xóa nhóm món ăn này không ?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      centered: true,
      onOk() {
        dispatch(deleteMenuGroup(items));
      },
    });
  };

  const handlePaging = (value) => {
    setShowPage((prev) => ({
      ...prev,
      pageIndex: value,
      index: showPage.limit * value - showPage.limit,
    }));
  };
  const handleShowPage = (value) => {
    setShowPage((prev) => ({ ...prev, limit: value, pageIndex: 1, index: 1 }));
  };

  return (
    <div>
      {update && <LoadingSyncLoader />}

      <DialogMenuGroup
        open={openDialog.open}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        items={openDialog.items}
      />

      <Breadcrumb items={[{ name: "Thông tin nhóm món", href: "" }]} />

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
            onChange={(e) =>
              setShowPage((prev) => ({ ...prev, search: e.target.value }))
            }
            value={showPage.search}
          />
        </div>
        <div className="mb-5 text-[18px]" aria-hidden>
          <Button
            onClick={handleOpenCreate}
            rounded={true}
            leftIcon={<MdAdd />}
            className="flex items-center bg-[var(--bg-btn-add)] p-2 text-[var(--textlight)] rounded-sm"
          >
            Thêm
          </Button>
        </div>
      </div>
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
              <th scope="col" className="px-4 py-3 w-[15%]">
                Thứ tự
              </th>
              <th scope="col" className="px-4 py-3 w-[15%]">
                Trạng thái
              </th>
              <th scope="col" className="px-4 py-3 w-[15%]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <LoadingSkeleton height={50} count={showPage.limit} />
                </td>
              </tr>
            ) : (
              data?.items?.length > 0 &&
              data?.items.map((item, index) => {
                return (
                  <tr
                    key={item?.id}
                    className="odd:bg-gray-200 even:bg-white border-b "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {showPage.index + index + 1}
                    </th>
                    <td className="px-4 py-3">{item?.name}</td>
                    <td className="px-4 py-3 ">
                      <img
                        className="w-[100px] h-[50px] object-cover rounded-md"
                        src={item?.image || images.img_default}
                        alt={item?.name}
                      />
                    </td>
                    <td className="px-4 py-3 ">{item?.order}</td>
                    <td className="px-4 py-3 ">
                      {item?.status ? (
                        <p className="flex w-1/4 h-5 me-3 ml-2 bg-green-500 rounded-full"></p>
                      ) : (
                        <p className="flex w-1/4 h-5 me-3 ml-2 bg-red-500 rounded-full"></p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleOpenCreate(item)}
                        className="font-medium p-2 text-white rounded-md text-[16px] mr-1 bg-[var(--bg-btn-edit)] hover:opacity-70 "
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => handleSubmitDelete(item?.id)}
                        className="font-medium p-2 text-white rounded-md text-[16px]  ml-1 bg-[var(--bg-btn-delete)] hover:opacity-70"
                      >
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div className="p-4 float-end">
          <Pagination
            defaultCurrent={showPage.pageIndex}
            total={data.totalPages}
            onChange={(value) => handlePaging(value)}
            pageSize
          />
        </div>
      </div>
    </div>
  );
}

export default GroupMenu;
