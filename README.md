# Presidents

An API that exposes all U.S. presidents and their portraits. Fun project in the spirit of elections - our API will be
fully open sourced and deployed soon.

## Todos

Our API is serving from the file system to get things working for a quick phase 1.

- [ ] Scaffold appropriate data with fields for images, desc, etc and port from JSON file
- [ ] Remove initial persistence from files to server
- [ ] Import data to MongoDB and query data from models appropriately
- [ ] Add sub-routes, etc: `:id`
- [ ] Split routes depending on deterministic review of what we want to expose
- [ ] Deploy instance

## Usage

```bash
$ git clone
$ npm install
$ node server.js
$ npm run test
```

## Thanks To

[Library of Congress](https://www.loc.gov/free-to-use/) API's ...
