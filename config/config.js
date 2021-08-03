//const is a data type in javascript which specifies read only access, its like final in Java
//This const is an ?object? containing variables env, port, jswtSecret, mongoUri, which sets up a default configuration
//for communication with our database.
const config ={
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",  
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') + '/mernproject'
}
export default config