from flask.helpers import total_seconds
from sqlalchemy.sql.expression import and_
from website.models import Admin, Basket, Category, Product, Receipt, User
from flask import Blueprint, render_template, request, make_response, jsonify, redirect, url_for
from . import db
import sys
import json
from flask_login import  login_required,current_user

user = Blueprint('user', __name__)

#add product to users shopping cart
@user.route('/user/add_to_shop_basket', methods=['POST'])
@login_required
def user_Tes():
    if current_user.is_admin == 1:
        return redirect(url_for('views.admin'))
    print('req received', file=sys.stdout)
    req = request.get_json()
    user_id = current_user.id
    #user_id = "alireza@arezz.com"
    product_name = req['product_name']
    product_count = req['product_count']
    
    shopped_product = Product.query.filter_by(name = product_name).first()
    
    if shopped_product.availability_number >= product_count:
        shopped_product = Product.query.filter_by(name = product_name).first()
        shopped_product.availability_number -= product_count
        
        if not Basket.query.filter(and_(Basket.customer_id == user_id, Basket.product_name == product_name)).first():
            new_basket = Basket(customer_id = user_id, product_name=product_name, product_count=product_count)
        else:
             new_basket = Basket.query.filter(and_(Basket.customer_id == user_id, Basket.product_name == product_name)).first()
             new_basket.product_count += product_count
        
        
        
        db.session.add(new_basket)
        db.session.commit()
        res = make_response(jsonify({"message": "به سبد خرید اضافه شد"}), 200)
        return res
        
    else:
        return make_response(jsonify({"message": "موجودی محصول کمتر از مقدار انتخاب شده است"}), 405)

#items in a user's shopping cart
@user.route('user/get_user_shop_basket', methods= ['POST'])
@login_required
def get_user_shop_basket():
    req = request.get_json()
    if req['command'] == 'get_basket':
        basket = Basket.query.filter_by(customer_id = req['user']).all()
        res_categories = []
        for bas in basket:
            product = Product.query.filter_by(name = bas.product_name).first()
            json_rec = {"id": bas.id,  "product_name":bas.product_name, "product_count":bas.product_count, "total_price": bas.product_count * product.price}
            res_categories.append(json_rec)
            
        res = make_response(jsonify({"message": res_categories}), 200)
        return res
    
    res = make_response(jsonify({"message": "bad request"}), 405)
    return res

#delet4e item from basket
@user.route('/user/delete_basket', methods= ['POST'])
@login_required
def delete_basket():
    if current_user.is_admin == 1:
        return redirect(url_for('views.admin'))
    req = request.get_json()
    if req['command'] == 'delete_basket':
        print(req)
        Basket.query.filter_by(id = req['id']).delete()
        Product.query.filter_by(name = req["product_name"]).update({Product.availability_number: Product.availability_number+req["product_count"]})
        db.session.commit()
        
            
        res = make_response(jsonify({"message": "basket deleted"}), 200)
        return res
    
    res = make_response(jsonify({"message": "bad request"}), 405)
    return res

#shop
@user.route('/user/purchase', methods= ['POST'])
@login_required
def purchase():
    if current_user.is_admin == 1:
        return redirect(url_for('views.admin'))
    req = request.get_json()
    if req['command'] == 'purchase':
        user = User.query.filter_by(id = req['id']).first()
        baskets = Basket.query.filter_by(customer_id = req['id']).all()
        purchase_price = 0
        product_to_price = {}
        for basket in baskets:
            product = Product.query.filter_by(name = basket.product_name).first()
            purchase_price += (product.price * basket.product_count)
            product_to_price[product.name] = (product.price * basket.product_count)
        if user.charge >= purchase_price:
            for basket in baskets:
                Product.query.filter_by(name = basket.product_name).update({Product.sold_number: Product.sold_number + basket.product_count})
                receipt = Receipt(product_name = basket.product_name, purchase_number = basket.product_count,
                                  customer_first_name = user.first_name, customer_last_name = user.last_name, 
                                  customer_address = user.address, 
                                  total_price = (product_to_price[basket.product_name]),
                                  customer_id = user.id)
                db.session.add(receipt)

            user.charge -= purchase_price
            Basket.query.filter_by(customer_id = req['id']).delete()
            db.session.commit()
            
            res = make_response(jsonify({"message": "products purchased"}), 200)
            return res
        
        # db.session.commit()
        
            
        res = make_response(jsonify({"message": "not enough credit"}), 405)
        return res
    
    res = make_response(jsonify({"message": "bad request"}), 405)
    return res