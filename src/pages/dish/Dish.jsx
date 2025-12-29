import { useState, useCallback } from "react";
import CreateDish from "../components/dish/CreateDish";
import Breadcrumb from "~/components/helper/Breadcrumb";
import ListDish from "../components/dish/ListDish";
import { Button, Card, Space } from "antd";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import dishAction from "~/store/actions/dishAction";

function Dish() {
  const [openModal, setOpenModal] = useState(false);
  const [itemUpdate, setItemUpdate] = useState(null);
  const dispatch = useDispatch();

  const handleOpenCreate = () => {
    setItemUpdate(null);
    setOpenModal(true);
  };

  const handleOpenUpdate = (item) => {
    setItemUpdate(item);
    setOpenModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setItemUpdate(null);
  }, []);

  const handleSubmit = (values) => {
    // The actual dispatch is currently handled inside CreateDish or we can move it here.
    // For now, looking at existing CreateDish logic, it dispatches internally.
    // However, moving dispatch here makes CreateDish reusable.
    // Let's stick to the prop passing pattern: CreateDish handles the form rendering, 
    // but let the parent or the component itself handle logic.
    // Given the plan to refactor CreateDish to be a Modal content, 
    // I will let CreateDish handle the submission logic internally or pass a callback.
    // For simplicity in refactor, let's keep dispatch in CreateDish for now or refactor to consistent pattern.
    // "Refactor Dish Management UI" plan said "Render CreateDish inside an Ant Design Modal".

    // I will actually structure CreateDish to be the Modal itself (like DialogMenuGroup), 
    // or a component inside a Modal in Dish.jsx. 
    // Let's make CreateDish the Modal component to keep Dish.jsx clean.
    // So here I just pass logic.
  };

  return (
    <div className="flex flex-col gap-4 p-2 h-full">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <Breadcrumb items={[{ name: "Quản lý món ăn", href: "" }]} />
        <Button
          type="primary"
          icon={<MdAdd size={20} />}
          onClick={handleOpenCreate}
          className="bg-gradient-to-r from-orange-500 to-red-500 border-0 shadow-md shadow-orange-200"
          size="large"
        >
          Thêm món ăn
        </Button>
      </div>

      <CreateDish
        open={openModal}
        onCancel={handleCloseModal}
        item={itemUpdate}
      />

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <ListDish onUpdate={handleOpenUpdate} />
      </div>
    </div>
  );
}

export default Dish;

