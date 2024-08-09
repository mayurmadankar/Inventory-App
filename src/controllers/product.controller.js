import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController {
    getProducts(req, res) {
        let products = ProductModel.get();
        res.render("products", { products: products,userEmail:req.session.userEmail});
    }

    getAddForm(req, res, next) {
        return res.render("new-product", { validationErrors: [], success: false,userEmail:req.session.userEmail });
    }

    getBlogForm(req, res) {
        return res.render("createBlog");
    }

    addNewProduct(req, res) {
        // extracting name, desc,price from req.body
        const {name,desc,price}=req.body;
        const imageUrl='images/'+req.file.filename;

        ProductModel.add(name,desc,price,imageUrl);
        let products = ProductModel.get();
        res.status(200).render("products", { products: products ,userEmail:req.session.userEmail});
    }
    getUpdateProductView(req,res,next){
        const id=req.params.id;
        const productFound=ProductModel.getById(id);
        if(productFound){
            res.render('update-product',{products:productFound , validationErrors:[] , success:false});
        }else{
            res.status(404).render('pro-not-found',{success:false});
        }
    }
    postUpdateProduct(req,res){
        const id = req.body.id;
        const { name, desc, price } = req.body;
        const imageUrl = req.file ? 'images/' + req.file.filename : null;

        ProductModel.update(id, name, desc, price, imageUrl);
        let products = ProductModel.get();
        res.status(200).render("products", { products: products });
    }
    deleteProduct(req,res){
        const id=req.params.id;
        const productFound=ProductModel.getById(id);
        if(!productFound){
           return res.status(404).render('pro-not-found',{success:false});
        }
        ProductModel.delete(id);
        let products = ProductModel.get();
        res.status(200).render("products", { products: products });
    }
    searchProduct(req,res){
        const {name}=req.body;
        const result = ProductModel.searchResult(name);
        if(result.length === 0){
            return res.status(404).render('pro-not-found',{success:false});
        }else{
            res.render('searchResult',{products:result})
        }
    }
}
