import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI("AIzaSyAhvV0E6B84j39A6S6_XTl426AnVFEiQnU");
const genAI = new GoogleGenerativeAI("AIzaSyB1_MJBhlk5m6jiNysEAVOZ_15lMReO_d4");
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const summarizeProject = async (req, res) => {
    console.log("Received request to summarize project");

    const projectDetails = req.body.projectDetails;
    console.log("Project Details:", projectDetails);

    try {
        console.log("Sending request to API...");

        const result = await model.generateContent(`Summarize the following project details in 2-3 lines: ${projectDetails}`);
        const response = await result.response;
        const summary = await response.text();

        console.log("API Response:", summary);

        res.json({ summary });
    } catch (error) {
        console.error(`Error making API request: ${error.message}`);
        if (error.response) {
            console.error('API Response Error:', error.response.data);
        }
        res.status(500).json({ error: 'An error occurred while generating the summary.' });
    }
};
