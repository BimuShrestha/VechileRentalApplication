import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Checkbox, List, Modal, Row, Col, Upload, Select, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  UploadOutlined, SearchOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { RcFile } from 'antd/es/upload/interface';
import VehicleModal from './components/CreateUpdate';
import VehicleList from './components/VehicleList';
import useAxios from '../../lib/axios/useAxios';
import BookingModal from './components/Booking';
import moment from 'moment';

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



const VehiclePage = (props: any) => {
  const { data } = props;
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedId, setSelectedId] = useState<any>();
  const [bookingModalVisible, setBookingModalVisible] = useState<boolean>(false);
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

  const [{ loading: deleteLoading }, deleteVehicle] = useAxios(
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

  const [{ loading: bookingLoading }, bookVehicle] = useAxios(
    {
      method: "POST",
      url: "api/reservation/create",
    },
    {
      isReady: false,
      onSuccess: (data) => {
        notification.success({
          message: 'Success',
          description:
            'Vehicle booked successfully!',
        });
        setBookingModalVisible(false);
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

  const onVehicleBooking = (values: any) => {
    debugger;
    let formData = new FormData();
    formData.append("vehicleId", selectedId);
    formData.append("customerId", data.id);
    formData.append("reservationStartDate", values?.reservationStartDate);
    formData.append("reservationEndDate", values?.reservationEndDate);
    formData.append("isDriverRequired", values?.isDriverRequired ? values?.isDriverRequired : false);
    formData.append("reservationStatusId", '1');
    bookVehicle({ data: formData });
  }

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
      reader.readAsDataURL(file);
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

  const handleVehicleBooking = (id: any) => {
    debugger;
    setSelectedId(id);
    setBookingModalVisible(true);
  }

  const handleVehileDeletion = (id: any) => {
    deleteVehicle({ params: { id: id } })
  }

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
        {data && data.userTypeId && data.userTypeId === 3 &&
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
        }
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
      <BookingModal
        visible={bookingModalVisible}
        onVehicleBooking={onVehicleBooking}
        onCancel={() => (setBookingModalVisible(false))}
        loading={bookingLoading}
        vehicle={editingVehicle || {}}
        editing={Boolean(editingVehicle)}
      />
      <VehicleList
        userTypeId={data && data.userTypeId}
        vehicles={filteredVehicles}
        onEditVehicle={editVehicle}
        onDeleteVehicle={handleVehileDeletion}
        handleVehicleBooking={handleVehicleBooking}
        loading={loading || updateLoading || deleteLoading}
      />
    </div>
  );
};

export default VehiclePage;

