import { useState } from 'react';
import { Modal, Form, Input, Select, Checkbox, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import useAxios from '../../../lib/axios/useAxios';

interface VehicleModalProps {
    visible: boolean;
    onCreate: (values: any) => void;
    onUpdate: (values: any) => void;
    onCancel: () => void;
    vehicle: any;
    editing: boolean;
  }
export const VehicleModal: React.FC<VehicleModalProps> = ({
    visible,
    onCreate,
    onUpdate,
    onCancel,
    vehicle,
    editing,
}) => {
  const [form] = Form.useForm();
  const [{data: vehicleTypes}]=useAxios("/api/VehicleTypes");
  const [{data: brandTypes}]=useAxios("/api/BrandTypes");
  const [{data: fuelTypes}]=useAxios("/api/FuelTypes");


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

  const handleFormSubmit = (values: any) => {
    debugger;
  }

  return (
    <Modal
    visible={visible}
    title={editing ? 'Edit vehicle' : 'Create a new vehicle'}
    okText={editing ? 'Update' : 'Create'}
    cancelText="Cancel"
    onCancel={()=>(form.resetFields(),onCancel())}
    onOk={() => {
      form
        .validateFields()
        .then(values => {
          form.resetFields();
          editing ? onUpdate(values) : onCreate(values);
        })
        .catch(info => console.log('Validate Failed:', info));
    }}
    destroyOnClose={true}

    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ ...vehicle }}
        onFinish={handleFormSubmit}
      >
        <Form.Item name="name" label="Name" rules={[{required:true,message:"Please input vehicle name"}]}>
          <Input />
        </Form.Item>
        <Form.Item name="details" label="Detail" rules={[{required:true,message:"Please input vehicle detail"}]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="brand" label="Brand" rules={[{required:true,message:"Please select vehicle breand"}]}>
          <Select placeholder="Select a brand">
            {brandTypes && brandTypes.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="vehicleType" label="Vehicle Type" rules={[{required:true,message:"Please select vehicle type"}]}>
          <Select placeholder="Select a type">
            {vehicleTypes && vehicleTypes.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="fuelType" label="Fuel Type" rules={[{required:true,message:"Please select fuel type"}]}>
          <Select placeholder="Select a type">
            {fuelTypes && fuelTypes.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="imageData" label="Image" rules={[{required:true,message:"Please upload a image"}]}>
          <Upload
            beforeUpload={fileToDataUrl}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VehicleModal;
