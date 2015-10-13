## react-product
This is a simple product search, exploring working with React, Falcor, Browserify and a bit of ES6. Currently it is auto-deploying via Travis CI to [github pages](http://johnwards.github.io/react-product/).


### Setup
Currently dependencies and scripts for testing, building and deploying are controlled through [npm](https://www.npmjs.com). 

It is required that you are running [node.js](https://nodejs.org) and npm, the application has been tested on Node 4.1 and above. 

#### Dependencies
Dependencies are listed in `package.json` the `"dependencies"` section are dependencies required for the application to function. `"devDependencies"` are dependencies to assist developing the application.

To setup a freshly checked out version of this application run `npm install` from the project route.

To add a new dependency you can do this via the command line:

    # Install falcor and update package.json
    npm install falcor --save
    # Install jest-cli and update package.json dev
    npm install jest-cli --save-dev

##### Browserify - require() in the browser
A plan for this project in the future is to share code between the frontend and the backend running nodejs. So it makes sense to use node style module loading in the frontend via [browserify](https://github.com/substack/node-browserify)

Any dependency added via npm and package.json you can then load in your own module via `require('react');` etc.

#### Development
For development we use [watchify](https://github.com/substack/watchify) to watch our main `app.js` file and it's dependencies for changes, and to build via browserify on the fly. We build our javascript file and save it into `public/js`.

We also bundle livereload capabilities, the live reload server is provided by a thin wrapper called [livereloadify](https://github.com/asbjornenge/livereloadify). To use this functionality it is recommended that you install the [livereload browser extension](http://livereload.com/extensions/). 

Finally a simple static web server ([http-server](https://github.com/indexzero/http-server)) is provided to serve assets out of the `public` folder. 

##### Quick start
    #Install livereload extension livereload.com/extensions/
    npm install
    # Start watchify, livereload, and static server
    npm start 

## Existing approach
### Client to fake server
Currently it is planned to serve out a JSON Graph, falcor style, from a node backend. However for the moment we are mocking this inside of `js/modules/products.js`

We've added to that mock a simple list of products, pointing to the `worksById` node in the graph.

When the app launches we request the first 25 products via a falcor path lookup `ProductModel.get("products[0..24].Title.TitleText")` and then pass the response to a straight forward React component.

We have approached the product list component as a single reuseable component, with the child nodes not currently shared. However we could split out child nodes into further component models as the application grows. You can find the ProductTable component in `js/components/ProductTable.react.js`

Our React components have been developed using the ES6 class standard and use JSX to describe the markup of the components. We use [bable](http://babeljs.io) to translate the JSX and ES6 code into cross compliant JavaScript at build time.

We have a simple filter which filters the results returned from falcor, this is just for a proof of concept only, in the future this query should be sent serverside to filter the results.

### Tests
We have used [Jest](https://facebook.github.io/jest/) to test our React components. Run `npm test` to execute the test suite.

Currently the tests are minimal, however getting testing in at this early stage gives us a foundation to build on.

### Deploy
We have a simple deployment strategy setup at the moment, controlled through [Travis CI](https://travis-ci.org)

Travis CI automatically checks out any changes to the master branch, runs `npm install`, then runs our tests `npm test`, if that all is successful runs our deploy script.

Currently the deploy script simply runs our build script, `npm run build`, which runs browserify directly on our js files, then runs [UglifyJS2](https://github.com/mishoo/UglifyJS2) on the output of that. Giving a nice production ready javascript file.

Once the build has finishes we run a very simple bash script (`scripts/deploy-ghpages.sh)`, this script creates a stripped down version of the files in `public` commits them to github in the [gh-pages branch](https://pages.github.com), then force pushes this branch. The act of force pushing this up to github forces a deploy at github onto the public url of http://johnwards.github.io/react-product/

