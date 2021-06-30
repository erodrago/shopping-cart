<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Shopping Cart application</h3>

  <p align="center">
    Simple demonstration of a shopping cart microservice
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#erd-diagram">ERD Diagram</a></li>
      </ul>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#run-on-local-machine">Run on local machine</a></li>
        <li><a href="#documentation">Documentation</a></li>
      </ul>
    </li>
    <li><a href="#future-work">Future work</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a simple microservice that demonstrate functionalities of a shopping cart. A shopping cart on an ecomerce site is a service that facilitates the purchase of a product or service by accepting customers payment and sending to other services for processing.

Features of the shopping cart:
* Simple functionalities for adding product, categories, users and discounts to bootstrap the shopping cart.
* Add items to a cart.
* Remove items from a cart
* Edit items in a cart.
* Order selected items

### ERD Diagram
<br />
The following is an ERD Diagram of the project.
<br />

![Alt text](/docs/images/erd.png?raw=true "Optional Title")


### Built With

The following is a list of technologies used in the project:
* Language: JavaScript
* Database: mysql
* Server: Node, Express
* Testing: Jest, supertest
* ORM used: Sequelize
* Caching: Redis *(in progress)*



<!-- GETTING STARTED -->
## Getting Started

In this section we discuss how to setup and run the application locally. 

### Prerequisites
You should have npm and mysql installed.

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/erodrago/shopping-cart.git
    ```

2. Install NPM packages: Navigate to the cloned directory and run
    ```sh
    npm install
    ```

3. Set up database table by running:
    ```
    npm run db:setup
    ```
4. Enter your DB configurations in `.env` file. the format of the dot env as described in .env.example
    ```JS
        DATABASE=db_name
        DATABASE_USER=db_username
        PASSWORD=db_password
        HOST=localhost
        DATABASE_DIALECT=mysql

        PORT=3000
    ```

### Run on local machine

You can run by executing on terminal either:

    
        npm start
    
or

    
        npm run dev
    

### Documentation

After running the project, to view documentation via swagger, in your browser navigate to: 
```
http://localhost:PORT/api-docs
```

Alternatively in the project directory there is a directory called postman, navigate and download the json,
import the Json file on postman and you will be ready to test the APIs.

<!-- FUTURE WORK -->
## Future Work

1. Docker integration
2. Security integration
3. Demonstration of caching
4. Experiment with graphql

<!-- CONTRIBUTING -->
## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request