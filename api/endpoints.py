import config

from flask import Blueprint, jsonify
from flask import request 
import requests

main = Blueprint('main', __name__)

@main.route('/get_recipe', methods=['GET'])
def get_recipe():
    recipe = {'name': 'burger'}
    return jsonify(recipe)

@main.route('/get_recipes', methods=['GET'])
def get_recipes():
    recipes = [
        {'name': 'burger'},
        {'name': 'chicken'},
        {'name': 'pork'},
        {'name': 'fish'},
        {'name': 'noodles'},
    ]
    return jsonify({'count': len(recipes), 'recipes': recipes})
  
  
@main.route('/get_spoontacular_recipes', methods=['GET'])
def get_spoontacular_recipes():
  # Retrieve recipe name from URL param
  # recipe_query = request.args.get('recipe')
  recipe_query = 'pasta'
  
  # apiKey: Always need an API key or else you can't make the call to the API
  # query: Name of recipe to be searched for. Returns results with query string included in the recipe title
  # number: Returns the number of recipes. JSON response include total number of results from query
  params = {
    'apiKey': config.api_key,
    'query': recipe_query,
    'number': 20,
  }
  
  print(f'\n\n\nThese are my params: {params}\n\n\n')
  
  # Calling spoontacular API to search for a specific recipe
  response = requests.get(
    'https://api.spoonacular.com/recipes/complexSearch',
    params=params
  )
  
  return response.json()