from flask import Blueprint, render_template
from flask_login import  login_required,current_user
from flask.helpers import url_for
from werkzeug.datastructures import cache_property
from website.models import Category, Product, Receipt
from flask import Blueprint, render_template, request, make_response, jsonify, redirect, url_for
from . import db
import sys
import json
from sqlalchemy import desc

views = Blueprint('views', __name__)

#main page
@views.route('/main', methods = ['POST', 'GET'])
def main():
    try:
        if current_user.is_admin == 1:
            return redirect(url_for('views.admin'))
    except:
        print()
    if request.method == 'POST':
        req = request.get_json()
        # print(req, file=sys.stdout)
        if req['command'] == 'get_products':
            sort = req["sort"]
            sort_order= req["sort_order"]
            product_name= req["product_name"]
            product_cats= req["product_categories"]
            lower_bound, upper_bound = req['price_range']
            # print(product_name, file=sys.stdout)
            # print(req, file=sys.stdout)
            
            
            if product_name not in ('', ' ', None, {}):
                products = Product.query.filter_by(name = product_name).all()
            else:
                if sort == 'sold':
                    products = Product.query.order_by(desc(Product.sold_number)).all()
                elif sort == 'date':
                    products = Product.query.order_by(desc(Product.date)).all()
                else:
                    if sort_order == 'desc':
                        products = Product.query.order_by(desc(Product.price)).all()
                    else:
                       products = Product.query.order_by(Product.price).all()

            res_products = []
            for product in products:
                if product_cats not in ('', ' ', []) and product.category not in product_cats:
                    continue
                if product.price < lower_bound or product.price > upper_bound:
                    continue
                res_products.append({"name":product.name, "category":product.category, "price":product.price,
                                     "availability_number":product.availability_number,
                                     "sold_number":product.sold_number, "image":product.image})
                
            res = make_response(jsonify({"message": res_products}), 200)
            return res
        
        if req['command'] == 'get_categories':
            categories = Category.query.filter_by().all()
            res_categories = []
            for cat in categories:
                res_categories.append({"name":cat.name})
                
            res = make_response(jsonify({"message": res_categories}), 200)
            return res
    
    return render_template("main.html",user=current_user)





#admin page
@views.route('/admin', methods=['GET', 'POST'])
@login_required
def admin():
    if current_user.is_admin == 0:
        return redirect(url_for('views.user'))
    if request.method == 'POST':
        req = request.get_json()
        if req['command'] == 'get_products':
            products = Product.query.filter_by().all()
            names, categories, prices, available_numbers, sold_numbers, images = [],[],[],[],[],[]
            res_products = []
            for product in products:
                res_products.append({"name":product.name, "category":product.category, "price":product.price,
                                     "availability_number":product.availability_number,
                                     "sold_number":product.sold_number, "image":product.image})
                
            res = make_response(jsonify({"message": res_products}), 200)
            return res
        
        if req['command'] == 'get_categories':
            categories = Category.query.filter_by().all()
            res_categories = []
            for cat in categories:
                res_categories.append({"name":cat.name})
                
            res = make_response(jsonify({"message": res_categories}), 200)
            return res
        
        
        if req['command'] == 'get_receipts':
            receipts = Receipt.query.order_by(desc(Receipt.date)).all()
            res_categories = []
            for rec in receipts:
                json_rec = {"id":rec.id, "product_name":rec.product_name,
                            "purchase_number":rec.purchase_number,	"customer_first_name":rec.customer_first_name,
                            "customer_last_name":rec.customer_last_name,	"customer_address":rec.customer_address,
                            "total_price":rec.total_price,	"date":rec.date,	"state":rec.state,
                            "customer_id":rec.customer_id}
                res_categories.append(json_rec)
                
            res = make_response(jsonify({"message": res_categories}), 200)
            return res
        
        if req['command'] == 'get_filtered_receipts':
            if req['rec_id'] not in (' ', ''):
                receipts = Receipt.query.filter_by(id = req['rec_id']).all()
            else:
                receipts = Receipt.query.order_by(desc(Receipt.date)).all()
            res_categories = []
            for rec in receipts:
                json_rec = {"id":rec.id, "product_name":rec.product_name,
                            "purchase_number":rec.purchase_number,	"customer_first_name":rec.customer_first_name,
                            "customer_last_name":rec.customer_last_name,	"customer_address":rec.customer_address,
                            "total_price":rec.total_price,	"date":rec.date,	"state":rec.state,
                            "customer_id":rec.customer_id}
                res_categories.append(json_rec)
                
            res = make_response(jsonify({"message": res_categories}), 200)
            return res
        
        
    return render_template("admin.html")

#user page
@views.route('/user', methods = ['POST', 'GET'])
@login_required
def user():
    if current_user.is_admin == 1:
        return redirect(url_for('views.admin'))
    if request.method == 'POST':
        req = request.get_json()
        if req['command'] == 'get_receipts':
            receipts = Receipt.query.filter_by(customer_id = current_user.id).order_by(desc(Receipt.date)).all()
            res_categories = []
            for rec in receipts:
                json_rec = {"id":rec.id, "product_name":rec.product_name,
                            "purchase_number":rec.purchase_number,	"customer_first_name":rec.customer_first_name,
                            "customer_last_name":rec.customer_last_name,	"customer_address":rec.customer_address,
                            "total_price":rec.total_price,	"date":rec.date,	"state":rec.state,
                            "customer_id":rec.customer_id}
                res_categories.append(json_rec)
                
            res = make_response(jsonify({"message": res_categories}), 200)
            return res
        
        elif req['command'] == 'get_current_user':
            res = make_response(jsonify({"message": [{"user_id":current_user.id, "user_first_name":current_user.first_name,
                                                     "user_credit":current_user.charge}]}), 200)
            return res
        
    
    return render_template("user.html",user=current_user)
#signin page
@views.route('/signin')
def signin():
    return render_template("signin.html",user=current_user)

#admin's product adding page
@views.route('/admin/create_product')
@login_required
def create_product():
    if current_user.is_admin == 0:
        return redirect(url_for('views.user'))
    return render_template("create_product.html")

#admins editing product page
@views.route('/admin/edit_product', methods = ['GET', 'POST'])
@login_required
def edit_product():
    if current_user.is_admin == 0:
        return redirect(url_for('views.user'))
    global current_product
    if request.method == 'POST':
        req = json.loads(request.get_data())
        current_product = req['product_name']
        render_template("edit_product.html", product_name = create_product)
        return redirect(url_for("views.edit_product"))
    print(request.method, request.get_json())
    return render_template("edit_product.html", product = current_product)

#shopping cart
@views.route('/user/shop_basket', methods = ['GET'])
@login_required
def get_shop_basket():
    if current_user.is_admin == 1:
        return redirect(url_for('views.admin'))
    return render_template("shop_basket.html", user = current_user)


current_product = ''
    