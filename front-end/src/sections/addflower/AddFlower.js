import React, { useState, useEffect } from 'react';
import './AddFlower.css';
import { Button } from 'react-bootstrap';
import Navbar from '../../components/navbar/Navbar_vendor';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../sections/auth/UserContext';

const AddFlower = () => {
    const [flowerId, setFlowerId] = useState('');  // Flower ID (string)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrls, setImage] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [availabilityStatus, setAvailability] = useState('');
    const [occasions, setOccasions] = useState([]);
    const [categories, setCategories] = useState('');
    const [notes, setNotes] = useState('');  // Notes field
    const [vendorId, setVendorId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { userAccountId } = useUserContext();
    const navigate = useNavigate();

    const handleError = (error, context) => {
        console.error(`Error in ${context}:`, error);
        console.error('Error stack:', error.stack);
        setError(`${context}: ${error.message}`);
        setIsLoading(false);
    };

    useEffect(() => {
        const fetchVendorDetails = async () => {
            setIsLoading(true);
            console.log('Initiating vendor fetch with userAccountId:', userAccountId);

            try {
                // Fetch the vendor using the userAccount _id
                const response = await fetch("http://localhost:8080/api/vendors/:user_id", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userAccountId })
                });

                console.log('Vendor fetch response status:', response.status);
                const data = await response.json();
                console.log('Vendor fetch response data:', data);

                if (!response.ok) {
                    throw new Error(data.message || `Server responded with status: ${response.status}`);
                }

                if (!data.vendorId) {
                    throw new Error('Vendor ID not found in response');
                }

                console.log('Successfully fetched vendorId:', data.vendorId);
                setVendorId(data.vendorId);
                setIsLoading(false);

            } catch (error) {
                handleError(error, 'Vendor Fetch');
            }
        };

        if (userAccountId) {
            console.log('userAccountId available, initiating fetch');
            fetchVendorDetails();
        } else {
            console.warn('No userAccountId available');
            setError('User account ID not available');
        }
    }, [userAccountId]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        console.log('Starting flower submission process');
    
        if (!vendorId) {
            console.error('Submission attempted without vendorId');
            setError('Vendor ID is required to add a flower');
            setIsLoading(false);
            return;
        }
    
    
        try {
           
            // Create catalog data using the flowerId
            const catalogData = {
                //itemId: `catalog${flowerId}`,  // Generate itemId based on flowerId usinb API
                vendorId: vendorId,
                //flower: flower_Id, API will take care 
                flowerId:flowerId,
                name: name,
                description: description,
                price: Number(price),
                imageUrls: [imageUrls],
                categories, 
                quantity: Number(quantity),
                availabilityStatus,
                occasions,
                notes, 
                //createdAt: new Date().toISOString(), // Set createdAt timestamp using API
                //updatedAt: new Date().toISOString(), // Set updatedAt timestamp using API
            };
    
            console.log('Prepared catalog data:', catalogData);
    
            // Send the catalog data to the server
            const catalogResponse = await fetch('http://localhost:8080/api/flowersCat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(catalogData)
            });
    
            console.log('Catalog response status:', catalogResponse.status);
            const catalogDataResponse = await catalogResponse.json();
            console.log('Catalog creation response:', catalogDataResponse);
    
            if (!catalogResponse.ok) {
                throw new Error(catalogDataResponse.message || 'Failed to create catalog entry');
            }
    
            console.log('Flower and catalog successfully added');
            alert('Flower successfully added to the catalogue!');
            navigate('/vendor-view-flower-list');
    
        } catch (error) {
            handleError(error, 'Flower and Catalog Submission');
        } finally {
            setIsLoading(false);
        }
    };
    
    
    const handleOccasionChange = (value, checked) => {
        console.log('Updating occasions:', { value, checked });
        setOccasions(prev => {
            const newOccasions = checked 
                ? [...prev, value]
                : prev.filter(item => item !== value);
            console.log('Updated occasions:', newOccasions);
            return newOccasions;
        });
    };

    const handleInputChange = (setter, value, fieldName) => {
        console.log(`Updating ${fieldName}:`, value);
        setter(value);
    };

    if (error) {
        console.error('Rendering error state:', error);
        return (
            <div className="error-container">
                <h2>Error Occurred</h2>
                <p>{error}</p>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                    {error.stack}
                </pre>
                <Button 
                    onClick={() => {
                        console.log('Resetting error state');
                        setError(null);
                    }}
                >
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <section id="add">
                <div id="container">
                    <form id="addFlower" onSubmit={handleSubmit} noValidate>
                        <h1>Add Flower</h1>

                        <label htmlFor="flowerId">Flower Id</label>
                        <input
                            type="text"
                            id="flowerId"
                            name="flowerId"
                            value={flowerId}
                            onChange={(e) => handleInputChange(setFlowerId, e.target.value, 'flowerId')}
                            required
                        />

                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => handleInputChange(setName, e.target.value, 'name')}
                            required
                        />

                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => handleInputChange(setDescription, e.target.value, 'description')}
                            required
                        />

                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={(e) => handleInputChange(setPrice, e.target.value, 'price')}
                            min="0"
                            step="0.01"
                            required
                        />

                        <label htmlFor="imageUrls">Image Url</label>
                        <input
                            type="text"
                            id="imageUrls"
                            name="imageUrls"
                            value={imageUrls}
                            onChange={(e) => handleInputChange(setImage, e.target.value, 'imageUrl')}
                            required
                        />

                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => handleInputChange(setQuantity, e.target.value, 'quantity')}
                            min="0"
                            required
                        />

                        <label>Availability</label>
                        <fieldset id="check">
                            <label>
                                Not available
                                <input
                                    type="radio"
                                    name="availability"
                                    value="not_available"
                                    checked={availabilityStatus === 'not_available'}
                                    onChange={(e) => handleInputChange(setAvailability, e.target.value, 'availability')}
                                    required
                                />
                            </label>
                            <label>
                                Available
                                <input
                                    type="radio"
                                    name="availability"
                                    value="available"
                                    checked={availabilityStatus === 'available'}
                                    onChange={(e) => handleInputChange(setAvailability, e.target.value, 'availability')}
                                />
                            </label>
                        </fieldset>

                        <label id="occasions">Occasions</label>
                        <fieldset id="check">
                            {['Birthday', 'Anniversary', 'Valentines'].map((value) => (
                                <label key={value}>
                                    {value}
                                    <input
                                        type="checkbox"
                                        name={value.toLowerCase()}
                                        value={value}
                                        checked={occasions.includes(value)}
                                        onChange={(e) => handleOccasionChange(e.target.value, e.target.checked)}
                                    />
                                </label>
                            ))}
                        </fieldset>

                        <label htmlFor="categories">Categories</label>
                        <select
                            id="category"
                            name="category"
                            value={categories}
                            onChange={(e) => handleInputChange(setCategories, e.target.value, 'categories')}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Rose">Rose</option>
                            <option value="Tulip">Tulip</option>
                            <option value="Lily">Lily</option>
                            <option value="Others">Others</option>
                        </select>

                        <Button
                            className="w-100 w-md-auto"
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Add Flower to Catalogue'}
                        </Button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AddFlower;