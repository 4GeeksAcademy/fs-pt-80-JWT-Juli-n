"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        if not email or password:
            raise Exception('missing data')
        check_user = User.query.filter_by(email=email).first()
        if not check_user:
            new_user = User(email=email, password=password, is_active=True)
            db.session.add(new_user)
            db.session.commit()
            access_token = create_access_token(identity=new_user.id)
            return ({'msg': 'usuario registrado', 'token': access_token}), 201
        return jsonify({'msg': 'usuario vinculado a este correo, intenta iniciar sesión de nuevo'}), 400
    
    except Exception as error:
        return jsonify({'error': str(error)}), 400

@api.route('/login', methods=['POST'])  # Corregido aquí
def login():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        if not email or password:
            raise Exception('missing data')
        check_user = User.query.filter_by(email=email).first()
        if check_user.password == password:
            access_token = create_access_token(identity=check_user.id)
            return ({'msg': 'usuario registrado', 'token': access_token}), 201
        return jsonify({'msg': 'usuario vinculado a este correo, intenta iniciar sesión de nuevo'}), 400
    
    except Exception as error:
        return jsonify({'error': str(error)}), 400

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'logged_in_as': current_user}), 200