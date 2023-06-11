import React from 'react';
import { Modal, Descriptions } from 'antd';

interface CustomerInfoModalProps {
  visible: boolean;
  customer: Customer;
  onClose: () => void;
}

const CustomerInfoModal: React.FC<CustomerInfoModalProps> = ({
  visible,
  customer,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      title={`${customer.firstName} ${customer.lastName}`}
      onCancel={onClose}
      footer={null}
    >
      <Descriptions column={1}>
        <Descriptions.Item label="First Name">{customer.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{customer.lastName}</Descriptions.Item>
        <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default CustomerInfoModal;
