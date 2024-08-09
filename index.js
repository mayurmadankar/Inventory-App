import express from 'express';
import ProductController from "./src/controllers/product.controller.js";
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import { validateRequest, validateLogin } from './src/MiddleWare/validation.middleware.js';
import { uploadFile } from './src/MiddleWare/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/MiddleWare/auth.middleware.js';
import { setLastVisit } from './src/MiddleWare/lastVisit.middleware.js';
import cookieParser from 'cookie-parser';

// Create server
const server = express();

// Statically export the folder - public
server.use(express.static('public'));

// Use cookie-parser middleware
server.use(cookieParser());

server.use(
    session({
        secret: 'SecretKey',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Parse form data
server.use(express.urlencoded({ extended: true }));

// Set up view engine
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);

// Instance
const productController = new ProductController();
const userController = new UserController();

server.get('/login', userController.getLogin);
server.post('/login', validateLogin, userController.postLogin);
server.post('/register', validateLogin, userController.postRegister);
server.get('/register', userController.getRegister);
server.get('/logout', userController.logout);
server.get('/',setLastVisit, auth, productController.getProducts);
server.get('/new', auth, productController.getAddForm);
server.post('/', auth, uploadFile.single('imageUrl'), validateRequest, productController.addNewProduct);
server.get('/createBlog', auth, productController.getBlogForm);
server.get('/update-product/:id', auth, productController.getUpdateProductView);
server.post('/update-product', auth, uploadFile.single('imageUrl'), validateRequest, productController.postUpdateProduct);
server.post('/delete-product/:id', auth, productController.deleteProduct);
server.post('/search', auth, productController.searchProduct);

// To get static view
server.use(express.static('src/views'));

// Listening port
server.listen(3500, () => {
    console.log('server is listening at port 3500');
});


