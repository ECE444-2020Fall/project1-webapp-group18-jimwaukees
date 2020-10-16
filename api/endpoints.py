from flask import Blueprint, jsonify

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