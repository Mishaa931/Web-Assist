// scrapper.mjs
import axios from 'axios';
import cheerio from 'cheerio';


const getRandomUserAgent = () => {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/85 Version/11.1.1 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4859.209 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4859.164 Safari/537.36'
  ]
  const randomIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomIndex];
};

const PerformSearch = async (query, numPages = 10) => {
  try {
    let results = [];

    for (let page = 0; page < numPages; page++) {
      const startIndex = page * 10; // 10 results per page
      const response = await axios.get(
        `https://www.google.com/search?q=${encodeURIComponent(query)}&start=${startIndex}`,
        {
          headers: {
            'User-Agent': getRandomUserAgent(),
          },
        }
      );

      const $ = cheerio.load(response.data);
      let titles = [];
      let links = [];
      let snippets = [];
      let sites = [];
      let sitelinks = [];
      let htmlContents = [];  // Added array to store HTML content

      $('.g .yuRUbf h3').each((i, el) => {
        titles[i] = $(el).text();
      });
      $('.yuRUbf a').each((i, el) => {
        links[i] = $(el).attr('href');
      });
      $('.g .VwiC3b ').each((i, el) => {
        snippets[i] = $(el).text();
      });
      $('.g .VuuXrf ').each((i, el) => {
        sites[i] = $(el).text();
      });
      $('.g .yuRUbf .NJjxre .tjvcx').each((i, el) => {
        sitelinks[i] = $(el).text();
      });
      $('.g .IsZvec').each((i, el) => {
        htmlContents[i] = $(el).html();  // Extract HTML content
      });

      const pageResults = titles.map((title, i) => ({
        title,
        url: links[i],
        snippet: snippets[i],
        site: sites[i],
        sitelink: sitelinks[i],
        html: htmlContents[i],  // Add HTML content to the result
        rank: startIndex + i + 1,  // Calculate the rank based on the page and position
        relevance: i + 1,  // Use the position as the relevance 
        icon: 'https://api.faviconkit.com/{domain}/192'.replace('{domain}', new URL(links[i]).hostname),
      }));

      results = results.concat(pageResults);
    }

    console.log(JSON.stringify(results));
    return results;
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.status : error.message);
    return [];
  }
};

// Call the PerformSearch function with the query provided in the command line arguments
const results = PerformSearch(process.argv[2], 6);

