from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

#user
class User(db.Model, UserMixin):
    id = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(100))
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    charge = db.Column(db.Integer, default = 0)
    is_admin = db.Column(db.Integer, default = 0)
    receipts = db.relationship('Receipt')
    shop_basket = db.relationship('Basket')
#admin   
    
    
class Admin(db.Model):
    id = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(100))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique = True)
    category = db.Column(db.String(100), db.ForeignKey('category.name'), default = 'دسته بندی نشده')
    price = db.Column(db.Integer, default = 0)
    availability_number = db.Column(db.Integer, default = 0)
    sold_number = db.Column(db.Integer, default = 0)
    image = db.Column(db.String(100), default = '/static/Pictures/Product_sample_picture.png')
    date = db.Column(db.DateTime(timezone=True), default = func.now())
    
 #reiept   
class Receipt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100))
    purchase_number = db.Column(db.Integer)
    customer_first_name = db.Column(db.String(100))
    customer_last_name = db.Column(db.String(100))
    customer_address = db.Column(db.String(100))
    total_price = db.Column(db.Integer)
    date = db.Column(db.DateTime(timezone=True), default = func.now())
    state = db.Column(db.String(100), default = 'در حال انجام')
    customer_id = db.Column(db.String(100), db.ForeignKey('user.id'))
#categiry    
class Category(db.Model):
    name = db.Column(db.String(100), primary_key=True)
    
#shopping cart
class Basket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.String(100), db.ForeignKey('user.id'))
    product_name = db.Column(db.String(100), db.ForeignKey('product.name'))
    product_count = db.Column(db.Integer)
    