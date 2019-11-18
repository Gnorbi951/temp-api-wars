from flask import Flask, render_template, request, session, redirect
import data_handler


app = Flask(__name__)
app.secret_key = 'b_5#y2L"F4Q8znxec]/'


@app.route('/')
def main_page():
    return render_template('index.html')


@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        user_name = request.form.get('user_name')
        not_hashed_pw = request.form.get('pw')
        name_status = data_handler.check_if_user_name_exists(user_name)
        if name_status:
            message = 'Name already taken'
            return render_template('registration.html', message=message)
        if user_name == '' or not_hashed_pw == '':
            return render_template('registration.html')
        hashed_password = data_handler.hash_password(not_hashed_pw)
        user_name_and_pw = [user_name, hashed_password]
        data_handler.register_user(user_name_and_pw)
        message = 'Registration successful'
        return render_template('registration.html', message=message)

    else:
        return render_template('registration.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        pw = request.form.get('password')
        try:
            if data_handler.verify_login(username, pw):
                session['username'] = username
                session['password'] = pw
                return redirect('/')
        except IndexError:
            # An IndexError is returned when the user name doesn't exist
            message = "User name or password is incorrect"
            return render_template('login.html', message=message)
        else:
            message = "User name or password is incorrect"
            return render_template('login.html', message=message)
    else:
        return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/')

