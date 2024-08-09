import UserModel from "../models/user.model.js"; 
import ProductModel from "../models/product.model.js";

export default class UserController{
    getRegister(req,res,next){
        res.render('register');
    }
    getLogin(req,res){
        res.render('login',{validationErrors:[] , success:false});
    }
    postRegister(req,res){
        const {name,email,password}=req.body;
        UserModel.add(name,email,password);
        // console.log('login');
        res.render('login',{validationErrors:[],success:false});
    }
    postLogin(req,res){
        const { email, password } = req.body;
        const user = UserModel.isValidUser(email, password);
        if (!user) {
            return res.render('login', { validationErrors: [{ msg: 'Invalid email or password' }], success: false });
        }
        req.session.userEmail=email;
        let products = ProductModel.get();
        res.render("products", { products: products ,userEmail:req.session.userEmail});
    }
    logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login');
            }
        });
        res.clearCookie('lastVisit');
    }
}