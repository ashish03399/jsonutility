import express from 'express';
import fs from 'fs';
import ReactDOMServer from "react-dom/server";

const app = express();

app.get('/', ()=>{
  // Renders our Dashboard component into an HTML string
  const html = ReactDOMServer.renderToStaticMarkup(
    <Dashboard />
  );

  // Load contents of index.html
  fs.readFile('../../Public/index.html', 'utf8', function (err, data) {
    if (err) throw err;

    // Inserts the rendered React HTML into our main div
    const document = data.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`);

    // Sends the response back to the client
    res.status(200).send(document);
  });


})

app.listen(3000);
