const bcrypt = require('bcryptjs');
const hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjXZ0LkRrKp3LWzRbJ5z0UM9BhxQy6q';
bcrypt.compare('admin123', hash).then(result => console.log('Password match:', result));
