
# Store-Universal
##### Link to working application: https://berry-shop.herokuapp.com
#### Purpose:
_Application was created to demonstrate my knowledge of used technologies._

### Features
User who is not log in can see products available, but only logedin user can ad items to Cart and make orders. Application provided staff user who can add new products and changes status of orders every user. Staff permissions can grant only super user prevented by Django.
 
### DataStructure
Database was created using PostgreSQL based on graph schema presented here 
![data_structure](https://user-images.githubusercontent.com/62465226/94038566-e7a62a00-fdc6-11ea-84c1-57da7e8cf8b6.png)

### Shop Staff panel
In Shop staff panel Staff User can management all products and orders using forms.  
To check Staff panel func login with this data:
* Email: admin@gmail.com
* Password: ADMINadmin123

### Filtering
Application provide products filtering in backend, by:

* Product Category
![Category](https://user-images.githubusercontent.com/62465226/94040663-803da980-fdc9-11ea-9148-468b6a9c14b7.png)
* Price range
![pricef](https://user-images.githubusercontent.com/62465226/94040703-8c296b80-fdc9-11ea-8434-f8f52ab44fe7.png)


### Security
Application is protected from web attacks such as:
* Brute Attack 
* CSFR
* Clickjacking
* XSS


