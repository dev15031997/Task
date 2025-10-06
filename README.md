# Task

->Login Credentials
  Admin Login:
      Email: devashish@gmail.com
      Password: dev123

************************************************************************************************************
Admin & Seller Management System
This project covers two key roles — Admin and Seller, each with their own permissions, routes, and functionalities.
It's built using Node.js (Express), MongoDB (Mongoose), and React.js, with JWT authentication and Multer for file uploads.

->Admin Role
1)Returns an access token upon successful login, with assigned role information.
2)Can create multiple sellers.
3)Includes form-based seller creation with validation.
4)Has read access to all registered sellers and their respective product lists.
5)Protected routes (accessible only to Admin):
  /admin/create-seller — Create a new seller
  /admin/products — View all products
  /admin/sellers — View all sellers

6)Pagination is implemented for both sellers and products, activated once more than 3 records are available.
7)Admin can view all the products added by the sellers.
8)Displays a welcome screen after successful admin login.
9)Prevents creation of duplicate sellers using the same email ID.

->Seller Role
1)Can add multiple products via a single form.
2)Each product can contain multiple brands (with name, detail, image, and price).
3)Supports image upload in .jpg and .png formats from the local system.
4)Sellers can delete their own products.
5)Pagination is enabled once 4 or more products are added.
6)Displays a welcome screen after successful seller login.
7)Sellers can view and manage only their own products.

->Backend
1)Passwords are securely hashed using bcrypt.js.
2)JWT tokens are used for secure authentication for both Admin and Seller logins.
3)JWT tokens are valid for 24 hours — after which the user is automatically logged out.
4)Multer handles product image uploads.
5)All sensitive keys and configuration values are stored in environment variables for better security.
6)The login system includes basic validation and displays pop-up alerts for invalid credentials.
