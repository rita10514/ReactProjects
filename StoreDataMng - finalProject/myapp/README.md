React Store Data Management
============
This is a website for managing a store data.

---

## Features
- add, update, and delete data
- search and sort purchases

#### Data Structure:  
- **firebase database** of customers, products and purchases:
  - Products: Name, Price, Quantity
  - Customers: First Name, Last Name, City
  - Purchases: CustomerID, ProductID, Date   

The data base has the following initial data:
- 2 products
- 2 customers

(The purchases collection is empty) 

---

## Setup
Go to [firebase](https://firebase.google.com/?gclid=EAIaIQobChMI1Oek6qaz-gIVA4jVCh25nQkuEAAYASAAEgKopvD_BwE&gclsrc=aw.ds), log in to your google account and create a new repository.

Go to the src\firebase file and copy your configuration information.

![firebase](https://i.imgur.com/XRlSv4Dl.png)

Create the collections and the anitial data mantioned above.

![example](https://i.imgur.com/oHKRb7l.png)


Open the directory in VS Code and run `npm install`, to install all the dependencies.

---

## Usage
Once the dependencies are installed, you can run  `npm start`, to start the application. You will then be able to access the website at localhost:3000.
 
---

## Preview
<div align="center">
  <img align=center height="600"  src="https://media.giphy.com/media/v7fN7IPJCD3uCT0DL6/giphy.gif">
</div>





