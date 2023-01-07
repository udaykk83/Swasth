import app from './api/app.js';
//server is running on port 9001
const port = 9001

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
}) ; 