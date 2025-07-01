const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  app.get('/', async (req, res) => {
    try {
      const url = 'https://www.linkedin.com/in/mohan-golakoti-4a2126217/'; // Replace with the actual URL
  
      // Add a delay to avoid rate-limiting
      await delay(2000); // 2 seconds delay
  
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      console.log($)
      console.log(data)
  
      const pageTitle = $('title').text();
  
      res.json({
        title: pageTitle
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while scraping',error);
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
