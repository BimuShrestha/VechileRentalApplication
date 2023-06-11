import { useState } from 'react';
import { Modal, Form, Input, Select, Checkbox, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';

const vehicleTypeOptions = ['Car', 'Truck', 'Motorcycle'];
const brandOptions = ['Toyota', 'Ford', 'BMW'];

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
      >
        <Form.Item name="name" label="Name" rules={[{required:true,message:"Please input vehicle name"}]}>
          <Input />
        </Form.Item>
        <Form.Item name="detail" label="Detail" rules={[{required:true,message:"Please input vehicle detail"}]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="vehicleType" label="Vehicle Type" rules={[{required:true,message:"Please select vehicle type"}]}>
          <Select placeholder="Select a type">
            {vehicleTypeOptions.map(option => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="brand" label="Brand" rules={[{required:true,message:"Please select vehicle breand"}]}>
          <Select placeholder="Select a brand">
            {brandOptions.map(option => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="isFree" label="Is Free" valuePropName="checked" >
          <Checkbox />
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
