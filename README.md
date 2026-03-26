# ICICI Bank Transaction Testing Application

A complete React application demonstrating modern JavaScript testing practices with Jest and React Testing Library, based on a real-world banking transaction case study.

## Features

- **User Authentication**: Mock login system
- **Account Dashboard**: View account balances
- **Fund Transfer**: Complete transaction flow with validation
- **Transaction Processing**: Success/failure handling
- **Responsive UI**: Clean, professional banking interface

## Testing Frameworks Used

- **Jest**: Unit testing framework for JavaScript
- **React Testing Library**: Component testing focused on user interactions

## Application Structure

```
src/
├── App.js              # Main application component
├── App.test.js         # Comprehensive App component tests
├── AmountInput.js      # Reusable amount input component
├── AmountInput.test.js # Component-specific tests
├── index.js            # React app entry point
├── index.css           # Application styles
└── validateTransaction.js & .test.js # Business logic tests
```

## Running the Application

1. **Start the development server**:
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

2. **Run the test suite**:
   ```bash
   npm test
   ```

## Test Coverage

The application includes comprehensive tests covering:

- **Unit Tests**: Transaction validation logic
- **Component Tests**: UI component interactions
- **Integration Tests**: Complete user flows (login → transfer → result)
- **Form Validation**: Input handling and error states
- **Navigation**: Screen transitions and back buttons

## Case Study: ICICI Bank Transaction Flow

1. **Login**: User authenticates with the banking system
2. **Dashboard**: View account balances and select transfer option
3. **Transfer Form**: Select source account, enter recipient details and amount
4. **Validation**: Real-time validation of transaction parameters
5. **Processing**: Transaction execution with success/failure feedback
6. **Confirmation**: Transaction receipt with details

## Testing Benefits Demonstrated

- **Confidence**: Automated tests ensure code reliability
- **Regression Prevention**: Catch bugs before they reach production
- **Refactoring Safety**: Tests enable safe code improvements
- **Documentation**: Tests serve as living documentation
- **Developer Productivity**: Fast feedback during development

## Technologies

- React 18
- Jest
- React Testing Library
- Create React App
- CSS3

Run `npm test` to see all 13 tests pass and experience the confidence that proper testing brings to JavaScript application development!
