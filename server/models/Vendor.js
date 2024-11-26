const mongoose = require('mongoose');

// Schema for vendors
const VendorSchema = new mongoose.Schema({
    vendorId: {
        type: String,
        unique: true,
        trim: true,
        required: 'ID required'
    },
    vendorName: {
        type: String,
        trim: true,
        required: 'Vendor name is required'
    },
    contactInfo: {
        phoneNumber: {
            type: String,
            trim: true,
            required: 'Please enter phone number'
        },
        email: {
            type: String,
            trim: true,
            required: 'Please enter email'
        },
        contactPerson: {
            type: String,
            trim: true,
            required: 'Please enter contact full name'
        }
    },
    address: {
        streetAddress: {
            type: String,
            trim: true,
            required: 'Please enter street address'
        },
        city: {
            type: String,
            trim: true,
            required: 'Please enter city'
        },
        province: {
            type: String,
            trim: true,
            required: 'Please enter province'
        },
        postalCode: {
            type: String,
            trim: true,
            required: 'Please enter postal code'
        },
        country: {
            type: String,
            trim: true,
            required: 'Please enter country'
        }
    },
    businessHours: {
        days: {
            type: String,
            trim: true,
            required: 'Please enter days open'
        },
        openingTime: {
            type: String,
            trim: true,
            required: 'Please enter opening time'
        },
        closingTime: {
            type: String,
            trim: true,
            required: 'Please enter closing time'
        },
        specialHours: {
            type: String,
            trim: true
        }
    },
    shopInfo: {
        shopLicenceNo: {
            type: String,
            trim: true,
            required: 'Please enter shop licence number'
        },
        shopLogo: {
            type: String,
            trim: true,
            required: 'Please enter shop logo'
        },
        shopDescription: {
            type: String,
            trim: true,
            required: 'Please enter shop description'
        }
    },
    notes: {
        type: String,
        trim: true
    },
    userAccount: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserAccount' 
    }
});
module.exports = mongoose.model('Vendor', VendorSchema);
