const express = require('express');
const axios = require('axios');

const {applyFilters, verifyDatePicker} = require('utils')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/:formId/filteredResponses', async (req, res) => {
    try {
        const { formId } = req.params;
        const { filters, page, pageSize } = req.query;

        const apiKey = process.env.API_KEY;
        
        const response = await axios.get(`https://api.fillout.com/v1/api/forms/${formId}/submissions`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            params: {
                page,
                pageSize
            }
        })
        if(response){
           
        const filteredResponses = applyFilters(response.data.responses, JSON.parse(filters));
        return res.json({
                responses: filteredResponses,
                totalResponses: filteredResponses.length,
                pageCount: 1
            });
        }
       
       throw new Error("Unable To Fetch Responses")

    } catch (error) {
        console.error('Error fetching or processing responses:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});




app.get('/', (req, res) => {
    res.send('Welcome to the Fillout.com API server');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
