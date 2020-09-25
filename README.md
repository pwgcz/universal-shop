
# Universal-shop
##### Link to working application: https://berry-shop.herokuapp.com
#### Purpose:
_Application was created to demonstrate my knowledge of used technologies. Application is a e-commerce website 
which offers berry seedlings. It is easy to change to sell any products_

### Used main technologies:
* Django 3.1.1
* Django Rest Framework 3.11.0
* React 16.13.1

### Features
User who is not log in can see products available, but only login user can ad items to Cart and make orders. Application provided staff user who can add new products and changes status of orders every user. Staff permissions can grant only super user provided by Django.
 
### DataStructure
Database was created using PostgreSQL based on graph schema presented here 
![data_structure](https://user-images.githubusercontent.com/62465226/94038566-e7a62a00-fdc6-11ea-84c1-57da7e8cf8b6.png)



### Shop Staff panel
In Shop staff panel Staff User can management all products and orders using forms.  
To check Staff panel functionality login with this data:
* Email: admin@gmail.com
* Password: ADMINadmin123

StaffPanel-orders:
![orders](https://user-images.githubusercontent.com/62465226/94147145-35796b80-fe75-11ea-829e-3c143c6a76fe.png)
Logedin-orders:
![staffpanel](https://user-images.githubusercontent.com/62465226/94147209-4924d200-fe75-11ea-92f5-e756238e459b.png)

### Cart
Only login user have access to shop cart
![cart](https://user-images.githubusercontent.com/62465226/94147460-96a13f00-fe75-11ea-950c-accfb3d04ff8.png) 
### Products side
![products](https://user-images.githubusercontent.com/62465226/94146751-aec48e80-fe74-11ea-9bb1-a36523062190.png)
### Filtering
Application provide products filtering in backend, by:

* Product Category
![Category](https://user-images.githubusercontent.com/62465226/94040663-803da980-fdc9-11ea-9148-468b6a9c14b7.png)
* Price range
![pricef](https://user-images.githubusercontent.com/62465226/94040703-8c296b80-fdc9-11ea-8434-f8f52ab44fe7.png)


### Application is fully responsive 
![reasponsiv](https://user-images.githubusercontent.com/62465226/94147653-dc5e0780-fe75-11ea-9f8e-2a07d3f75fbc.png)
### Security
Application is protected from web attacks such as:
* Brute Attack 
* CSFR
* Clickjacking
* XSS


