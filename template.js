//In js you can export functions and variables to use in other files.
//Here we're setting up a default html document as a string to build our other code off of.
//This html will be served at the root url, it will be automatically requested upon reaching localhost:3000

//Adding in some stylesheets



export default () => {
  console.log('made it to template')
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <title>MERN Skeleton</title>
        </head>
        <body>
          <div id="root"> Fuck React</div>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`
    
}//Once you write this, you have to feed it to the express instance

//Adding <script type="text/javascript" src="/dist/bundle.js"></script>
//automatically loads our react frontend code from /dist/bundle.js whenever the server
//gets a visit at the root url