# NoQ-API
API Documentation: https://documenter.getpostman.com/view/21272217/Uz5JGvK4

## Setup
Node v18  
Npm 8

1. Clone repository and cd to the repository
2. Do ```npm install```
3. Create a ```.env``` file and configure the variables based on ```.env.example```

## Commands
- ```npm run devstart``` : start the server
- ```npm run migrate```  : migrate database
- ```npm run lint```     : check eslint
- ```./mysql```          : connect to mysql database from the terminal (linux only)

## To do lists
- [ ] remove temporary nonexpiring token
- [ ] auto refresh token
- [ ] expired token handler

## Concerns
- The menu recommendation is still calculated by the total ordered menu.
- Should I handle if the customer has no order history?

## Additional Notes
I am still learning and improving. If you have feedbacks regarding my messy code, Please let me know. I'll happily receive your feedback.