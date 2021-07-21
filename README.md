# expense-manager-nymble

## Expense Manager: 
## Requirements:

- [x] User authentication: SignIn and Signup
- [x] Provide three pages - Dashboard, Expenses, and reports accessible through a navbar.
- [x] Dashboard:
    1. Show total spent amount
    2. List last 5 transactions
- [x] Expenses:
    1. List of expenses for the current user.
    2. Button to create a new expense.
    3. Must contain the following fields: DateTime, Amount, Currency, Description (optional), and a Category.
    4. The categories are -- Home, Food, Fuel, Shopping and Other.
    5. Can be created only after logging in
    6. Can be read only by the user who owns it.
    7. Can be updated or deleted by the user who owns it.
    8. Ability to filter the expenses by category.
- [x] Report:
    1. Show total amount spent per week of the current month.
    2. Show total amount spent per category basis on the current month.
- [x] The front-end must be a Single-Page-Application.
- [x] Follow proper design guidelines and coding standards.

## Improvements

These are optional improvements that’ll help in boosting your submission score.

- [x] No business logic code in client app. (It must be only on the backend-server)
- [x] The front-end web client is a PWA (Progressive Web App).
- [x] Hosting the front-end and back-end to a cloud or hosting provider.
    1. Better if the cloud provider is Google Cloud Platform.
- [ ] Using GraphQL instead of traditional REST API.
- [ ] Pagination on the list of expenses.
- [ ] Use ReactiveExtensions in client web app: (RxJs for Javascript)
- [x] User roles -- Admin and normal users.
    1. A separate page for Admin listing all users (only accessible by admin users)
    2. Admin users can view the expenses of all the users.
    3. Admin users can edit or delete the expense of all users.
    
##### Legend 
- [x] : requirement fulfilled
- [ ] : not implemented
