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

  const data:any=[
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "phone": "1234567890",
      "vehicleTypeId": 1,
      "vehicleType": "Sedan"
    },
    {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "janesmith@example.com",
      "phone": "0987654321",
      "vehicleTypeId": 2,
      "vehicleType": "SUV"
    },
    {
      "id": 3,
      "firstName": "Michael",
      "lastName": "Johnson",
      "email": "michaeljohnson@example.com",
      "phone": "9876543210",
      "vehicleTypeId": 1,
      "vehicleType": "Sedan"
    },
    {
      "id": 4,
      "firstName": "Emily",
      "lastName": "Williams",
      "email": "emilywilliams@example.com",
      "phone": "5678901234",
      "vehicleTypeId": 3,
      "vehicleType": "Truck"
    },
    {
      "id": 5,
      "firstName": "David",
      "lastName": "Brown",
      "email": "davidbrown@example.com",
      "phone": "7890123456",
      "vehicleTypeId": 2,
      "vehicleType": "SUV"
    },
    {
      "id": 6,
      "firstName": "Olivia",
      "lastName": "Taylor",
      "email": "oliviataylor@example.com",
      "phone": "3456789012",
      "vehicleTypeId": 1,
      "vehicleType": "Sedan"
    },
    {
      "id": 7,
      "firstName": "James",
      "lastName": "Anderson",
      "email": "jamesanderson@example.com",
      "phone": "9012345678",
      "vehicleTypeId": 2,
      "vehicleType": "SUV"
    },
    {
      "id": 8,
      "firstName": "Sophia",
      "lastName": "Clark",
      "email": "sophiaclark@example.com",
      "phone": "2345678901",
      "vehicleTypeId": 3,
      "vehicleType": "Truck"
    },
    {
      "id": 9,
      "firstName": "Daniel",
      "lastName": "Lewis",
      "email": "daniellewis@example.com",
      "phone": "6789012345",
      "vehicleTypeId": 1,
      "vehicleType": "Sedan"
    },
    {
      "id": 10,
      "firstName": "Ava",
      "lastName": "Walker",
      "email": "avawalker@example.com",
      "phone": "0123456789",
      "vehicleTypeId": 2,
      "vehicleType": "SUV"
    },
    {
      "id": 11,
      "firstName": "William",
      "lastName": "Hall",
      "email": "williamhall@example.com",
      "phone": "4567890123",
      "vehicleTypeId": 1,
      "vehicleType": "Sedan"
    },
    {
      "id": 12,
      "firstName": "Mia",
      "lastName": "Young",
      "email": "miayoung@example.com",
      "phone": "8901234567",
      "vehicleTypeId": 3,
      "vehicleType": "Truck"
    },
    {
      "id": 13,
      "firstName": "Benjamin",
      "lastName": "Lee",
      "email": "benjaminlee@example.com",
      "phone": "2345678901",
      "vehicleTypeId": 2,
      "vehicleType": "SUV"
    },
    {
      "id": 14,
      "firstName": "Evelyn",
      "lastName": "Harris",
      "email": "evelynharris@example.com",
      "phone": "6789012345",
      "vehicleTypeId": 1,
      "vehicleType": "Sedan"
    },
    {
      "id": 15,
      "firstName": "Alexander",
      "lastName": "King",
      "email": "alexanderking@example.com",
      "phone": "0123456789",
      "vehicleTypeId": 3,
      "vehicleType": "Truck"
    },
    {
      "id": 16,
      "firstName": "Chloe",
      "lastName": "Scott",
      "email": "chloescott@example.com",
      "phone": "4567890123",
      "vehicleTypeId": 1,
      "vehicleType": "Sedan"
    },
    {
      "id": 17,
      "firstName": "Daniel",
      "lastName": "Wright",
      "email": "danielwright@example.com",
      "phone": "8901234567",
      "vehicleTypeId": 2,
      "vehicleType": "SUV"
    },
    {
      "id": 18,
      "firstName": "Harper",
      "lastName": "Martin",
      "email": "harpermartin@example.com",
      "phone": "2345678901",
      "vehicleTypeId": 1,
      "vehicleType": "Sedan"
    },
    {
      "id": 19,
      "firstName": "Joseph",
      "lastName": "Adams",
      "email": "josephadams@example.com",
      "phone": "6789012345",
      "vehicleTypeId": 3,
      "vehicleType": "Truck"
    },
    {
      "id": 20,
      "firstName": "Mila",
      "lastName": "Thomas",
      "email": "milathomas@example.com",
      "phone": "0123456789",
      "vehicleTypeId": 1,
      "vehicleType": "Sedan"
    }
  ]
  

  return (
    <div>
      <h1>Driver List</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default DriverPage;
