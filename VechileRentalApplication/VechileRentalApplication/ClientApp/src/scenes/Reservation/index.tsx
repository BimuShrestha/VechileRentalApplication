import React, { useState } from 'react';
import { Table, Tag, Space, Select } from 'antd';
import { Vehicle } from '../Vechile';
import VehicleInfoModal from './components/VehicleInfo';
import DriverInfoModal from './components/DriverInfo';
import CustomerInfoModal from './components/CustomerInfo';

// ... other imports

const statusOptions = ['Pending', 'Cancel', 'InProgress', 'Approved', 'Done'];

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
  export  interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }

const ReservationPage = () => {
    
   
      
      // ...
      
      const [customers, setCustomers] = useState<Customer[]>([
        // ... initial state with dummy data or fetched from API
      ]);
      
      const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
      
      // ...
      
      const [drivers, setDrivers] = useState<Driver[]>([
        // ... initial state with dummy data or fetched from API
      ]);
      
      const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
      
    const initialReservations: Reservation[] = [
        {
          id: 1,
          vehicleId: 1,
          customerId: 123,
          reservationStartDate: "2023-06-01",
          reservationEndDate: "2023-06-10",
          isDriverRequired: false,
          driverId: 1,
          reservationStatusId: "Pending"
        },
        {
          id: 2,
          vehicleId: 2,
          customerId: 456,
          reservationStartDate: "2023-06-05",
          reservationEndDate: "2023-06-15",
          isDriverRequired: true,
          driverId: 789,
          reservationStatusId: "Approved"
        },
        {
          id: 3,
          vehicleId: 1,
          customerId: 789,
          reservationStartDate: "2023-06-10",
          reservationEndDate: "2023-06-20",
          isDriverRequired: true,
          driverId: 123,
          reservationStatusId: "InProgress"
        },
        // add as many reservations as you like
      ];
      
      const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
      
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      name: 'Vehicle 1',
      detail: 'This is a detail of Vehicle 1',
      vehicleType: 'Car',
      brand: 'Toyota',
      isFree: true,
      imageData: 'https://example.com/vehicle1.jpg',
    },
    {
      id: 2,
      name: 'Vehicle 2',
      detail: 'This is a detail of Vehicle 2',
      vehicleType: 'Truck',
      brand: 'Ford',
      isFree: false,
      imageData: 'https://example.com/vehicle2.jpg',
    },
    {
      id: 3,
      name: 'Vehicle 3',
      detail: 'This is a detail of Vehicle 3',
      vehicleType: 'Motorcycle',
      brand: 'BMW',
      isFree: true,
      imageData: 'https://example.com/vehicle3.jpg',
    },
    
  ]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a: Reservation, b: Reservation) => a.id - b.id,
      // add a filter on the ID field
      filters: reservations.map(res => ({ text: res.id, value: res.id })),
      onFilter: (value: any, record: Reservation) => record.id === value,
    },
    {
      title: 'Vehicle ID',
      dataIndex: 'vehicleId',
      render: (vehicleId: number) => {
        const vehicle = vehicles.find(v => v.id === vehicleId);
        return vehicle ? (
          <a onClick={() => setSelectedVehicle(vehicle)}>{vehicle.name}</a>
        ) : null;
      },
    },
    // ... other columns
    {
      title: 'Reservation Status',
      dataIndex: 'reservationStatusId',
      render: (text: any, record: Reservation) => (
        <Select
          defaultValue={text}
          onChange={(value: string) =>
            setReservations(reservations.map(res =>
              res.id === record.id ? { ...res, reservationStatusId: value } : res
            ))
          }
        >
          {statusOptions.map(option => (
            <Select.Option key={option} value={option}>
              {option}
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
        sorter: (a: Reservation, b: Reservation) => new Date(a.reservationStartDate).getTime() - new Date(b.reservationStartDate).getTime(),
      },
      {
        title: 'Reservation End Date',
        dataIndex: 'reservationEndDate',
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
        dataIndex: 'customerId',
        render: (customerId: number) => {
          const customer = customers.find(c => c.id === customerId);
          return customer ? (
            <a onClick={() => setSelectedCustomer(customer)}>{customer.firstName} {customer.lastName}</a>
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
     <Table columns={columns} dataSource={reservations} />
     {selectedVehicle && (
  <VehicleInfoModal
    visible={Boolean(selectedVehicle)}
    vehicle={selectedVehicle}
    onClose={() => setSelectedVehicle(null)}
  />
)}
{selectedDriver &&  <DriverInfoModal
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
