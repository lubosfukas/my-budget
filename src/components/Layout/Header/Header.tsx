import { Button, Layout, PageHeader } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import styles from "./Header.module.less";

const { Header: HeaderAntd } = Layout;

export const Header = ({ onClick }: { onClick: () => void }) => (
  <HeaderAntd className={styles.header} style={{ height: "65px", backgroundColor: "white" }}>
    <PageHeader
      extra={[
        <Button key="3" type="primary">
          Add expense/income
        </Button>,
        <Button key="2">Add transfer</Button>,
        <Button key="1" shape="circle" icon={<MoreOutlined />} onClick={onClick} />,
      ]}
      subTitle="Visa"
      title="Dashboard"
      style={{ width: "100%", padding: "12px 0" }}
    />
  </HeaderAntd>
);
