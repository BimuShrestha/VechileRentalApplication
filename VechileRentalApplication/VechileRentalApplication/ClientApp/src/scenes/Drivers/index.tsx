import React, { useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Driver } from '../Reservation';

const DriverPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    // Initial driver data or data fetched from an API
  ]);

  const columns: ColumnsType<Driver> = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicleTypeId',
      render: (vehicleTypeId: number, record: Driver) => record.vehicleType,
      sorter: (a, b) => a.vehicleType.localeCompare(b.vehicleType),
    },
    // Similarly, implement Attachment column
  ];

  return (
    <div>
      <h1>Driver List</h1>
      <Table columns={columns} dataSource={drivers} />
    </div>
  );
};

export default DriverPage;
