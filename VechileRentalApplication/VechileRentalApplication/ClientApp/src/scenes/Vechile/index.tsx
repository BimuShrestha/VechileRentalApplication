import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Checkbox, List, Modal, Row, Col, Upload, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  UploadOutlined, SearchOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { RcFile } from 'antd/es/upload/interface';
import VehicleModal from './components/CreateUpdate';
import VehicleList from './components/VehicleList';
import useAxios from '../../lib/axios/useAxios';

export interface Vehicle {
  id: number;
  name: string;
  details: string;
  vehicleType: string;
  brand: string;
  isFree: boolean;
  fuelType?: string;
  imageData: string; // This will store the URL of the image
}



const VehiclePage: React.FC = () => {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedId, setSelectedId] = useState<any>();
  const [{ data: vehicles, loading }, makeRequest] = useAxios("/api/vehicles");
  // console.log("DAta", data);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null | any>(null);
  const [{ loading: updateLoading }, updatevehicle] = useAxios(
    {
      method: Boolean(editingVehicle) ? "PUT" : "POST",
      url: Boolean(editingVehicle) ? "api/vehicles/Update" : "api/vehicles/Create",
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

  const [{ loading: deleteLoading }, deletevehicle] = useAxios(
    {
      method: "DELETE",
      url: "api/vehicles/Delete"
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

  useEffect(() => {
    setFilteredVehicles(vehicles)
  }, [loading]);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreate = (values: any) => {
    debugger;
    console.log('Received values of form: ', values);
    const file = values.imageData.file.originFileObj;

    const reader = new FileReader();

    reader.onloadend = () => {
      let base64: any = reader.result;
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("details", values.details);
      formData.append("vehicleTypeId", values.vehicleType);
      formData.append("brandTypeId", values.brand);
      formData.append("fuelTypeId", values.fuelType);
      formData.append("Attachment", base64);


      updatevehicle({ data: formData });
      // handle creating a new vehicle
      setIsModalVisible(false);
    };

    reader.readAsDataURL(file);

  };

  const handleUpdate = (values: any) => {
    debugger;
    var test = editingVehicle;
    console.log('Received values of form: ', values);
    const file = values?.imageData?.file?.originFileObj;
    let formData = new FormData();
    if (file) {
      const reader = new FileReader();
      let base64: any = reader.result;
      reader.onloadend = () => {

        formData.append("Attachment", base64);
      }

    }
    else {
      formData.append("Attachment", values.imageData);
    }
    formData.append("id", selectedId);
    formData.append("name", values.name);
    formData.append("details", values.details);
    if (isNaN(values.vehicleType)) {
      formData.append("vehicleTypeId", editingVehicle.vehicleTypeId);
    }
    else {
      formData.append("vehicleTypeId", values.vehicleType);
    }
    if (isNaN(values.brand)) {
      formData.append("brandTypeId", editingVehicle.brandTypeId);
    }
    else {
      formData.append("brandTypeId", values.brand);
    }
    if (isNaN(values.fuelType)) {
      formData.append("fuelTypeId", editingVehicle.fuelTypeId);
    }
    else {
      formData.append("fuelTypeId", values.fuelType);
    }
    // formData.append("brandTypeId", values.brand);
    // formData.append("fuelTypeId", values.fuelType);


    updatevehicle({ data: formData });
    // handle creating a new vehicle
    setIsModalVisible(false);
  };


  const editVehicle = (vehicle: Vehicle, id: any) => {
    debugger;
    setSelectedId(id);
    setEditingVehicle(vehicle);
    setIsModalVisible(true);
  };

  const deleteVehicle = (id: any) => {
    debugger;
    deletevehicle({ params: id });
  }

  // useEffect(() => {
  //   fetchVehicles();
  // }, []);

  // const fetchVehicles = async () => {
  //   // Replace this with your API endpoint
  //   const response = await axios.get('/vehicles');
  //   setVehicles(response.data);
  // };

  // const columns: ColumnsType<Vehicle> = [
  //   { title: 'Name', dataIndex: 'name', key: 'name' },
  //   { title: 'Detail', dataIndex: 'detail', key: 'detail' },
  //   { title: 'Vehicle Type', dataIndex: 'vehicleType', key: 'vehicleType' },
  //   { title: 'Brand', dataIndex: 'brand', key: 'brand' },
  //   { title: 'Is Free', dataIndex: 'isFree', key: 'isFree' },
  //   {
  //     title: 'Action',
  //     dataIndex: '',
  //     key: 'x',
  //     render: (_: any, record: Vehicle) => (
  //       <a onClick={() => editVehicle(record)}>Edit</a>
  //     ),
  //   },
  // ];


  const handleSearch = (value: string) => {
    const filteredData = vehicles.filter(
      (vehicle: any) =>
        vehicle.name.toLowerCase().includes(value.toLowerCase()) ||
        vehicle.details.toLowerCase().includes(value.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(value.toLowerCase())
    );
    debugger;
    setFilteredVehicles(filteredData);
    setSearchText(value);
  };


  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Button type="primary"
            disabled={loading}
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
        onDeleteVehicle={deleteVehicle}
        loading={loading || updateLoading || deleteLoading} 
      />

    </div>
  );
};

export default VehiclePage;
