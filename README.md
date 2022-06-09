# NoQ-API
API Documentation: https://documenter.getpostman.com/view/21272217/Uz5JGvK4

## Setup
Node v18
Npm 8

1. Clone repository and cd to the repository
2. Do ```npm install```
3. Create a ```.env``` file and configure the variables based on ```.env.example```

## Run
Do ```npm run devstart``` to start the server

## Additional
- ```npm run migrate``` : migrate database
- ```npm run lint```    : check eslint
- ```./mysql```         : connect to mysql database from the terminal (linux only)

## To do lists
- [ ] recommendation system API
- [ ] history API
- [ ] remove temporary isAdmin
- [ ] remove temporary nonexpiring token
- [ ] auto refresh token
- [ ] expired token handler
