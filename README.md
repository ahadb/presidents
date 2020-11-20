# Presidents

An API that exposes all U.S. presidents and their portraits. Fun project in the spirit of elections - our API will be
fully open sourced and deployed soon.

## Todos

Our API is serving from the file system to get things working for a quick phase 1.

- [x] Improve testing capabilities
- [ ] Add CLI capabilities
- [x] Scaffold appropriate data with fields for images, desc, etc and port from JSON file
- [x] Remove initial persistence from files to server
- [x] Import data to MongoDB and query data from models appropriately
- [x] Add sub-routes, etc: `:id`
- [x] Split routes depending on deterministic review of what we want to expose
- [ ] Add Auth if needed
- [ ] Deploy instance

## Usage

```bash
$ git clone
$ npm install
$ npm run start:server
$ npm run test

...

Server listening on port 50525
TAP version 13
# should list all presidents
ok 1 number of presidents should match
ok 2 should be no id yet
ok 3 preceeded by should match
# should list all presidents with limit
ok 4 number of presidents should match
ok 5 precededBy should match
# should list all presidents with offset
ok 6 number of presidents should match
# cleanup


# ok
```

## Thanks To

[Library of Congress](https://www.loc.gov/free-to-use/) API's ...
