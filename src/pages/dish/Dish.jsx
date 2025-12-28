import { useState } from "react";
import CreateDish from "../components/dish/CreateDish";
import Breadcrumb from "~/components/helper/Breadcrumb";
import ListDish from "../components/dish/ListDish";
import { Button } from "antd";

function Dish() {
  const [openCreate, setOpenCreate] = useState(false);
  const [itemUpdate, setItemUpdate] = useState({});

  const handleOpenCreate = () => {
    setOpenCreate(!openCreate);
  };
  const handleOpenUpdate = (item) => {
    setItemUpdate(item)
    setOpenCreate(true);
  }
  return (
    <div className=" dark:text-white">
      <Breadcrumb items={[{ name: "Thông tin món ăn", href: "" }]} />
      {openCreate && <CreateDish 
      items={itemUpdate ?? null}
       />}
      <Button onClick={handleOpenCreate}>Thêm món ăn</Button>
      <ListDish 
      onUpdate = {handleOpenUpdate}
      />
    </div>
  );
}

export default Dish;
