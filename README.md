# My Express App for Anchor

Welcome to My App! This application is built with Express.js and does amazing things. Well, it does some sheets logic and that is it, actually.

## Installation

To install My App, follow these steps:

1. Clone the repository: `git clone https://github.com/omrisig1/my-anchor-app.git`
2. Navigate to the project directory: `cd Anchor`
3. Install dependencies: `npm install`

## Usage

To run My App locally, follow these steps:

1. Start the server: `npm run start`
2. Open Postman and import the provided collection located in the project directory(Anchor.postman_collection), or just run according to the following instructions.
3. Use the following endpoints:cd

### GET
- **Get Sheet:** `localhost:3030/api/sheets/1`

### POST
- **Create Sheet:** `localhost:3030/api/sheets`
    - Body:
      ```json
      {
          "columns": [
              {
                  "name": "A",
                  "type": "boolean"
              },
              {
                  "name": "B",
                  "type": "string"
              }
          ]
      }
      ```

### PUT
- **Set Cell:** `localhost:3030/api/sheets/1`
    - Body:
      ```json
      {
          "name": "A",
          "number": "6",
          "_value": "lookup('A',8)",
          "value": true
      }
      ```

4. Enjoy using the application!

## Testing

To run tests for My App, follow these steps:

1. Run the tests: `npm run test`
