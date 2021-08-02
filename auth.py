from flask import Blueprint, render_template, request, redirect, url_for, jsonify, make_response
from flask.wrappers import Response
from sqlalchemy.sql.elements import between 
from .models import User, Admin
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
import  re
from flask_login import login_user, login_required, logout_user,current_user

auth = Blueprint('auth', __name__)
def my_redirect(path):
    return redirect(url_for('path'))

#sigin in validation
@auth.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        print('umad')
        req = request.get_json()
        email, password= req.values()
        message = {"mail": "unk","pass":"unk"} 
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if "".__eq__(password):
            message['pass'] ="pass empty"
        elif len(password)<8: 
            message = {"pass": "pass min len invalid"}
        elif len(password)>255: 
            message['pass'] = "pass max len invalid"
        elif re.search('[0-9]',password) is None:
            message['pass'] ="pass num invalid"
        elif re.search('[a-z]',password) is None:
            message['pass'] = "pass char invalid"
        else:
            message['pass'] = "pass valid"
            
        if "".__eq__(email):
            message['mail'] ="mail empty"
        elif len(email)>255: 
            message['mail'] ="mail len invalid"
        elif (re.match(regex, email) is None):
            message['mail'] = "mail invalid"
        else:
            message['mail'] ='mail valid'
        res = make_response(jsonify(message), 200)
        return res
    return render_template("signin.html")


#sign up validation
@auth.route('/signup', methods = ['GET', 'POST'])
def signup():
    if request.method == 'POST':
        print('umad')
        req = request.get_json()
        name, lname, email, password, address = req.values()
        message = {"mail": "unk","pass":"unk","name":"valid","lname":"valid","address":"valid"}
        if len(name.strip())>255:
            message['name']='invalid'
        if len(lname.strip())>255:
            message['lname']='invalid'
        if len(address)>1000:
            message['address']='invalid'   
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if "".__eq__(password):
            message['pass'] ="pass empty"
        elif len(password)<8: 
            message = {"pass": "pass min len invalid"}
        elif len(password)>255: 
            message['pass'] = "pass max len invalid"
        elif re.search('[0-9]',password) is None:
            message['pass'] ="pass num invalid"
        elif re.search('[a-z]',password) is None:
            message['pass'] = "pass char invalid"
        else:
            message['pass'] = "pass valid"
            
        if "".__eq__(email):
            message['mail'] ="mail empty"
        elif len(email)>255: 
            message['mail'] ="mail len invalid"
        elif (re.match(regex, email) is None):
            message['mail'] = "mail invalid"
        else:
            message['mail'] ='mail valid'
        res = make_response(jsonify(message), 200)
        return res
    return render_template("signup.html",user=current_user)


#add new user
@auth.route('/signup/submit', methods = ['GET','POST'])
def signup_submit():
    if request.method=='POST':
        req = request.get_json()
        name, lname, email, password, address = req.values()
        message = {"mail": "unk","pass":"unk","name":"valid","lname":"valid","address":"valid"}
        result={'state':'fail'}
        if len(name.strip())>255:
            message['name']='invalid'
        if len(lname.strip())>255:
            message['lname']='invalid'
        if len(address)>1000:
            message['address']='invalid'   
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if "".__eq__(password):
            message['pass'] ="pass empty"
        elif len(password)<8: 
            message = {"pass": "pass min len invalid"}
        elif len(password)>255: 
                message['pass'] = "pass max len invalid"
        elif re.search('[0-9]',password) is None:
            message['pass'] ="pass num invalid"
        elif re.search('[a-z]',password) is None:
            message['pass'] = "pass char invalid"
        else:
            message['pass'] = "pass valid"   
        if "".__eq__(email):
            message['mail'] ="mail empty"
        elif len(email)>255: 
            message['mail'] ="mail len invalid"
        elif (re.match(regex, email) is None):
            message['mail'] = "mail invalid"
        else:
            message['mail'] ='mail valid'
        if message['mail']=='mail valid' and message['pass']=='pass valid':
            usr=User.query.filter_by(id=email).first()
            if usr is None:
                new_user=User(id=email,password=generate_password_hash(password,method='sha256'),first_name=name,last_name=lname,address=address)
                result['state']='success'
                db.session.add(new_user)
                db.session.commit()
                print(new_user)
                login_user(new_user,remember=True)
            else: 
                result['state']='duplicate'
        res = make_response(jsonify(result), 200)
        return res 
    return render_template("signup.html",user=current_user)

    
#sign in user
@auth.route('/signin/submit', methods = ['GET','POST'])
def signin_submit():
    if request.method=='POST':
        req = request.get_json()
        email, password = req.values()
        message = {"mail": "unk","pass":"unk"}
        result={'state':'fail'}  
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if "".__eq__(password):
            message['pass'] ="pass empty"
        elif len(password)<8: 
            message = {"pass": "pass min len invalid"}
        elif len(password)>255: 
                message['pass'] = "pass max len invalid"
        elif re.search('[0-9]',password) is None:
            message['pass'] ="pass num invalid"
        elif re.search('[a-z]',password) is None:
            message['pass'] = "pass char invalid"
        else:
            message['pass'] = "pass valid"   
        if "".__eq__(email):
            message['mail'] ="mail empty"
        elif len(email)>255: 
            message['mail'] ="mail len invalid"
        elif (re.match(regex, email) is None):
            message['mail'] = "mail invalid"
        else:
            message['mail'] ='mail valid'
        if message['mail']=='mail valid' and message['pass']=='pass valid':
            usr=User.query.filter_by(id=email).first()
            if usr is None:
                result['state']='no user'

            else: 
                if check_password_hash(usr.password,password):
                    result['state']='success'
                    login_user(usr,remember=True)
                else:
                    result['state']='failure'
                #my_redirect('views.signin')
        else:
            result['state']='error'
        res = make_response(jsonify(result), 200)
        return res 
    return render_template("signin.html",user=current_user)

#logout user
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.signin'))


@auth.route('/user/profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    if current_user.is_admin == 1:
        return redirect(url_for('views.admin'))
    if request.method == 'POST':
        print('umad')
        req = request.get_json()
        name,lname,password,address= req.values()
        message = {"pass":"unk"} 
        if "".__eq__(password):
            message['pass'] ="pass empty"
        elif len(password)<8: 
            message = {"pass": "pass min len invalid"}
        elif len(password)>255: 
            message['pass'] = "pass max len invalid"
        elif re.search('[0-9]',password) is None:
            message['pass'] ="pass num invalid"
        elif re.search('[a-z]',password) is None:
            message['pass'] = "pass char invalid"
        else:
            message['pass'] = "pass valid"
        res = make_response(jsonify(message), 200)
        return res
    return render_template("user.html",user=current_user)

#get user credit
@auth.route('/credit', methods = ['GET'])
def increase_credit():
    message = {"mail": "unk","pass":"unk"}
    result={'state':'fail'}  
    current_user.charge=current_user.charge+10000
    db.session.commit()
    return render_template("user.html",user=current_user)

#edit user info in profile
@auth.route('/edit/submit', methods = ['GET','POST'])
def edit_submit():
    checked=False
    if request.method=='POST':
        req = request.get_json()
        name, lname, password, address = req.values()
        message = {"pass":"unk"} 
        result={'state':'fail'}
        
        #if  message['pass']=='pass valid':
        if not "".__eq__(name):
            current_user.first_name=name
        elif not "".__eq__(lname):
            current_user.last_name=lname
        elif not "".__eq__(password):   
            if len(password)<8: 
                message = {"pass": "pass min len invalid"}
            elif len(password)>255: 
                    message['pass'] = "pass max len invalid"
            elif re.search('[0-9]',password) is None:
                message['pass'] ="pass num invalid"
            elif re.search('[a-z]',password) is None:
                message['pass'] = "pass char invalid"
            else:
                message['pass'] = "pass valid" 
            if message['pass'] =='pass valid': 
                current_user.password=generate_password_hash(password,method='sha256')
            elif message['pass'] != 'pass valid':
                result['state']='fail'
                checked=True
                
        elif not "".__eq__(address):
            current_user.address=address
        db.session.commit()
        if checked==False:
            result['state']='success'
        #else:
        #    result['state']='fail'
        res = make_response(jsonify(result), 200)
        return res 
    return render_template("user.html",user=current_user)