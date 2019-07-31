module.exports = {
    "port": 8000,
    "appEndpoint": "http://localhost:3600",
    "apiEndpoint": "http://localhost:8000",
    "jwt_secret": "openbanking!!123",
    "mongoURI": 'mongodb://localhost:27017/openbanking',
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 3,
        "ADMIN": 1
    },
    "externalPort" : 30000,
};
