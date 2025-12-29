import { memo, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  InputNumber,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getListAreas } from "../../store/actions/areasAction";
import PropTypes from "prop-types";

const { Title } = Typography;

function DialogCreateTables({ title, open, onClose, onSubmit, items = null }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data: areas } = useSelector((state) => state.area);

  useEffect(() => {
    if (open) {
      dispatch(getListAreas());
      if (items) {
        form.setFieldsValue({
          areaId: items.areaId,
          nameTable: items.nameTable,
          hasHourlyRate: !!items.hasHourlyRate,
          priceOfMunite: items.priceOfMunite || 0,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, items, form, dispatch]);

  const onFinish = (values) => {
    onSubmit({
      ...values,
      id: items?.id || "",
    });
    onClose();
  };

  return (
    <Modal
      title={<Title level={4} style={{ margin: 0 }}>{title}</Title>}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={items ? "Cập nhật" : "Thêm mới"}
      cancelText="Hủy"
      width={500}
      centered
      okButtonProps={{
        className: "bg-orange-600 hover:bg-orange-500 border-none px-6"
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-6"
        initialValues={{ hasHourlyRate: false, priceOfMunite: 0 }}
      >
        <Form.Item
          name="areaId"
          label="Khu vực"
          rules={[{ required: true, message: "Vui lòng chọn khu vực!" }]}
        >
          <Select
            placeholder="Chọn khu vực..."
            size="large"
            options={areas?.map((area) => ({
              label: area.areaName,
              value: area.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="nameTable"
          label="Tên bàn / Phòng"
          rules={[{ required: true, message: "Vui lòng nhập tên bàn!" }]}
        >
          <Input size="large" placeholder="Ví dụ: Bàn 01, VIP 1..." />
        </Form.Item>

        <Form.Item name="hasHourlyRate" valuePropName="checked" noStyle>
          <Checkbox className="mb-4">Bàn tính giá theo giờ</Checkbox>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.hasHourlyRate !== currentValues.hasHourlyRate
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("hasHourlyRate") ? (
              <Form.Item
                name="priceOfMunite"
                label="Giá bàn (VNĐ/Phút)"
                rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
                className="mt-4"
              >
                <InputNumber
                  className="w-full"
                  size="large"
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  placeholder="0"
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </Form>
    </Modal>
  );
}

DialogCreateTables.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  items: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default memo(DialogCreateTables);

