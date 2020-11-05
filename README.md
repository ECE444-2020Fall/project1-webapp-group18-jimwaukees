# Chef Co-pilot Web Application

## Local Dev Setup

### System Requirements:
Python version 3 or higher installed  
Latest stable node version https://nodejs.org/en/download/  

### Step 1:
Clone this Github repository to your local machine.

### Step 2:
cd into this project and run `python -m venv venv`  
This command creates a new folder called 'venv' within this project folder. This folder name is included in the .gitignore file so please ensure you use the same name.

### Step 3:
Run `source venv/Scripts/activate`  
This command activates the newly created virtual environement, on which the flask based back end framework runs.

### Step 4:
Run `pip install flask`  
This command intalls flask onto the virtual environment allowing it to be used from the code within.

### Step 5:
Run the following commands  
`export FLASK_APP=api`  
`export FLASK_DEBUG=1`  
These commands tell flask in what folder to run the back end and whether the debug option is enabled or not. In this case, we set it to 1 which means it is enabled. This mode is useful during development.

### Step 6:
Run `flask run`  
NOTE: Ensure you are in the root directory of the project, NOT in the api folder when you run this command. You should see the standard flask start up text and it should say:  
`Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)`  
Leave this session running.

### Step 7:
In another terminal, navigate back into this project directory and cd into the 'ui-react' folder. This folder contains the react based front end of the application.  
Inside this folder run `npm install`  
This command intalls all the dependencies needed to run the react app and places them in a new folder called node_modules. This folder is also ignored using .gitignore.

### Step 8:
Run `npm start`  
This command starts the app in the development mode. Open http://localhost:3000 to view it in the browser.  
You can make changes to the front end code and once you save them, they appear on the browser right away if there are no errors. There is an additional README file provided by react in the ui-react folder that provides documentation for other npm commands and useful links.

### Enjoy development!!!