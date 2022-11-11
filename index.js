const dotenv = require('dotenv').config();
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser

const getEvent = async () => {
    const response = await notion.databases.query({database_id: databaseId});
    console.log(response);
    console.log(response.   properties);
    // const payload  = {
    //     path: `databases/${databaseId}/query`,
    //     method: 'POST',
    // }
    // const {results} = await notion.request(payload)
    // console.log(results);
}

getEvent()
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// Use default router
server.use(router)
// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running http://localhost:${PORT}`)
})