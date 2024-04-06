require('dotenv').config();
const express = require('express');
const { Client } = require('@notionhq/client');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function queryDatabase() {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
  });
  return response;
}
module.exports = async (req, res) => {
  try {
    const response = await queryDatabase();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
// app.use('/api', createProxyMiddleware({ 
//   target: 'https://api.notion.com', 
//   changeOrigin: true,
//   pathRewrite: {
//     '^/api': '/v1/databases/' + process.env.DATABASE_ID + '/query',
//   },
//   onProxyReq: function(proxyReq, req, res) {
//     // 헤더 수정
//     proxyReq.setHeader('Authorization', `Bearer ${process.env.TOKEN}`);
//     proxyReq.setHeader('Notion-Version', '2022-06-28');

//     // 본문 수정
//     if (req.body) {
//       const bodyData = JSON.stringify(req.body);
//       proxyReq.setHeader('Content-Type', 'application/json');
//       proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
//       proxyReq.write(bodyData);
//     }
//   }
// }));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// app.get('/api', async (req, res) => {
//   try {
//     const response = await NotionApi();
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.toString() });
//   }
// });
app.get('/api', async (req, res) => {
  try {
    const response = await queryDatabase();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});