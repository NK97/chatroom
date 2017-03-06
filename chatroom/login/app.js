// モジュールの読み込み
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var login = require('./routes/login');
var add = require('./routes/add');
var logout = require('./routes/logout');
var json = JSON.stringify;
var count = 0;

// ルーターの読み込み<span style="color: #00796b"></span>
var routes = require('./routes/index');
var users = require('./routes/users');

// サーバーオブジェクトの作成
var app = express();

// viewエンジンの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// モジュールの適用
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    store: new MongoStore({
        db: 'sample-login', // データベース名
        host: 'localhost', // データベースのアドレス
        clear_interval: 60 * 60 // 保存期間(sec)
    }),
    cookie: {
        httpOnly: true, // cookieへのアクセスをHTTPのみに制限
        maxAge: 60 * 60 * 1000 // クッキーの有効期限(msec)
    }
}));
// ルーターの適用
app.use('/', routes);
app.use('/login', login);
app.use('/add', add);
app.use('/logout', logout);

// 例外処理
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// サーバーオブジェクトのエクスポート
module.exports = app;
