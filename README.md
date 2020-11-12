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
$ npm run start:server
$ npm run test

...

TAP version 13
# should show json only on / route
ok 1 should be equal
# should accept query string params { limit, offset } and return 200 OK on the given /presidents route
ok 2 the status code should be 200 OK
ok 3 the status code should not be 404
ok 4 the status code should not be 403
# should return 200 OK on the given /presidents route
ok 5 the status code should be 200 OK
# should return 404 Not Found on incorrect route
ok 6 the status code should be 404 Not Found

1..6
# tests 6
# pass  6

# ok
```

## Thanks To

[Library of Congress](https://www.loc.gov/free-to-use/) API's ...
