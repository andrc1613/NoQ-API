# NoQ-API

## Setup
Node v18.0.0
Npm 8.6.0

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
- [ ] Change isAdmin (0, 1) to status (USER, ADMIN, ROOT) (Users)  
- [ ] Add menuName column (OrdersMenus)
