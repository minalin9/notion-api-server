require("dotenv").config();
const axios = require("axios");

async function NotionApi() {
  return await axios
    .get(
      `https://api.notion.com/v1/databases/${process.env.DATABASE_ID}/query`,
      {
        page_size: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      }
    )
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      NotionApi = undefined;
      console.log(err);
    });
}

module.exports = NotionApi;
