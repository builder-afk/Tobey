const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const jobIds = await fetchJson('https://hacker-news.firebaseio.com/v0/jobstories.json');
    console.log(`Found ${jobIds.length} job stories. Fetching first 5...`);
    for (let i = 0; i < 5; i++) {
      const job = await fetchJson(`https://hacker-news.firebaseio.com/v0/item/${jobIds[i]}.json`);
      console.log(job);
    }
  } catch (e) {
    console.error(e);
  }
}

run();
