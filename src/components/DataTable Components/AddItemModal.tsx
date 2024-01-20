import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap';
import { FormData, ModalProps } from '../../types/types';
import "./Styles.css";



const AddItemModal: React.FC<ModalProps> = ({ showModal, setModal }) => {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    status: 'open',
    rate: '',
    balance: '',
    deposit: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can perform any further actions with the form data here
    console.log('Form Data:', formData);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div>
      <Modal show={showModal} onHide={closeModal}>
        <ModalHeader>Add a Customer</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description" className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="status" className='mb-3'>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="open">Open</option>
                <option value="paid">Paid</option>
                <option value="inactive">Inactive</option>
                <option value="due">Due</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="rate" className='mb-3'>
              <Form.Label>Rate</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="balance"  className='mb-3'>
              <Form.Label>Balance</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter balance"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="deposit" className='mb-3'>
              <Form.Label>Deposit</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter deposit"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Click to Add
            </Button>
        
          </Form>
        </ModalBody>

      </Modal>
    </div>
  )
}

export default AddItemModal
