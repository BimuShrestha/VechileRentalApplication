import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Checkbox, List, Modal, Row, Col, Upload, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  UploadOutlined,SearchOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { RcFile } from 'antd/es/upload/interface';
import VehicleModal from './components/CreateUpdate';
import VehicleList from './components/VehicleList';
import useAxios from '../../lib/axios/useAxios';

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
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([
      {
        id: 1,
        name: 'Vehicle 1',
        detail: 'This is a detail of Vehicle 1',
        vehicleType: 'Car',
        brand: 'Toyota',
        isFree: true,
        imageData: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      },
      {
        id: 2,
        name: 'Vehicle 2',
        detail: 'This is a detail of Vehicle 2',
        vehicleType: 'Truck',
        brand: 'Ford',
        isFree: false,
        imageData: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      },
      {
        id: 3,
        name: 'Vehicle 3',
        detail: 'This is a detail of Vehicle 3',
        vehicleType: 'Motorcycle',
        brand: 'BMW',
        isFree: true,
        imageData: 'https://images.unsplash.com/photo-1517672651691-24622a91b550?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      },
    ]);
  const [searchText, setSearchText] = useState<string>('');
  const [{data,loading},makeRequest]=useAxios("/api/vehicles");
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [{ loading:updateLoading  }, updatevehicle] = useAxios(
    {
      method: editingVehicle!==null ? "PUT" : "POST",
      url: data === "" ? "api/CreateNotes" : "api/UpdateNotes",
    },
    {
      isReady: false,
      onSuccess: (data) => {
        makeRequest({});
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      brand: 'Vehicle 1',
      detail: 'This is a detail of Vehicle 1',
      vehicleType: 'Car',
      name: 'Toyota',
      isFree: true,
      imageData: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 2,
      brand: 'Vehicle 2',
      detail: 'This is a detail of Vehicle 2',
      vehicleType: 'Truck',
      name: 'Ford',
      isFree: false,
      imageData: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 3,
      brand: 'Vehicle 3',
      detail: 'This is a detail of Vehicle 3',
      vehicleType: 'Motorcycle',
      name: 'BMW',
      isFree: true,
      imageData: 'https://images.unsplash.com/photo-1517672651691-24622a91b550?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
    },
  ]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreate = (values: any) => {
    debugger;
    console.log('Received values of form: ', values);
    const file = values.imageData.file.originFileObj;

    const reader = new FileReader();

    reader.onloadend = () => {
     let base64= reader.result;
      let postData = 
      {
        "id": 1,
        "name": values.name,
        "details": values.detail,
        "vehicleTypeId": 1,
        "Attachment": base64,
      }
      
  
      updatevehicle({ data: postData });
      // handle creating a new vehicle
      setIsModalVisible(false);
    };

    reader.readAsDataURL(file);
   
  };

  const handleUpdate = (values: any) => {
    debugger;
    console.log('Received values of form: ', values);
    let postData = {};

    updatevehicle({ data: postData });
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


  const handleSearch = (value: string) => {
    const filteredData = vehicles.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(value.toLowerCase()) ||
        vehicle.detail.toLowerCase().includes(value.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredVehicles(filteredData);
    setSearchText(value);
  };


  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Button type="primary"
            onClick={() => {
              setEditingVehicle(null);
              setIsModalVisible(true);
            }}>
            Add Vehicle
          </Button>
         

        </Col>
        <Col>
         <Input
          placeholder="Search by name or detail"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          prefix={<SearchOutlined />}
          allowClear
        />
        </Col>
      </Row>
      <VehicleModal
        visible={isModalVisible}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={() => (setIsModalVisible(false), setEditingVehicle(null))}
        vehicle={editingVehicle || {}}
        editing={Boolean(editingVehicle)}
      />

      <VehicleList
        vehicles={filteredVehicles}
        onEditVehicle={editVehicle}
        loading={loading}
      />

    </div>
  );
};

export default VehiclePage;
