const fs = require('fs');
const dotenv = require('dotenv');

// 加載 .env 文件中的環境變量
dotenv.config();

// 從環境變量中讀取 API 密鑰、Base ID 和 Table Name
const baseId = process.env.BASE_ID;
const tableName = process.env.TABLE_NAME;
const apiKey = process.env.AIRTABLE_API_KEY;

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
