const dotenv = require('dotenv').config();
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

module.exports = async function getEvent () {
    const response = await notion.databases.query({database_id: databaseId});
    //console.log(response);

    const Event =  response.results.map((page) => {
        return{
            id: page.id,
            Title: page.properties.Name.title[0].text.content,
            Data: page.properties.Date.date.start,
            Tags: page.properties.Tags.multi_select[0].name,
            Description: page.properties.Description.rich_text[0].text.content,
        }
    })
    
    return Event
}