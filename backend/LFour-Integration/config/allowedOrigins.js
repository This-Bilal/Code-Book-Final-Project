// The frontend_url is done after deployment
const frontend_url = process.env.CLIENT_URL

console.log(frontend_url);

const allowedOrigin = [
    "http://localhost:5173",
    "http://localhost:3002",
    frontend_url
]

module.exports = allowedOrigin