export default class ProductModel{

    constructor(_id, _name, _desc, _price, _imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _price;
        this.imageUrl = _imageUrl
    }
    static get(){
        return products;
    }
    static add(name,desc,price,imageUrl){
      let newProduct=new ProductModel(products.length+1,name,desc,price,imageUrl)
      products.push(newProduct);
    }
    static getById(id){
      return products.find(p=>p.id==id)
    }
    static update(id, name, desc, price, imageUrl) {
      const index = products.findIndex(p => p.id == id);
      if (index !== -1) {
          const product = products[index];
          product.name = name;
          product.desc = desc;
          product.price = price;
          if (imageUrl) {
              product.imageUrl = imageUrl;
          }
        }
      }

    static delete(id){
      const index= products.findIndex(p=>p.id==id)
      products.splice(index,1);
    }
    static searchResult(name){
     return products.filter((product)=>
      product.name.toLowerCase().includes(name.toLowerCase())
     );
    }
}

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    ),
  ]