//In js you can export functions and variables to use in other files.
//Here we're setting up a default html document as a string to build our other code off of.
//This html will be served at the root url, it will be automatically requested upon reaching localhost:3000

export default () => { //It wanted backticks
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>MERN Skeleton</title>
        </head>
        <body>
          <div id="root">Hello world</div>
        </body>
      </html>`
    
}//Once you write this, you have to feed it to the express instance