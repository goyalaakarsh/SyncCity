
import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    // Simulate processing and response
    const projectDetails = req.body.projectDetails;

    // Dummy response for demonstration
    const summary = `Summary for: ${projectDetails}`;

    res.json({ summary });
});

export default router;
