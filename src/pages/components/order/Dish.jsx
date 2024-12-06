import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import Search from "antd/es/transfer/search";
import { Button, Flex, Image, Pagination, Select, Table } from "antd";
import { BiDish } from "react-icons/bi";

import useDebounce from "../../../hook/useDebounce";
import { getAllNameMenuGroup } from "../../../store/actions/menuGroupAction";
import LoadingSkeleton from "../../../components/loading/LoadingSkeleton";
import dishAction from "../../../store/actions/dishAction";
import { validatePriceVND } from "../../../utils/validatePriceVND";
import images from "../../../assets/images";
import PropTypes from "prop-types";

const columns = [
  {
    title: "Tên món ăn",
    dataIndex: "dish_Name",
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
  },
  {
    title: "Giá bán",
    dataIndex: "selling_Price",
  },
];

function Dish({ onSubmit }) {
  const dishpatch = useDispatch();
  const { data, loading } = useSelector((state) => state.menuGroup);
  const { dish_menugroup: listDish, loading: loadingDish } = useSelector(
    (state) => state.dish
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [payload, setPayload] = useState({
    pageSize: 10,
    pageIndex: 1,
    menuGroupId: null,
  });

  const debounce = useDebounce(search, 700);

  useEffect(() => {
    if (listDish?.items) {
      const dataSource = listDish.items.map((item) => {
        return {
          key: item.id,
          dish_Name: item.dish_Name,
          image: (
            <Image
              width={100}
              height={70}
              src={item.image || images.img_default}
              fallback={images.img_default}
            />
          ),
          selling_Price: validatePriceVND("" + item.selling_Price) + "đ",
        };
      });
      setDataSource(dataSource);
    }
  }, [listDish?.items]);

  useEffect(() => {
    dishpatch(getAllNameMenuGroup());
  }, [dishpatch]);

  useEffect(() => {
    dishpatch(
      dishAction.getDishByMenugroup({
        pageSize: payload.pageSize,
        pageIndex: payload.pageIndex,
        search: debounce,
        menuGroupId: payload.menuGroupId,
      })
    );
  }, [dishpatch, payload, debounce]);

  const handleOk = useCallback(() => {
    if (onSubmit) {
      onSubmit(selectedRows); // Gửi danh sách món ăn được chọn ra ngoài
    }
  }, [onSubmit, selectedRows]);

  const selectedRowKeys = selectedRows.map((record) => record.key);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRecords) => {
      setSelectedRows(selectedRecords);
    },
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className="grid grid-cols-5 grid-rows-1 gap-4">
      <div className="col-span-4">
        <div className="flex justify-between mb-2">
          <div>
            <Select
              onChange={(value) =>
                setPayload((prev) => ({ ...prev, pageSize: value }))
              }
              defaultValue={10}
              options={[
                { value: 5, label: "5/Trang" },
                { value: 10, label: "10/Trang" },
                { value: 20, label: "20/Trang" },
                { value: 50, label: "40/Trang" },
              ]}
              style={{ width: 100 }}
            />
          </div>
          <div>
            <Search
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm tên món ăn"
            />
          </div>
        </div>
        <div>
          {loadingDish ? (
            <LoadingSkeleton height={25} count={10} />
          ) : (
            <Flex gap="middle" vertical>
              <Flex align="center" gap="middle">
                {hasSelected
                  ? `Lựa chọn ${selectedRowKeys.length} món ăn`
                  : null}
              </Flex>
              <Table
                onRow={(record) => {
                  return {
                    onClick: () => {
                      const isSelected = selectedRowKeys.includes(record.key);

                      // Nếu record đã được chọn, loại bỏ khỏi danh sách
                      if (isSelected) {
                        setSelectedRows(
                          selectedRows.filter((row) => row.key !== record.key)
                        );
                      } else {
                        setSelectedRows([...selectedRows, record]);
                      }
                    },
                  };
                }}
                sticky={true}
                tableLayout={true}
                pagination={false}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
                scroll={{ y: 400 }}
              />
            </Flex>
          )}
          <div className="mt-2">
            <Pagination
              align="center"
              defaultCurrent={1}
              total={listDish?.totalPages}
              onChange={(value) =>
                setPayload((prev) => ({ ...prev, pageIndex: value }))
              }
              pageSize
            />
          </div>
            <div className="flex justify-end">
            <Button className="bg-[var(--primary)] text-[var(--textlight)] px-8 py-2" onClick={handleOk}><BiDish/> Thêm món</Button>
            </div>
        </div>
      </div>
      <div className="col-start-5">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="mt-8 relative flex flex-col bg-scroll max-h-[450px] border-l-2 overflow-y-auto p-3 scrollbar-none">
            <b className="text-center">Thuộc nhóm món</b>
            {data.length > 0 &&
              data.map((item) => {
                return (
                  <Button
                    onClick={() => {
                      payload.menuGroupId == item.id
                        ? setPayload((prev) => ({ ...prev, menuGroupId: "" }))
                        : setPayload((prev) => ({
                            ...prev,
                            menuGroupId: item.id,
                          }));
                    }}
                    className={`my-2 ${
                      payload.menuGroupId == item.id
                        ? "bg-[var(--primary)] text-[var(--textlight)]"
                        : ""
                    }`}
                    key={item.id}
                  >
                    {item.name}
                  </Button>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
Dish.propTypes = {
  onSubmit: PropTypes.func,
};
export default Dish;
