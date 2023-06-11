import React,{ useState } from 'react';
import { List, Row, Col, Button,Space } from 'antd';
import { Vehicle } from '..';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
interface VehicleListProps {
  vehicles: Vehicle[];
  onEditVehicle: (vehicle: Vehicle) => void;
  loading:boolean;
}

export const VehicleList: React.FC<VehicleListProps> = ({ vehicles, onEditVehicle,loading }) => {
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    loading={loading}
    dataSource={vehicles}
    renderItem={(item) => (
      <List.Item
        key={item.id}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src={item.imageData}
          />
        }
      >
        <List.Item.Meta
          title={item.name}
          description={item.brand}
        />
        {item.detail}
      </List.Item>
    )}
  />
  );
};

export default VehicleList;
