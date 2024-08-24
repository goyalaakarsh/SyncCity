// import { exec } from 'child_process';

// // Handle the POST request for summarization
// export const summarizeProject = (req, res) => {
//     const projectDetails = req.body.projectDetails;

//     // Escape special characters to prevent shell injection
//     const escapedProjectDetails = projectDetails.replace(/"/g, '\\"');

//     // Execute the Python script
//     exec(`python3 summarize.py "${escapedProjectDetails}"`, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing Python script: ${error}`);
//             return res.status(500).json({ error: 'An error occurred while generating the summary.' });
//         }

//         if (stderr) {
//             console.error(`Python script stderr: ${stderr}`);
//             return res.status(500).json({ error: 'An error occurred while generating the summary.' });
//         }

//         // Send the summary back to the client
//         res.json({ summary: stdout.trim() });
//     });
// };
