[back/ddd/cqrs] Vehicle fleet parking management
=======
[Read subject here](https://github.com/fulll/hiring/blob/master/Backend/ddd-and-cqrs-intermediare-senior.md)

How to launch?
==============
`$ npm i`

`$ chmod 755 ./fleet`

`$ npm run test:bdd`

`$ npm run test:bdd:critical`

`$ npm run test:unit`

Commands
--- 
`$ ./fleet create <userId>`
> Create a new User and associate a new Fleet to him
> Returns fleetId on the standard output

`$ ./fleet register-vehicle <fleetId> <vehiclePlateNumber>`
> Register a vehicle in a Fleet

`$ ./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]`
> Set a location to a vehicle in a Fleet

You can also use `tsx ./src/infra/cli/index.ts` command instead of `./fleet` to launch the app.

Step 3
======
For code quality, we can use tools like ESLint/Prettier or Biomejs (which I used) to ensure code formatting and standard practices. We also use TypeScript for type safety and avoid making mistakes. We can also test our code using unit tests with Jest, and more complex tests using Cucumber.

For CI, we can set up a Docker Image, use Github Action to build, run the unit and bdd tests and perform lint checks to see if the code is satisfying the defined standards and publish it. 

For CD, on the server hand, we can use a tool like Watchtower to automatically update the running container, or, if we had a HTTP API version of this app, we could also push it on a cloud provider such as AWS or Heroku.
