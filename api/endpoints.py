import config

from flask import Blueprint, jsonify
from flask import request
import requests

main = Blueprint('main', __name__)

# TODO: Need to rename endpoints
# TODO: Need to do error checking

@main.route('/get_recipe', methods=['GET'])
def get_recipe():
    recipe = {'name': 'burger'}
    return jsonify(recipe)

@main.route('/get_recipes', methods=['GET'])
def get_recipes():
    count = 0
    ingredients = ''

    while request.args.get('ing' + str(count)) != None:
        if count == 0:
            ingredients += request.args.get('ing' + str(count), type = str).replace('+', ' ')
        else:
            ingredients += ',+' + request.args.get('ing' + str(count), type = str).replace('+', ' ')
        count += 1

    if ingredients:
        #ingredients: List of ingredients user searched for
        #number: Nmber of recipes for the search to return
        #ranking: Whether to maximize used ingredients (1) or minimize missing
        #ingredients (2) first
        #ignorePantry: Whether to ignore typical pantry items, such as water, salt, flour, etc.
        #apiKey: Always need an API key or else you can't make the call to the API
        params = {
            'ingredients': ingredients,
            'number' : 10,
            'ranking' : 1,
            'ignorePantry' : 'true',
            'apiKey' : config.api_key,
        }

        recipes =  requests.get(
            'https://api.spoonacular.com/recipes/findByIngredients',
            params = params
        ).json()

        combined_data = list()
        params = {
            'apiKey' : config.api_key,
        }

        for i in range(len(recipes)):
            instructions = requests.get(
                "https://api.spoonacular.com/recipes/" \
                + str(recipes[i].get('id')) + "/analyzedInstructions",
                params = params
            )
            combined_data.append({'recipeDetails': recipes[i], 'recipeInstructions': instructions.json()})

        return jsonify({'recipes': combined_data})

@main.route('/get_spoontacular_recipes', methods=['GET'])
def get_spoontacular_recipes():
  # Retrieve recipe name from URL param
  recipe_query = request.args['recipe']

  # apiKey: Always need an API key or else you can't make the call to the API
  # query: Name of recipe to be searched for. Returns results with query string included in the recipe title
  # number: Returns the number of recipes. JSON response include total number of results from query
    params = {
        'apiKey': config.api_key,
        'query': recipe_query,
        'number': 10,
        'instructionsRequired': 'true',
        'addRecipeInformation': 'true',
        'ignorePantry': 'true',
        'fillIngredients': 'true',
    }

  print(f'\n\n\nThese are my params: {params}\n\n\n')

  print('Making request to spoonacular...\n')
  # Calling spoontacular API to search for a specific recipe
  response = requests.get(
    'https://api.spoonacular.com/recipes/complexSearch',
    params=params
  )
  print(f'Request complete: {response}')
  recipe_results = response.json()
  
  # Converting JSON object into Flask response object
  return jsonify(recipe_results)
