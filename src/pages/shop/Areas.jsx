import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdAdd } from "react-icons/md";

import {
  createArea,
  deleteArea,
  getListAreas,
  updateArea,
} from "../../store/actions/areasAction";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import DialogCustom from "../../components/dialog/DialogCustom";
import Breadcrumb from "../../components/helper/Breadcrumb";
import Button from "../../components/buttons/Button";
import { Modal } from "antd";

const {confirm} = Modal
const fields = [
  {
    name: "areaName",
    label: "Khu vực",
    type: "text",
    required: true,
    autoFocus: true,
  },
];

function Areas() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.area);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);

  const [details, setDetails] = useState({});

  useEffect(() => {
    dispatch(getListAreas());
  }, [dispatch]);

  const handleGetDetails = (item) => {
    setDetails(item);
    setOpenDialog(true);
  };

  const handleDialogSubmitCreate = (item) => {
    dispatch(createArea(item));
  };

  const handleDialogSubmit = (data) => {
    dispatch(updateArea(data));
  };
  // delete
  const handleDialogSubmitDelete = (items) => {
    confirm({
      title: "Bạn chắc chắn xóa món ăn này không ?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      centered: true,
      onOk() {
        dispatch(deleteArea(items));
      },
    });
  };
  return (
    <div>
     
      <DialogCustom
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleDialogSubmit}
        item={details}
        fields={fields}
      />

      <DialogCustom
        open={openDialogCreate}
        onClose={() => setOpenDialogCreate(false)}
        onSubmit={handleDialogSubmitCreate}
        item={{ areaName: "" }}
        fields={fields}
      />

      <div>
        <Breadcrumb items={[{ name: "Thông tin khu vực", href: "" }]} />
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div>
          <div className="flex justify-end text-[18px] mb-2">
            <Button
              onClick={() => setOpenDialogCreate(true)}
              rounded={true}
              leftIcon={<MdAdd />}
              className="flex items-center bg-[var(--bg-btn-add)] p-2 text-[var(--textlight)] rounded-sm"
            >
              Thêm khu vực
            </Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Khu vực
                  </th>
                  <th scope="col" className="px-6 py-3 w-[15%] ">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((item, index) => {
                    return (
                      <tr
                        key={item?.id}
                        className="odd:bg-gray-200 even:bg-white border-b "
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {(index += 1)}
                        </th>
                        <td className="px-6 py-4">{item?.areaName}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleGetDetails(item)}
                            className="font-medium p-2 text-white rounded-md text-[16px] mr-1 bg-[var(--bg-btn-edit)] hover:opacity-70 "
                          >
                            <FaRegEdit />
                          </button>
                          <button
                            onClick={() => handleDialogSubmitDelete(item?.id)}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Areas;
