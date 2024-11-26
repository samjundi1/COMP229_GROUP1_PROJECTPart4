//we will set up with mongo atlas database. For now I just set it to port 3000 to check if it runs on server
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.Port || 8080,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI || 
    "mongodb+srv://mavericks:mernMavericks@cluster73486.jd4ag.mongodb.net/flowerCatalogdb?retryWrites=true&w=majority" ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_POST ||'27017') + 
    '/flowerCatalogdb'
};
module.exports = config;

// export default config