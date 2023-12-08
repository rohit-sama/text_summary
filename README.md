# Text Summary API

The Text Summary API is a service designed to summarize text content using the Cohere AI summarization model. This API provides endpoints for text summarization, storing summarized data, retrieving historical data, and clearing the stored history.

## Features

- Summarize text content using Cohere AI summarization.
- Store summarized data along with the original text.
- Retrieve historical summarized data.
- Clear stored historical data.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- Axios
- Cohere AI API
- CORS
- dotenv

## ScreenshotS
![image](https://github.com/rohit-sama/text_summary/assets/112627630/7570d8b1-ed03-4d82-959b-a001cc6c6eed)
![image](https://github.com/rohit-sama/text_summary/assets/112627630/8c46c975-7f2d-4f84-b1f4-d0cab5198a4a)

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/rohit-sama/text-summary-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd text-summary/frontend
    cd text-summary/backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    MONGO_URL=your_mongodb_connection_string
    COHERE_API_KEY=your_cohere_api_key
    ```

5. Run the server:

    ```bash
    cd backend
    nodemon server.js
    cd ..
    cd frontend
    npm run dev
    ```

6. Access the API endpoints:

    - Summarize text: `POST /summarize-text/v2`
    - Get historical data: `GET /api-data`
    - Clear historical data: `DELETE /clear-history`

## Contributors

- [Rohit](https://github.com/rohit-sama)



