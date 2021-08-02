import flask
from flask.helpers import get_flashed_messages
from website.models import Admin, Category, Product, Receipt
from flask import Blueprint, render_template, request, make_response, jsonify, flash, redirect, url_for
from . import db
import sys
import json
from flask_login import  login_required,current_user

admin = Blueprint('admin', __name__)

#create product
@admin.route('/admin/create_product/submit', methods=['POST'])
@login_required
def create_product():
    if current_user.is_admin == 0:
        return redirect(url_for('views.user'))
    print('submit req received', file=sys.stdout)
    req = request.get_json()
    name, category, price, av, sold = req.values()
    
    if not Category.query.filter_by(name = category).first():
            category = 'دسته بندی نشده'
            print("invalid category", sys.stdout)
            notif = ["دسته بندی وارد شده نامعتبر است", "warning"]
    
    if not Product.query.filter_by(name=name).first():
        product = Product(name = name, category = category, price = price, availability_number = av, sold_number = sold)
        db.session.add(product)
        db.session.commit()
        
        
        print('item added', file=sys.stdout)
        
        notif = ["محصول موردنظر با موقیت اضافه شد", "success"]
        return make_response(jsonify({"message": [name, category, price, av, sold], "notif": notif}),  200)
    else:
        notif = ["محصولی با این نام وجود دارد", "error"]
        return make_response(jsonify({"message": "product name must be unique", "notif": notif}), 405)
    
    
#delete product    
@admin.route('/admin/edit_product/delete', methods=['POST'])
@login_required
def delete_product():
    if current_user.is_admin == 0:
        return redirect(url_for('views.user'))
    print('delete req received', file=sys.stdout)
    req = json.loads(request.get_data())
    name = req['product_name']
    Product.query.filter_by(name = name).delete()
    db.session.commit()
    notif = ["محصول مورد نظر با موفقیت حذف شد", "success"]
    return make_response(jsonify({"message": f'{name} deleted successfuly', "notif": notif}),  200)

#submit edited product
@admin.route('/admin/edit_product/submit', methods=['POST'])
@login_required
def update_product():
    if current_user.is_admin == 0:
        return redirect(url_for('views.user'))
    print('change req received', file=sys.stdout)
    req = request.get_json()
    old_name, name, category, price, av, sold, image = req.values()
    print(f'name of product is {name}')
    
    product = Product.query.filter_by(name = old_name).first()
    
    if name != '':
        product.name = name
        
    if category != '' and Category.query.filter_by(name = category).first():
        product.category = category
    if price != '':
        product.price = price
    if av != '':
        product.availability_number = av
    
    if sold != '':
        product.sold_number = sold
        
    if image != '':
        product.image = image
    
    db.session.commit()
    notif = ["محصول با موفقیت ویرایش شد", "success"]
    return make_response(jsonify({"message": f'{name} edited successfuly', "notif": notif}),  200)

#delete category
@admin.route('/admin/delete_category', methods=['POST'])
@login_required
def delete_category():
    if current_user.is_admin == 0:
        return redirect(url_for('views.user'))
    print('delete req received', file=sys.stdout)
    req = json.loads(request.get_data())
    name = req['cat_name']
    if name != 'دسته بندی نشده':
        Category.query.filter_by(name = name).delete()
        db.session.commit()
        updated_products = Product.query.filter_by(category = name).update({Product.category: 'دسته بندی نشده'})
        db.session.commit()
        
        notif = ["دسته بندی با موفقیت حذف شد", "success"]
        return make_response(jsonify({"message": f'{name} deleted successfuly and {updated_products} product\' category updated', "notif": notif}),  200)
    
    
    notif = ["این دسته نمیتواند حذف شود", "error"]
    return make_response(jsonify({"message": f'{name} cant be deleted', "notif": notif}), 405)


#add category
@admin.route('/admin/add_category', methods=['POST'])
@login_required
def add_category():
    if current_user.is_admin == 0:
        return redirect(url_for('views.user'))
    print('umad add', flush=True)
    print('add req received', file=sys.stdout)
    req = request.get_json()
    name = req['cat_name']
    
    if not Category.query.filter_by(name = name).first():
        category = Category(name = name)
        db.session.add(category)
        db.session.commit()
        
        notif = ["دسته بندی با موفقیت اضافه شد", "success"]
        return make_response(jsonify({"message": f'{name} added successfuly', "notif": notif}),  200)
    
    
    notif = ["دسته بندی پیش از این موجود بود", "error"]
    return make_response(jsonify({"message": f'{name} already exists', "notif": notif}), 405)


#edit category
@admin.route('/admin/edit_category', methods=['POST'])
@login_required
def edit_category():
    if current_user.is_admin == 0:
        return redirect(url_for('views.user'))
    print('edit req received', file=sys.stdout)
    req = request.get_json()
    old_name = req['old_name']
    new_name = req['cat_name']
    if old_name not in  ('دسته بندی نشده', '', ' '):
        updated_cats=Category.query.filter_by(name = old_name).update({Category.name: new_name})
        db.session.commit()
        
        updated_prods = Product.query.filter_by(category = old_name).update({Product.category: new_name})
        db.session.commit()
        notif = ["دسته بندی با موفقیت ویرایش شد", "success"]
        return make_response(jsonify({"message": f'{old_name} updated successfuly to {new_name} for {updated_cats} categories and {updated_prods} products', "notif": notif}),  200)
    
    
    notif = ["این دسته نمیتواند ویرایش شود", "error"]
    return make_response(jsonify({"message": f'{old_name} cant be updated', "notif": notif}), 405)


#edit reciept
@admin.route('/admin/edit_receipt', methods=['POST'])
@login_required
def edit_receipt():
    if current_user.is_admin == 0:
        return redirect(url_for('views.user'))
    print('edit req received', file=sys.stdout)
    req = request.get_json()
    id = req['old_name']
    new_state = req['rec_name']
    if new_state in  ('در حال انجام', 'انجام شده', 'لغو شده'):
        updated_recs=Receipt.query.filter_by(id = id).update({Receipt.state: new_state})
        db.session.commit()
        notif = ["رسید با موفقیت ویرایش شد", "success"]
        return make_response(jsonify({"message": f'{id} updated successfuly to {new_state} for {updated_recs} receipts', "notif": notif}),  200)
    
    
    notif = ["وضعیت وارد شده برای رسید نامعتبر است", "error"]
    return make_response(jsonify({"message": f'{id} cant be updated', "notif": notif}), 405)

