import color
import json
import os
import sys
from flask import Flask, render_template, request
    
DATABASE_PATH = os.path.join(os.getcwd(), 'data.json')

DATA_FORMAT = '''{
    "name": string,
    "price": number,
    "processor": number,
    "ramInGB": number,
    "storageInGB": number,
    "displayInInches": number,
    "batteryInHours": number,
    "weightInKg": number
}[]'''

def exit_with_error(message: str):
    print(message)
    input(color.green("\nPress Enter to exit..."))
    sys.exit(1)
    
def get_database(path: str):
    try:
        with open(path, 'r') as f:
            data = json.load(f)
        return data
    
    except json.JSONDecodeError:
        exit_with_error(color.red('× Invalid JSON format in data.json'))
        
    except FileNotFoundError:
        print(f'{color.red("× File not found:")} {color.green("data.json")}\n{color.yellow("! Automatically creating cache file with the following data format:")}\n\n{color.purple(DATA_FORMAT)}\n\n')
        with open(path, 'w') as f:
            f.write('[]')
        return get_database(path)
        
get_database(DATABASE_PATH) 

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    return get_database(DATABASE_PATH)

@app.post('/api/data/update')
def update_data():
    data = request.json
    try:
        with open(DATABASE_PATH, 'w') as f:
            json.dump(data, f, indent=4)
        return {'success': True}
    except:
        return {'success': False}


if __name__ == '__main__':
    app.run()