import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../../components/navbar/Navbar_vendor';
import Footer from '../../components/footer/footer';
import { useUserContext } from '../../sections/auth/UserContext'; // Import the context
import './FlowerList.css';
//import mongoose from 'mongoose';
//const mongoose = require('mongoose');

const FlowerList = () => {
    const navigate = useNavigate();
    const [flowers, setFlowers] = useState([]);
    const [vendor, setVendor] = useState(null); // State to store vendor information
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userAccountId } = useUserContext(); // Access userAccountId from context

    useEffect(() => {
        // Fetch the vendor using the userAccountId
        fetch("http://localhost:8080/api/vendors/:user_id", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userAccountId }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((vendor) => {
                setVendor(vendor); // Save the vendor information to state
                if (vendor.vendorId) {
                    // Fetch flowers using the vendorId
                    fetch("http://localhost:8080/api/flowers/vendorId", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ vendorId: vendor.vendorId }),
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return res.json();
                        })
                        .then((data) => {
                            setFlowers(data);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error('Error fetching flowers:', error);
                            setError('Error fetching flowers');
                            setLoading(false);
                        });
                } else {
                    setError('Vendor not found');
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching vendor:', error);
                setError('Error fetching vendor');
                setLoading(false);
            });
    }, [userAccountId]);

    const handleCardClick = (flower) => {
        navigate('/vendor-view-flower-detail', { state: { flower } });
    };

    const handleDelete = (id, flowerId) => {
        console.log('Button clicked with:', { id, flowerId });
        console.log('ObjectId:', id); // Log the ObjectId
        console.log('FlowerId:', flowerId); // Log the flowerId
    
        if (window.confirm('Are you sure you want to delete this flower?')) {
            fetch('http://localhost:8080/api/flowers/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id, flowerId: flowerId }), // Pass both ObjectId and flowerId
            })
                .then((res) => {
                    if (res.ok) {
                        setFlowers((prevFlowers) =>
                            prevFlowers.filter((flower) => flower._id !== id)
                        );
                        alert('Flower deleted successfully!');
                    } else {
                        return res.json().then((data) => {
                            alert(data.message || 'Failed to delete the flower.');
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error deleting flower:', error);
                    alert('An error occurred while deleting the flower.');
                });
        }
    };
    
    
    return (
        <>
            <Navbar />
            <div className="listContainer">
                <Container className="py-4">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && (
                        <Row className="mb-4 justify-content-center">
                            <Col md={8}>
                                <Card className="shadow-sm">
                                    <Card.Header className="text-center bg-light text-dark">
                                        <strong>Vendor Information</strong>
                                    </Card.Header>
                                    <Col>
                                    <Card.Body>
                                        <Card.Text>
                                            <strong>Vendor Name:  </strong> {vendor?.vendorName || 'N/A'}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Business Hours:  </strong>
                                            {vendor?.businessHours?.days
                                                ? `${vendor.businessHours.days}: ${vendor.businessHours.openingTime} - ${vendor.businessHours.closingTime}`
                                                : 'N/A'}
                                            {vendor?.businessHours?.specialHours && (
                                                <div>Special Hours: {vendor.businessHours.specialHours}</div>
                                            )}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Address:  </strong>
                                            {vendor?.address
                                                ? `${vendor.address.streetAddress}, ${vendor.address.city}, ${vendor.address.province}, ${vendor.address.postalCode}, ${vendor.address.country}`
                                                : 'N/A'}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Phone:  </strong>
                                            {vendor?.contactInfo?.phoneNumber || 'N/A'}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Email:  </strong>
                                            {vendor?.contactInfo?.email || 'N/A'}
                                        </Card.Text>
                                    </Card.Body>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Card>
                            </Col>
                        </Row>
                    )}

                    <Row>
                        {flowers.map((flower, index) => (
                            <Col key={index} md={4} lg={3} className="mb-4 justify-content-center">
                                <Card
                                    className="text-center shadow-sm h-100"
                                    onClick={() => handleCardClick(flower)}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={
                                            flower.imageUrls[0].startsWith('http')
                                                ? flower.imageUrls[0]
                                                : `/images/${flower.imageUrls[0]}`
                                        }
                                        alt={flower.name}
                                        className="img-fluid rounded"
                                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{flower.name}</Card.Title>
                                        <div className="d-flex justify-content-center mb-3">
                                            <span className="me-2">Type:</span>
                                            <Button variant="success" size="sm">
                                                Flower
                                            </Button>
                                        </div>
                                        <Card.Text>
                                            <strong>Vendor:</strong> {vendor?.vendorName || 'N/A'}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Unit Cost:</strong> ${flower.price}
                                        </Card.Text>
                                        <Card.Text
                                            className={
                                                flower.quantity > 10
                                                  ? 'text-success' // Green for more than 10
                                                  : flower.quantity > 5
                                                  ? 'text-warning' // Yellow for more than 5
                                                  : 'text-danger'  // Red for 5 or less
                                              }
                                            >
                                              {flower.quantity > 0
                                                ? `${flower.quantity} in stock`
                                                : 'Out of stock'}
                                        </Card.Text>
                                                <Button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    data-id={flower._id}
                                                    data-flowerid={flower.flowerId}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(flower._id, flower.flowerId);
                                                    }}
                                                >
                                                    Delete
                                                </Button>


                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default FlowerList;
