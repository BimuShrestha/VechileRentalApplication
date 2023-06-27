import { useState } from 'react';
import { Modal, Form, Input, Select, Checkbox, Upload, Button, DatePicker, Row, Col, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import useAxios from '../../../lib/axios/useAxios';

interface BookingModalProps {
    visible: boolean;
    onVehicleBooking: (values: any) => void;
    onCancel: () => void;
    vehicle: any;
    editing: boolean;
}
export const BookingModal: React.FC<BookingModalProps> = ({
    visible,
    onVehicleBooking,
    onCancel,
    vehicle,
    editing,
}) => {
    const [form] = Form.useForm();
    const handleFormSubmit = (values: any) => {
        debugger;
    }

    return (
        <Modal
            open={visible}
            title='Book a vehicle'
            okText='Confirm'
            cancelText="Cancel"
            onCancel={() => (form.resetFields(), onCancel())}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onVehicleBooking(values)
                    })
                    .catch(info => console.log('Validate Failed:', info));
            }}
            destroyOnClose

        >
            <Form
                form={form}
                layout="inline"
                name="form_in_modal"
                onFinish={handleFormSubmit}
            >
                <Form.Item name="reservationStartDate" label="Start Date" rules={[{ required: true, message: "Please choose reservation start date" }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name="reservationEndDate" label="End Date" rules={[{ required: true, message: "Please choose reservation end date" }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name="isDriverNeeded" label="Do you need a driver?">
                    <Switch defaultChecked={false} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BookingModal;
