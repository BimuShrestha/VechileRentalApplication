import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Select } from 'antd';
import { Vehicle } from '../Vechile';
import VehicleInfoModal from './components/VehicleInfo';
import DriverInfoModal from './components/DriverInfo';
import CustomerInfoModal from './components/CustomerInfo';
import useAxios from '../../lib/axios/useAxios';
import moment from 'moment';

// ... other imports

const statusOptions = [
  { id: 1, name: 'Pending' },
  { id: 2, name: 'Cancel' },
  { id: 3, name: 'Approved' },
  { id: 4, name: 'Done' }
];

interface Reservation {
  id: number;
  vehicleId: number;
  customerId: number;
  reservationStartDate: string;
  reservationEndDate: string;
  isDriverRequired: boolean;
  driverId?: number;
  reservationStatusId: string;
}
export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  licenseImage: string;
  email: string;
  phone: string;
  vehicleType: string;
}
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const ReservationPage = (props: any) => {
  const { isCustomer, data } = props;
  debugger;

  const [{ data: reservations, loading }, makeRequest] = useAxios({ url: "/api/reservations", method: "GET", params: { customerId: isCustomer ? data.id : null } });
  const [customers, setCustomers] = useState<Customer[]>([
    // ... initial state with dummy data or fetched from API
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // ...

  const [drivers, setDrivers] = useState<Driver[]>([
    // ... initial state with dummy data or fetched from API
  ]);

  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);


  // const [reservations, setReservations] = useState<Reservation[]>(initialReservations);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a: Reservation, b: Reservation) => a.id - b.id,
      // add a filter on the ID field
      // filters: reservations.map((res: any) => ({ text: res.id, value: res.id })),
      // onFilter: (value: any, record: Reservation) => record.id === value,
    },
    {
      title: 'Vehicle Name',
      dataIndex: 'vehicle',
      // sorter: (a: Reservation, b: Reservation) => a.id - b.id,
      render: (record: any) => record.name
    },
    {
      title: 'Vehicle Details',
      dataIndex: 'vehicle',
      // sorter: (a: Reservation, b: Reservation) => a.id - b.id,
      render: (record: any) => record.details
    },
    // ... other columns
    {
      title: 'Reservation Status',
      dataIndex: 'reservationStatusId',
      render: (text: any, record: Reservation) => (
        <Select
          defaultValue={record.reservationStatusId}
          // onChange={(value: string) =>
          //   setReservations(reservations.map(res =>
          //     res.id === record.id ? { ...res, reservationStatusId: value } : res
          //   ))
          // }
        >
          {statusOptions.map(option => (
            <Select.Option key={option.id} value={option.id}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      ),
      filters: statusOptions.map(status => ({ text: status, value: status })),
      onFilter: (value: any, record: Reservation) => record.reservationStatusId === value,
    },
    {
      title: 'Reservation Start Date',
      dataIndex: 'reservationStartDate',
      render: (startDate: any) => startDate && moment(startDate).format("MM-DD-YYYY"),
      sorter: (a: Reservation, b: Reservation) => new Date(a.reservationStartDate).getTime() - new Date(b.reservationStartDate).getTime(),
    },
    {
      title: 'Reservation End Date',
      dataIndex: 'reservationEndDate',
      render: (endDate: any) => endDate && moment(endDate).format("MM-DD-YYYY"),
      sorter: (a: Reservation, b: Reservation) => new Date(a.reservationEndDate).getTime() - new Date(b.reservationEndDate).getTime(),
    },
    {
      title: 'Driver Needed',
      dataIndex: 'isDriverRequired',
      render: (isDriverRequired: boolean) => isDriverRequired ? 'Yes' : 'No',
      filters: [
        { text: 'Yes', value: true },
        { text: 'No', value: false },
      ],
      onFilter: (value: any, record: Reservation) => record.isDriverRequired === value,
    },
    {
      title: 'Driver',
      dataIndex: 'driverId',
      render: (driverId: number | undefined) => {
        const driver = drivers.find(d => d.id === driverId);
        return driver ? (
          <a onClick={() => setSelectedDriver(driver)}>{driver.firstName} {driver.lastName}</a>
        ) : 'No driver assigned';
      },
      sorter: (a: Reservation, b: Reservation) => {
        const driverA = drivers.find(d => d.id === a.driverId);
        const driverB = drivers.find(d => d.id === b.driverId);
        return (driverA?.firstName || '').localeCompare(driverB?.firstName || '');
      },
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      render: (record: any) => {
        return record ? (
          <a onClick={() => setSelectedCustomer(record)}>{record.userName}</a>
        ) : 'No customer assigned';
      },
      sorter: (a: Reservation, b: Reservation) => {
        const customerA = customers.find(c => c.id === a.customerId);
        const customerB = customers.find(c => c.id === b.customerId);
        return (customerA?.firstName || '').localeCompare(customerB?.firstName || '');
      },
      filters: Array.from(new Set(customers.map(c => c.lastName))).map(name => ({ text: name, value: name })),
      onFilter: (value: any, record: Reservation) => {
        const customer = customers.find(c => c.id === record.customerId);
        return customer?.lastName === value;
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={reservations} loading={loading}/>
      {selectedVehicle && (
        <></>
        // <VehicleInfoModal
        //   visible={Boolean(selectedVehicle)}
        //   // vehicle={selectedVehicle}
        //   onClose={() => setSelectedVehicle(null)}
        // />
      )}
      {selectedDriver && <DriverInfoModal
        visible={Boolean(selectedDriver)}
        driver={selectedDriver}
        onClose={() => setSelectedDriver(null)}
      />}
      {selectedCustomer && <CustomerInfoModal
        visible={Boolean(selectedCustomer)}
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />}
    </div>

  );
};

export default ReservationPage;
