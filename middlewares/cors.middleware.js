// middlewares/corsMiddleware.js
import cors from 'cors';

const corsMiddleware = cors({
  credentials: true, // Allow credentials like cookies
  origin: ["http://localhost:3000"], // Change this to your client URL
});

export default corsMiddleware;
