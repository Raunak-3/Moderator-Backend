const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const brandRoutes = require('./routes/brandRoutes');
const photographer=require('./routes/photographers/photographerRoutes')
const review=require('./routes/photographers/reviewRoutes')
const cors = require('cors');

// const Brand = require('./models/Brand');


dotenv.config();
connectDB();



const app = express();


app.use(cors());
app.use(express.json()); // For parsing application/json
app.use('/api/brands', brandRoutes); // Use brand routes
app.use('/api/photographers', photographer);
app.use('/api/reviews', review);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
