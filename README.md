# Presidents

An API that exposes all U.S. presidents and their portraits. Fun project in the spirit of elections - you can use this API at your will, help add to it, make it your 
own or deploy it. You have all the tools necessary to import your data to Mongo, Swagger client etc, good level of unit testing.

## Roadmap

- [x] Improve testing capabilities
- [x] Add Swagger Client
- [ ] Add CLI capabilities
- [x] Scaffold appropriate data with fields for images, desc, etc and port from JSON file
- [x] Remove initial persistence from files to server
- [x] Import data to MongoDB and query data from models appropriately
- [x] Add sub-routes, etc: `:id`
- [x] Split routes depending on deterministic review of what we want to expose
- [ ] Add Auth for admin routes that do CRUD
- [ ] Add PUT, POST routes for admin to add items
- [ ] Deploy instance


## Usage

```bash
$ git clone
$ npm install
$ npm run start:server
$ npm run test

...

Server listening on port 52638
TAP version 13
# setup
# should list all presidents
ok 1 number of presidents should match
ok 2 id should match
ok 3 president name should match
# should list all presidents with limit
ok 4 number of presidents should match
ok 5 id should match
ok 6 president name should match
# should list all presidents with offset
ok 7 number of presidents should match
# should list presidents with ascending sort order
ok 8 id should match
# should list presidents with descending sort order
ok 9 id should match
# should list 30 presidents in descending order
ok 10 id should match
# cleanup

1..10
# tests 10
# pass  10

# ok

```

## Routes & Model

We expose only two routes and one for the Swagger API docs on `localhost:1337`:

1. GET: /presidents
```bash
curl -X GET "http://localhost:1337/presidents" -H  "accept: application/json"
```

2. GET: /presidents/:id
```bash
curl -X GET "http://localhost:1337/presidents" -H  "accept: application/json"
```

3. GET: /api-docs
```html
http://localhost:1337/api-docs/
```

Model
```json
{
  "_id": "string",
  "presidentName": "string",
  "presidentElectedNumber": "string",
  "vicePresident": "string",
  "precededBy": "string",
  "politicalParty": "string",
  "dateOfBirth": "string",
  "imgThumb": "string",
  "img": "string"
}
```

## Thanks To

[Library of Congress](https://www.loc.gov/free-to-use/) API's ...
