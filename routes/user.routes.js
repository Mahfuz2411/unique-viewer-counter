// routes/userRoutes.js
import express from 'express';
import { getUniqueViewerSVG } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/image', getUniqueViewerSVG); // Route to handle /image

userRouter.get('/', async(req, res) => {
    return res.json({dest: "user route"});
});

export default userRouter;
