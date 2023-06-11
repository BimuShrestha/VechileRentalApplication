import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Checkbox, List, Modal, Row, Col, Upload, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
    UploadOutlined
  } from '@ant-design/icons';
import axios from 'axios';
import { RcFile } from 'antd/es/upload/interface';
import VehicleModal from './components/CreateUpdate';
import VehicleList from './components/VehicleList';

export interface Vehicle {
    id: number;
    name: string;
    detail: string;
    vehicleType: string;
    brand: string;
    isFree: boolean;
    imageData: string; // This will store the URL of the image
  }
  // Replace these with your actual options
const vehicleTypeOptions = ['Car', 'Truck', 'Motorcycle'];
const brandOptions = ['Toyota', 'Ford', 'BMW'];

  

const VehiclePage: React.FC = () => {
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
      const [form] = Form.useForm();
      const [isModalVisible, setIsModalVisible] = useState(false);
const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

const handleCreate = (values: any) => {
  console.log('Received values of form: ', values);
  // handle creating a new vehicle
  setIsModalVisible(false);
};

const handleUpdate = (values: any) => {
  console.log('Received values of form: ', values);
  // handle updating an existing vehicle
  setIsModalVisible(false);
};

const editVehicle = (vehicle: Vehicle) => {
  setEditingVehicle(vehicle);
  setIsModalVisible(true);
};

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    // Replace this with your API endpoint
    const response = await axios.get('/vehicles');
    setVehicles(response.data);
  };

  const columns: ColumnsType<Vehicle> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Detail', dataIndex: 'detail', key: 'detail' },
    { title: 'Vehicle Type', dataIndex: 'vehicleType', key: 'vehicleType' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Is Free', dataIndex: 'isFree', key: 'isFree' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_: any, record: Vehicle) => (
        <a onClick={() => editVehicle(record)}>Edit</a>
      ),
    },
  ];



  const submitForm = () => {
    form.validateFields().then(values => {
      const vehicle: Vehicle = { ...values, id: editingVehicle?.id || 0 };
      if (editingVehicle) {
        updateVehicle(vehicle);
      } else {
        createVehicle(vehicle);
      }
    });
  };

  const createVehicle = async (vehicle: Vehicle) => {
    // Replace this with your API endpoint
    const response = await axios.post('/vehicles', vehicle);
    if (response.status === 200) {
      fetchVehicles();
      form.resetFields();
    }
  };

  const updateVehicle = async (vehicle: Vehicle) => {
    // Replace this with your API endpoint
    const response = await axios.put(`/vehicles/${vehicle.id}`, vehicle);
    if (response.status === 200) {
      fetchVehicles();
      form.resetFields();
    }
  };
  const showCreateModal = () => {
    form.resetFields(); // Clear the form
    setEditingVehicle(null); // No vehicle is being edited
    setIsModalVisible(true); // Show the modal
  };
  const fileToDataUrl = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        resolve(event.target!.result as string);
      };
      reader.onerror = error => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  

  return (
    <div>
        <Row>
            <Col>
            <Button  type="primary"
  onClick={() => {
    setEditingVehicle(null);
    setIsModalVisible(true);
  }}>
  Add Vehicle
</Button>

            </Col>
        </Row>
        <VehicleModal
  visible={isModalVisible}
  onCreate={handleCreate}
  onUpdate={handleUpdate}
  onCancel={() => (setIsModalVisible(false),setEditingVehicle(null))}
  vehicle={editingVehicle || {}}
  editing={Boolean(editingVehicle)}
/>

<VehicleList
  vehicles={vehicles}
  onEditVehicle={editVehicle}
/>

    </div>
  );
};

export default VehiclePage;
