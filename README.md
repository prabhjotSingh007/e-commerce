E-Commerce Platform - Angular 17

This project is a user-friendly e-commerce platform built with Angular 17, integrating the FakeStore API. It features product listings, filtration, cart management, and authentication functionalities, delivering a seamless shopping experience.
Features

    Product Listing: Displays all products from the FakeStore API.
    Product Filters: Filter products based on category, price, and star rating.
    Product Details Page: View detailed information for a selected product.
    Cart Management: Add and remove items from the cart.
    Authentication:
        Guest users: Can browse products and add to the cart.
        Authenticated users: Full functionality, including checkout and wishlist.
    Responsive UI: Optimized for both desktop and mobile devices.

Technologies Used

    Angular 17
    FakeStore API
    Angular Material
    Angular Snackbar Service
    Authentication System

Routes

    Public Routes:
        All Products (/products)
        Single Product (/products/:id)
    Private Routes (Authenticated Users Only):
        Cart (/cart)
        Wishlist (/wishlist)

Installation

    Clone the repository.
    Install dependencies: npm install
    Run the development server: ng serve

API Integration

    Product Data: Fetched from the FakeStore API.
    Category Filter: Using the /products/categories endpoint.
    Single Product Details: Fetched with /products/:id.
