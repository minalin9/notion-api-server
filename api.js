const { Client, APIErrorCode } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function queryDatabase() {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
  });
  return response;
}

async function createPage(category, content, title, created_at, modified_at) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: process.env.DATABASE_ID },
      // 필요한 정보:
      // properties?.category?.select?.name
      // properties?.title?.title[0]?.text?.content
      // properties?.content?.rich_text[0]?.text?.content
      // properties?.created_at?.created_time
      // properties?.modified_at?.last_edited_time

      properties: {
        category: {
          select: {
            name: category,
          },
        },
        title: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
        content: {
          rich_text: [
            {
              text: {
                content: content,
              },
            },
          ],
        },
        created_at: {
          created_time: created_at,
        },
        modified_at: {
          last_edited_time: modified_at,
        },
      },
    });

    return response;
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      throw new Error("Database not found");
    }

    throw new Error("Error creating page");
  }
}

module.exports = {
  queryDatabase,
  createPage,
};
