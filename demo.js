const fs = require('fs')

// Replace with your actual base ID and table name
const baseId = 'appfQlf543RyGLFmA';
const tableName = 'Table 1';
const apiKey = 'patEcIqNxihzzDHux.2f27d07aebdc5d5c4f4d12b25bb30ba60e4804a14c7a1d50986afa5a8b14b2e8';

// Airtable API URL
const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

// Function to fetch data from Airtable
async function fetchData() {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const data = await response.json();

        // data.records.forEach(record => {
        //     console.log(`Record ID: ${record.id}`);
        //     console.log(`Created Time: ${record.createdTime}`);
        //     console.log('Fields:', JSON.stringify(record.fields, null, 2));
        //     console.log('-----------------------------');
        // });

        fs.writeFile('airtable.json', JSON.stringify(data, null, 2), (err)=>{
            if(err) {
                console.error('err writing in file',err);
            }else{
                console.log('successful');
            }
        });
        
        // Process the data as needed
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data
fetchData();
