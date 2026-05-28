require('dotenv').config();
const app = require('./app');
const dataSource = require('./database/data-source');

const PORT = process.env.PORT || 3001;

dataSource.initialize()
  .then(() => {
    console.log('Data Source initialized');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('http://localhost:3001/api/docs');
    
    });
    
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
    process.exit(1);
  });
