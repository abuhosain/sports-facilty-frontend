/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Typography,
} from "antd";
import {
  useGetAllFacilitiesQuery,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
  useCreateFacilityMutation,
} from "../../../redux/features/admin/adminManagement.api";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const FacilityManagement: React.FC = () => {
  const { data: facilities, isLoading } = useGetAllFacilitiesQuery(undefined);
  const [updateFacility] = useUpdateFacilityMutation();
  const [deleteFacility] = useDeleteFacilityMutation();
  const [createFacility] = useCreateFacilityMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFacility, setEditingFacility] = useState<any>(null);

  const [form] = Form.useForm();

  const handleEdit = (record: any) => {
    setEditingFacility(record);
    form.setFieldsValue(record); // Set form fields with the current values of the facility
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFacility(id).unwrap();
      message.success("Facility deleted successfully");
    } catch (error) {
      message.error("Failed to delete facility");
    }
  };

  const handleCreate = () => {
    setEditingFacility(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleFinish = async (values: any) => {
    try {
      // Ensure pricePerHour is treated as a number
      values.pricePerHour = Number(values.pricePerHour);
      if (editingFacility) {
        const updatedValues = { ...editingFacility, ...values };
        await updateFacility({
          id: editingFacility._id,
          data: updatedValues,
        }).unwrap();
        message.success("Facility updated successfully");
      } else {
        await createFacility(values).unwrap();
        message.success("Facility created successfully");
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to submit form");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price Per Hour",
      dataIndex: "pricePerHour",
      key: "pricePerHour",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageUrl: any) => (
        <img
          src={imageUrl}
          alt="facility"
          style={{ width: "100px", height: "60px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this facility?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div  >
      <Title level={2}>Facility Management</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreate}
        style={{ marginBottom: "20px" }}
      >
        Create Facility
      </Button>
      <Table
        dataSource={facilities?.data || []}
        columns={columns}
        loading={isLoading}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }} // Make table scrollable on smaller screens
      />

      <Modal
        title={editingFacility ? "Edit Facility" : "Create Facility"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width="90%" // Responsive modal width
        style={{ maxWidth: "800px" }} // Limit max modal width
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Facility Name"
            rules={[
              { required: true, message: "Please enter the facility name" },
            ]}
          >
            <Input placeholder="Enter facility name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} placeholder="Enter facility description" />
          </Form.Item>
          <Form.Item
            name="pricePerHour"
            label="Price Per Hour"
            rules={[
              {
                required: true,
                message: "Please enter a valid price per hour",
              },
            ]}
          >
            <Input type="number" placeholder="Enter price per hour" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[
              { required: true, message: "Please enter the facility location" },
            ]}
          >
            <Input placeholder="Enter facility location" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter the image URL" }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingFacility ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FacilityManagement;
