import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileManagement.css';
import { Container, Row, Col, Form, Button, Card, Nav } from 'react-bootstrap';
import Navbar from '../../components/navbar/Navbar_vendor';
import Footer from '../../components/footer/footer';
import { fetchUserAccountId, fetchVendorData, submitVendorProfile } from './api-ProfileManagement';

const provinces = [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia",
    "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function ProfileManagement() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        vendorId: '', vendorName: '', shopLicenseNo: '', shopLogo: '', shopDescription: '', streetAddress1: '',
        streetAddress2: '', city: '', province: '', postalCode: '', contactPerson: '', email: '', phoneNumber: '',
        days: [], openingTime: '', closingTime: '', specialHours: '', notes: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [isVendorIdLoading, setIsVendorIdLoading] = useState(true);

   useEffect(() => {
    const initializeVendorId = async () => {
        try {
            const userAccId = await fetchUserAccountId();
            console.log("Fetched UserAccId:", userAccId);

            if (userAccId) {
                setFormData(prevData => ({
                    ...prevData,
                    vendorId: userAccId,
                }));
            }
        } catch (error) {
            console.error('Error initializing vendor ID:', error);
        } finally {
            setIsVendorIdLoading(false);
        }
    };

    initializeVendorId();
}, []);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const data = await fetchVendorData();
                setFormData((prevData) => ({
                    ...prevData,
                    ...data,
                    days: data?.days || [],
                }));
            } catch (error) {
                console.error('Error fetching initial data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailPattern.test(formData.email)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        }
    }, [formData.email]);

    useEffect(() => {
        const postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
        if (formData.postalCode && !postalCodePattern.test(formData.postalCode)) {
            setErrors((prevErrors) => ({ ...prevErrors, postalCode: 'Postal code format should be A0A 0A0' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, postalCode: '' }));
        }
    }, [formData.postalCode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                days: checked ? [...prevData.days, value] : prevData.days.filter((day) => day !== value),
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            'vendorName', 'shopLicenseNo', 'shopLogo', 'shopDescription',
            'streetAddress1', 'city', 'province', 'postalCode', 'contactPerson',
            'email', 'phoneNumber', 'days', 'openingTime', 'closingTime'
        ];

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await submitVendorProfile(formData);
            alert(formData.id ? 'Your profile has been successfully updated!' : 'Your profile has been successfully created!');
        } catch (error) {
            alert('Failed to submit your profile. Please try again later.');
        }
    };

    const handleCancel = () => {
        navigate('/vendor-main');
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <Container fluid className="p-4 centered-container">
                <Row>
                    {/* Sidebar for Navigation */}
                    <Col xs={12} md={3}>
                        <Nav className="flex-column bg-white p-3 border">
                            <h4>Profile Management</h4>
                            <Nav.Link href="#">1. Profile Information</Nav.Link>
                            <Nav.Link href="#">2. Store Information</Nav.Link>
                            <Nav.Link href="#">3. Store Address</Nav.Link>
                            <Nav.Link href="#">4. Contact Information</Nav.Link>
                            <Nav.Link href="#">5. Business Hours Information</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Main Form Content */}
                    <Col xs={12} md={9}>
                        <Card className="p-4">
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <h4>Profile Information</h4>
                                        <Form.Group controlId="vendorId">
                                            <Form.Label>Vendor Id</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="vendorId"
                                                value={isVendorIdLoading ? 'Loading...' : formData.vendorId}
                                                onChange={handleChange}
                                                isInvalid={!!errors.vendorId}
                                                readOnly={isVendorIdLoading} // Prevent editing during loading
                                                placeholder="Enter vendor Id" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.vendorId}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="vendorName">
                                            <Form.Label>Vendor Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="vendorName"
                                                value={formData.vendorName}
                                                onChange={handleChange}
                                                isInvalid={!!errors.vendorName}
                                                placeholder="Enter vendor name" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.vendorName}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <div className='pt-3'><h4>Store Information</h4></div>
                                        <Form.Group controlId="shopLicense">
                                            <Form.Label>License Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="shopLicenseNo"
                                                value={formData.shopLicenseNo}
                                                onChange={handleChange}
                                                isInvalid={!!errors.shopLicenseNo}
                                                placeholder="Enter license number" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.shopLicenseNo}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="shopLog">
                                            <Form.Label>Shop Logo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="shopLogo"
                                                value={formData.shopLogo}
                                                onChange={handleChange}
                                                isInvalid={!!errors.shopLogo}
                                                placeholder="Enter logo URL" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.shopLogo}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="shopDescription">
                                            <Form.Label>Shop Description</Form.Label>
                                            <Form.Control
                                                as="textarea" rows={3}
                                                name="shopDescription"
                                                value={formData.shopDescription}
                                                onChange={handleChange}
                                                isInvalid={!!errors.shopDescription}
                                                placeholder="Enter shop description" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.shopDescription}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <div className='pt-3'><h4>Store Address</h4></div>
                                        <Form.Group controlId="mailingAddress1">
                                            <Form.Label>Mailing Address 1</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="streetAddress1"
                                                value={formData.streetAddress1}
                                                onChange={handleChange}
                                                isInvalid={!!errors.streetAddress1}
                                                placeholder="Enter address line 1" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.streetAddress1}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="mailingAddress2">
                                            <Form.Label>Mailing Address 2 (Optional)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="streetAddress2"
                                                value={formData.streetAddress2}
                                                onChange={handleChange}
                                                placeholder="Enter address line 2" />
                                        </Form.Group>

                                        <Row>
                                            <Col xs={12} md={6}>
                                                <Form.Group controlId="city">
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.city}
                                                        placeholder="Enter city" />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.city}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <Form.Group controlId="province">
                                                    <Form.Label>Province</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        name="province"
                                                        value={formData.province}
                                                        isInvalid={!!errors.province}
                                                        onChange={handleChange}>
                                                        <option>Select province</option>
                                                        {provinces.map((province, index) => (
                                                            <option key={index} value={province}>
                                                                {province}</option>))}
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.province}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group controlId="postalCode">
                                            <Form.Label>Postal Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                isInvalid={!!errors.postalCode}
                                                placeholder="Enter postal code (ex. A0B C1D)" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.postalCode}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12} md={6}>
                                        <h4>Vendor Note</h4>
                                        <Form.Group controlId="vendorNote">
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleChange}
                                                isInvalid={!!errors.notes}
                                                placeholder="Enter vendor note" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.notes}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <div className='pt-3'><h4>Contact Information</h4></div>
                                        <Form.Group controlId="contactPerson">
                                            <Form.Label>Contact Person's Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="contactPerson"
                                                value={formData.contactPerson}
                                                onChange={handleChange}
                                                isInvalid={!!errors.contactPerson}
                                                placeholder="Enter contact person's name" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.contactPerson}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                isInvalid={!!errors.email}
                                                placeholder="Enter email" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="phone">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                isInvalid={!!errors.phoneNumber}
                                                placeholder="Enter phone number" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phoneNumber}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <div className='pt-3'><h4>Business Hours</h4></div>
                                        <Form.Group controlId="days">
                                            <Form.Label>Days:</Form.Label>
                                            <div>
                                                {daysOfWeek.map((day, index) => (
                                                    <Form.Check
                                                        key={index}
                                                        type="checkbox"
                                                        label={day}
                                                        value={day}
                                                        name="days"
                                                        checked={Array.isArray(formData.days) && formData.days.includes(day)}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.days}
                                                        inline />
                                                ))}
                                            </div>
                                            {errors.days && (
                                                <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                                                    {errors.days}
                                                </Form.Control.Feedback>)}
                                        </Form.Group>

                                        <Form.Group controlId="openingTime">
                                            <Form.Label>Opening Time</Form.Label>
                                            <Form.Control
                                                type="time"
                                                name="openingTime"
                                                value={formData.openingTime}
                                                isInvalid={!!errors.openingTime}
                                                onChange={handleChange} />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.openingTime}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="closingTime">
                                            <Form.Label>Closing Time</Form.Label>
                                            <Form.Control type="time"
                                                name="closingTime"
                                                value={formData.closingTime}
                                                isInvalid={!!errors.closingTime}
                                                onChange={handleChange} />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.closingTime}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="specialHours">
                                            <Form.Label>Special Hours</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="specialHours"
                                                value={formData.specialHours}
                                                isInvalid={!!errors.specialHours}
                                                onChange={handleChange}
                                                placeholder="Enter special hours" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.specialHours}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Navigation Buttons */}
                                <div className="d-flex flex-column flex-md-row justify-content-end mt-4">
                                    <Button variant="secondary" className="me-md-2 mb-2 mb-md-0 w-100 w-md-auto"
                                        onClick={handleCancel}>Cancel</Button>
                                    <Button variant="primary" type="submit" className="w-100 w-md-auto">Submit</Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default ProfileManagement;
