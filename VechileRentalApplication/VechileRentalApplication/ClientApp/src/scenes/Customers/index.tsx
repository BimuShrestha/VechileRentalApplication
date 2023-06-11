import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Customer } from '../Reservation';

const CustomerPage: React.FC = () => {
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
      sorter: (a: { firstName: string; }, b: { firstName: any; }) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    //   ...getColumnSearchProps('lastName'),
      sorter: (a: { lastName: string; }, b: { lastName: any; }) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    //   ...getColumnSearchProps('email'),
      sorter: (a: { email: string; }, b: { email: any; }) => a.email.localeCompare(b.email),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    //   ...getColumnSearchProps('phone'),
      sorter: (a: { phone: string; }, b: { phone: any; }) => a.phone.localeCompare(b.phone),
    },
  ];

  return (
    <div>
      <h1>Customer List</h1>
      <Table columns={columns} dataSource={customers} />
    </div>
  );
};

export default CustomerPage;
