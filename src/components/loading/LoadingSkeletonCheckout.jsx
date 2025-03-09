import { Skeleton, Row, Col, Card, Divider, Space, } from "antd";

function CheckoutSkeleton() {
  return (
    <div style={{ padding: "20px" }}>
      <Skeleton.Input active style={{ width: 200, height: 30 }} />
      <Card bordered={false} style={{ margin: "0 auto", borderRadius: "10px" }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Skeleton active paragraph={{ rows: 1, width: [150, 250] }} />
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Skeleton.Input active style={{ width: 200 }} />
            <Skeleton.Input active style={{ width: 150 }} />
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Skeleton.Input active style={{ width: 150 }} />
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Skeleton.Input active style={{ width: 150 }} />
          </Col>
        </Row>

        <Divider />

        <Skeleton active paragraph={{ rows: 3 }} />

        <Divider />

        <Row justify="space-between" style={{ marginTop: "20px" }}>
          <Col>
            <Skeleton.Input active style={{ width: 150 }} />
          </Col>
          <Col>
            <Skeleton.Input active style={{ width: 150 }} />
          </Col>
        </Row>

        <Divider />

        <Space size="large" style={{ display: "flex", justifyContent: "center" }}>
          <Skeleton.Button active size="large" />
          <Skeleton.Button active size="large" />
          <Skeleton.Button active size="large" />
        </Space>
      </Card>
    </div>
  );
}

export default CheckoutSkeleton;
