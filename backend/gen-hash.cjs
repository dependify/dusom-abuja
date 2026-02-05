const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('admin123', 10);
console.log('New hash:', hash);
console.log('Verify:', bcrypt.compareSync('admin123', hash));
