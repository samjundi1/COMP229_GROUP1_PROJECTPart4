import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../sections/auth/UserContext'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Navbar from '../../components/navbar/Navbar_vendor';
import Footer from '../../components/footer/footer';
import axios from 'axios';

const FlowerDetail = () => {
  const location = useLocation();
  const flower = location.state?.flower || {
    name: 'Default Flower',
    price: '$0',
    description: 'No description available.',
    imageUrls: ['/default-flower.jpg'],
    quantity: 'not available',
    availability: 'N/A',
    categories: 'flower',
    occasions: 'N/A',
  };

  // Retrieving image both from internal or external url
  const getImageUrl = (url) => {
    return url.startsWith('http') ? url : `/images/${url}`;
  };
  
  return (
    <>
      <Navbar />
      <Container fluid className="py-4" style={{ backgroundColor: '#222222', color: 'white', minHeight: '100vh' }}>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/category-x" className="text-light">
                      {flower.categories}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active text-light" aria-current="page">
                    {flower.name}
                  </li>
                </ol>
              </nav>
              <Link to="/vendor-view-flower-list" className="text-light text-decoration-none">
                Close
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center g-0">
          <Col md={5} className="d-flex justify-content-center">
            <div
              style={{
                maxWidth: '500px',
                height: 'auto',
              }}
            >
              <img
                src={getImageUrl(flower.imageUrls[0])}
                alt={flower.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                }}
              />
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className='d-flex justify-content-start'>
            <Card className="h-100">
              <Card.Body>
                <Card.Title><h1>{flower.name}</h1></Card.Title>
                <h3 className="text-success">${flower.price}</h3>
                <label htmlFor="quantity" className="form-label">
                  <strong>Quantity:</strong>
                </label>
                <Card.Text>{flower.quantity}</Card.Text>
                <label><strong>Status:</strong></label>
                <Card.Text>{flower.availabilityStatus}</Card.Text>
                <label><strong>Description:</strong></label>
                <Card.Text>{flower.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Footer Section */}
        <Row className="mt-5">
          <Col className="d-flex justify-content-between align-items-center">
            <nav className="d-flex">
              <span className='occasion-item'>#{Array.isArray(flower.occasions) && flower.occasions[0] ? flower.occasions[0] : '-'} #</span>
              <span className='occasion-item'>{Array.isArray(flower.occasions) && flower.occasions[1] ? flower.occasions[1] : '-'} #</span>
              <span className='occasion-item'>{Array.isArray(flower.occasions) && flower.occasions[2] ? flower.occasions[2] : '-'}</span>
            </nav>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default FlowerDetail;
