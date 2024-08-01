from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

app = Flask(__name__)
app.secret_key = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app, supports_credentials=True)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/register', methods=['POST'])
def register():
    if request.is_json:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        if User.query.filter_by(username=username).first():
            return jsonify({"message": "User already exists"}), 409
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    return jsonify({"message": "Request must be JSON"}), 415

@app.route('/login', methods=['POST'])
def login():
    if request.is_json:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username, password=password).first()
        if user:
            login_user(user)
            return jsonify({"message": "Logged in successfully"}), 200
        return jsonify({"message": "Invalid credentials"}), 401
    return jsonify({"message": "Request must be JSON"}), 415

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/protected')
@login_required
def protected():
    return jsonify({"message": "This is a protected route"}), 200

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'quantity': self.quantity
        }

@app.route('/items', methods=['GET', 'POST'])
@login_required
def manage_items():
    if request.method == 'GET':
        items = Item.query.all()
        return jsonify([item.to_dict() for item in items])
    elif request.method == 'POST' and request.is_json:
        data = request.get_json()
        new_item = Item(name=data['name'], category=data['category'], quantity=data['quantity'])
        db.session.add(new_item)
        db.session.commit()
        return jsonify(new_item.to_dict()), 201
    return jsonify({"message": "Request must be JSON"}), 415

@app.route('/items/<int:id>', methods=['PUT', 'DELETE'])
@login_required
def update_delete_item(id):
    item = Item.query.get_or_404(id)
    if request.method == 'PUT' and request.is_json:
        data = request.get_json()
        item.name = data['name']
        item.category = data['category']
        item.quantity = data['quantity']
        db.session.commit()
        return jsonify(item.to_dict())
    elif request.method == 'DELETE':
        db.session.delete(item)
        db.session.commit()
        return '', 204
    return jsonify({"message": "Request must be JSON"}), 415

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)