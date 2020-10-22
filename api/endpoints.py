import config

from flask import Blueprint, jsonify
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
  params = {
  'apiKey': config.api_key,
  }
  
  print('\n\n\n These are my params: ${params}')
  
  response = requests.get(
    'https://api.spoonacular.com/recipes/complexSearch',
    params=params
  )
  
  print(response.json())
  return response.json()