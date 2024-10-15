# Computer Comparer

Computer Comparer is a web application that allows users to compare different computer specifications. The application is built using Flask for the backend and HTML, CSS, and JavaScript for the frontend.

> [!WARNING]
> This is a practice project and is not recommended for production use

## Download

Try out already pre-built applications from the [release](https://github.com/D3FAU4T/Computer-Comparer/releases) section of this Github Repositry. Otherwise if you prefer to manually build the project, follow the guide below.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/D3FAU4T/Computer-Comparer.git
    cd Computer-Comparer
    ```

2. Create a virtual environment and activate it:

    ```sh
    python -m venv .venv # Use `python3` for Linux

    # On Linux use
    source .venv/bin/activate

    # On Windows use
    .venv\Scripts\activate
    ```
  
> [!NOTE]
> On Linux, you may need to install `python3.12-venv` library before running the command, if it gives any error
>
> ```sh
> sudo apt install python3.12-venv
> ```
>
> Or if you use another package-manager, install with that.

3. Install the required packages:

    ```sh
    pip install -r requirements.txt
    ```

> [!NOTE]
> On Linux, you may need to install `python3-pip` library before running the command, if it gives any error
>
> ```sh
> sudo apt install python3-pip
> ```
>
> Or if you use another package-manager, install with that

## Usage

To use the application as-is from the code, follow the given instructions:

1. Run the Flask application:

    ```sh
    python main.py # Use `python3` for Linux
    ```

2. Open your web browser and navigate to `http://127.0.0.1:5000`.

## Build

To build the project into an executable or a linux binary, run the following command:

```sh
python build.py # Use `python3` for Linux
```

The output should be in the `dist` folder in the project's root directory

## Project Files

- `main.py`: The main Flask application file. It sets up the routes and handles the backend logic.
- `color.py`: Contains utility functions for colored terminal output.
- `build.py`: Contains OS-specific instructions to build the application
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
