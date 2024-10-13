# Computer Comparer

Computer Comparer is a web application that allows users to compare different computer specifications. The application is built using Flask for the backend and HTML, CSS, and JavaScript for the frontend.


## Installation

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd Computer-Comparer
    ```

2. Create a virtual environment and activate it:

    ```sh
    python -m venv .venv

    # For Linux use
    source venv/bin/activate

    # On Windows use
    .venv\Scripts\activate
    ```

3. Install the required packages:

    ```sh
    pip install -r requirements.txt
    ```

## Usage

1. Run the Flask application:

    ```sh
    python main.py
    ```

2. Open your web browser and navigate to `http://127.0.0.1:5000`.

## Project Files

- `main.py`: The main Flask application file. It sets up the routes and handles the backend logic.
- `color.py`: Contains utility functions for colored terminal output.
- `data.json`: The JSON file that stores the computer specifications.
- `static/`:
  - `script.js`: JavaScript file for frontend logic.
  - `style.css`: CSS file for styling the web pages.
- `templates/`:
  - `index.html`: The main HTML template for the application.

## API Endpoints

- `GET /api/data`: Fetches the computer specifications from `data.json`.
- `POST /api/data/update`: Updates the computer specifications in `data.json`.

## License

This project is licensed under the MIT License.
