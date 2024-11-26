import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch user account data to initialize vendor ID
export const fetchUserAccountId = async () => {
    try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No auth token found in localStorage.');
            return null;
        }

        // Decode the token to extract the logged-in user's `_id`
        const loggedInUserId = JSON.parse(atob(token.split('.')[1]))._id;
        if (!loggedInUserId) {
            console.error('User ID not found in token.');
            return null;
        }

        // Fetch all user accounts
        const response = await axios.get(`${API_URL}/api/userAccounts`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in headers
            },
        });

        console.log('User Accounts Response:', response.data);

        // Find the matching user account by `_id`
        const userAccount = response.data.find(account => account._id === loggedInUserId);

        if (userAccount) {
            console.log('Found User Account:', userAccount);
            return userAccount.userAccId || null; // Return the `userAccId` from the matched account
        } else {
            console.warn('No matching user account found for the logged-in user.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user account ID:', error.response?.data || error.message);
        throw error;
    }
};



// Fetch initial vendor data
export const fetchVendorData = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/vendors`);
        return response.data || {};
    } catch (error) {
        console.error('Error fetching vendor data:', error);
        throw error;
    }
};

// Submit vendor profile data
export const submitVendorProfile = async (formData) => {
    try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No auth token found in localStorage.');
            return null;
        }

        // Decode the token to extract the logged-in user's `_id`
        const loggedInUserId = JSON.parse(atob(token.split('.')[1]))._id;
        if (!loggedInUserId) {
            console.error('User ID not found in token.');
            return null;
        }

        // Fetch vendors associated with the logged-in user
        const vendorResponse = await axios.get(`${API_URL}/api/vendors`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Vendors Response:', vendorResponse.data);

        // Check if the vendor associated with formData.vendorId exists
        const existingVendor = vendorResponse.data.find(
            (vendor) => vendor.vendorId === formData.vendorId
        );

        // Prepare the vendor data
        const daysString = formData.days.join(', ');
        const fullAddress = formData.streetAddress2
            ? `${formData.streetAddress1}, ${formData.streetAddress2}`
            : formData.streetAddress1;

        const updatedData = {
            contactInfo: {
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                contactPerson: formData.contactPerson,
            },
            address: {
                streetAddress: fullAddress,
                city: formData.city,
                province: formData.province,
                postalCode: formData.postalCode,
                country: "Canada",
            },
            businessHours: {
                days: daysString,
                openingTime: formData.openingTime,
                closingTime: formData.closingTime,
                specialHours: formData.specialHours,
            },
            shopInfo: {
                shopLicenceNo: formData.shopLicenseNo,
                shopLogo: formData.shopLogo,
                shopDescription: formData.shopDescription,
            },
            vendorId: formData.vendorId,
            vendorName: formData.vendorName,
            notes: formData.notes,
        };

        console.log("Submitting payload:", updatedData);

        // Determine whether to perform PUT or POST
        if (existingVendor) {
            console.log("Vendor exists. Updating record...");
            const response = await axios.put(`${API_URL}/api/vendors/${formData.vendorId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } else {
            console.log("Vendor does not exist. Adding new record...");
            const response = await axios.post(`${API_URL}/api/vendors`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        }
    } catch (error) {
        console.error("Error submitting vendor profile:", error.response?.data || error.message);
        throw error;
    }
};

