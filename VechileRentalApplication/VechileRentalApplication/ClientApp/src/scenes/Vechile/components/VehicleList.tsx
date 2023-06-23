import React,{ useState } from 'react';
import { List, Row, Col, Button,Space, Popconfirm } from 'antd';
import { Vehicle } from '..';
// import { LikeOutlined, MessageOutlined, StarOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
interface VehicleListProps {
  vehicles: Vehicle[];
  onEditVehicle: (vehicle: Vehicle, id: any) => void;
  onDeleteVehicle: (id: any) => void;
  loading:boolean;
}

export const VehicleList: React.FC<VehicleListProps> = ({ vehicles, onEditVehicle,loading, onDeleteVehicle }) => {
  const cancel = () => {
  };
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
          // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          <Button style={{color: "#4096ff", borderColor: "#4096ff"}} onClick={() => onEditVehicle(item, item.id)}>Edit</Button>,
          <Popconfirm
          title="Delete the vehicle"
          description="Are you sure to delete this vehicle?"
          onConfirm={() => onDeleteVehicle(item.id)}
          onCancel={() => cancel()}
          okText="Yes"
          cancelText="No"
        >
          <Button danger style={{marginLeft: "-15px"}}>Delete</Button>
        </Popconfirm>,
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
          description={<>
          <span><b>Brand:</b> {item.brand}</span>&emsp;
          <span><b>Type:</b> {item.vehicleType}</span>&emsp;
          <span><b>Fuel:</b> {item.fuelType}</span>
          </>}
        />
        {item.details}
      </List.Item>
    )}
  />
  );
};

export default VehicleList;
