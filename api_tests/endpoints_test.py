from api.endpoints import app
import pytest

def test_get_recipes():
    tester = app.test_client()
    response = tester.get("/get_recipes?ing0=milk", content_type="application/json")

    assert response.status_code == 200
    returned_data = str(response.data).lower()
    assert 'milk' in returned_data
    assert 'recipeinstructions' in returned_data

def test_get_recipes():
    tester = app.test_client()
    response = tester.get("/get_spoontacular_recipes?recipe=spaghetti", content_type="application/json")

    assert response.status_code == 200
    returned_data = str(response.data).lower()
    assert 'spaghetti' in returned_data
    assert 'analyzedinstructions' in returned_data
