import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Customer } from '../Reservation';

const CustomerPage = (props: any) => {
  const [customers, setCustomers] = useState
  <Customer[]>([
    // Initial customer data or data fetched from an API
  ]);

  const [searchText, setSearchText] = useState<string>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
    //   if (visible) {
    //     setTimeout(() => searchInput?.select(), 100);
    //   }
    },
    render: (text: any) => searchedColumn === dataIndex ? (
      <span style={{ fontWeight: 'bold' }}>{text}</span>
    ) : (
      text
    ),
  });

  const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
    //   ...getColumnSearchProps('firstName'),
      sorter: (a: { firstName: string; }, b: { firstName: string; }) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    //   ...getColumnSearchProps('lastName'),
      sorter: (a: { lastName: string; }, b: { lastName: string; }) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    //   ...getColumnSearchProps('email'),
      sorter: (a: { email: string; }, b: { email: string; }) => a.email.localeCompare(b.email),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    //   ...getColumnSearchProps('phone'),
      sorter: (a: { phone: string; }, b: { phone: string; }) => a.phone.localeCompare(b.phone),
    },
  ];
 const data= [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890"
    },
    {
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "phone": "9876543210"
    },
    {
      "firstName": "Michael",
      "lastName": "Johnson",
      "email": "michael.johnson@example.com",
      "phone": "4567890123"
    },
    {
      "firstName": "Emily",
      "lastName": "Williams",
      "email": "emily.williams@example.com",
      "phone": "7890123456"
    },
    {
      "firstName": "David",
      "lastName": "Brown",
      "email": "david.brown@example.com",
      "phone": "2345678901"
    },
    {
      "firstName": "Olivia",
      "lastName": "Taylor",
      "email": "olivia.taylor@example.com",
      "phone": "9012345678"
    },
    {
      "firstName": "James",
      "lastName": "Anderson",
      "email": "james.anderson@example.com",
      "phone": "5678901234"
    },
    {
      "firstName": "Sophia",
      "lastName": "Clark",
      "email": "sophia.clark@example.com",
      "phone": "3456789012"
    },
    {
      "firstName": "Daniel",
      "lastName": "Lewis",
      "email": "daniel.lewis@example.com",
      "phone": "8901234567"
    },
    {
      "firstName": "Ava",
      "lastName": "Walker",
      "email": "ava.walker@example.com",
      "phone": "6789012345"
    },
    {
      "firstName": "William",
      "lastName": "Hall",
      "email": "william.hall@example.com",
      "phone": "0123456789"
    },
    {
      "firstName": "Mia",
      "lastName": "Young",
      "email": "mia.young@example.com",
      "phone": "4567890123"
    },
    {
      "firstName": "Benjamin",
      "lastName": "Lee",
      "email": "benjamin.lee@example.com",
      "phone": "7890123456"
    },
    {
      "firstName": "Evelyn",
      "lastName": "Harris",
      "email": "evelyn.harris@example.com",
      "phone": "2345678901"
    },
    {
      "firstName": "Alexander",
      "lastName": "King",
      "email": "alexander.king@example.com",
      "phone": "9012345678"
    },
    {
      "firstName": "Chloe",
      "lastName": "Scott",
      "email": "chloe.scott@example.com",
      "phone": "5678901234"
    },
    {
      "firstName": "Daniel",
      "lastName": "Wright",
      "email": "daniel.wright@example.com",
      "phone": "3456789012"
    },
    {
      "firstName": "Harper",
      "lastName": "Martin",
      "email": "harper.martin@example.com",
      "phone": "8901234567"
    },
    {
      "firstName": "Joseph",
      "lastName": "Adams",
      "email": "joseph.adams@example.com",
      "phone": "6789012345"
    },
    {
      "firstName": "Mila",
      "lastName": "Thomas",
      "email": "mila.thomas@example.com",
      "phone": "0123456789"
    }
  ]
  

  return (
    <div>
      <h1>Customer List</h1>
      <Table columns={columns} dataSource={data.reverse()} />
    </div>
  );
};

export default CustomerPage;
