/* eslint-disable react/prop-types */
import { Card, Image, Table, Typography } from "antd";
const { Title } = Typography;
function ReportDetail({data}) {
    const columns = [
        {
          title: "Hình ảnh",
          dataIndex: "image",
          key: "image",
          render: (image) =>
            image ? (
              <Image
                src={image}
                alt="dish"
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
              />
            ) : (
              <span>Không có ảnh</span>
            ),
        },
        {
          title: "Tên món ăn",
          dataIndex: "dish_name",
          key: "dish_name",
        },
        {
          title: "Số lượng",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Ghi chú",
          dataIndex: "notes",
          key: "notes",
          render: (notes) => notes || "Không có ghi chú",
        },
        {
          title: "Giá",
          dataIndex: "price",
          key: "price",
          render: (price) => `${price.toLocaleString()} VND`,
        },
      ];

      return (
        <Card style={{ margin: 20, padding: 20 }}>
          <Title level={3}>Danh sách món ăn</Title>
          <Table
            dataSource={data?.list_item.map((item, index) => ({
              key: index,
              ...item,
            }))}
            columns={columns}
            pagination={false}
          />
          <div style={{ marginTop: 20 }}>
            <p>
              <b>Phương thức thanh toán:</b> {data?.payment_method}
            </p>
            <p>
              <b>Mô tả:</b> {data.description || "Không có mô tả"}
            </p>
            <p>
              <b>Ngày thanh toán:</b> {data.payment_date || "Chưa thanh toán"}
            </p>
          </div>
        </Card>
      );
}

export default ReportDetail;