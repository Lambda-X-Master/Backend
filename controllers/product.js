const Products = require("../models/product");

exports.getProductsByVendorId = async (req, res, next) => {
    try {
        const vendor_id = req.params.vendor_id;
        console.log("Vendor id,", vendor_id);
        if(!vendor_id){
            res.status(404).json({errorMessage: "You are missing a vendor id"})
        }
        else {
            const productsData = await Products.getProductsByVendorId(vendor_id);
            console.log("Products Data:", productsData);
            res.status(200).json(productsData);
        }
    }
    catch(err) {
        res.status(500).json(`No products found: ${err}`);
        console.log(err);
    }
}

exports.addProductByVendorId = async (req, res, next) => {
    try {
        const vendor_id = req.params.vendor_id;
        if(!vendor_id){
            res.status(404).json({errorMessage: "You are missing a vendor id"})
        }
        else {
            let product = req.body;
            console.log("Product: ", product);
            const addedProduct = await Products.addProductByVendorId(product, vendor_id);
            console.log("Added Product:", addedProduct);
            res.status(200).json(addedProduct);
        }
    }
    catch(err) {
        res.status(500).json(`Cannot add product: ${err}`);
        console.log(err);
    }
}

exports.updateProductByProductId =  async (req, res, next) => {
    try {
        const product_id = req.params.product_id;
        if(!product_id){
            res.status(404).json({errorMessage: "You are missing a product id"})
        }
        else{
            const product = req.body; 
            const updatedProduct = await Products.updateProductByProductId(product, product_id);
            console.log("Updated Product:", updatedProduct);
            if(!updatedProduct){
                res.status(404).json({errorMessage: "This product does not exist"});
            } else {
                res.status(200).json(updatedProduct);
            }
        }
    }
    catch(err) {
        res.status(500).json(`Cannot update product: ${err}`);
        console.log(err);
    }
}

exports.deleteProductByProductId = async (req, res, next) => {
    try {
        const product_id = req.params.product_id;
        if(!product_id){
            res.status(404).json({errorMessage: "You are missing a product id"})
        }
        else {
            const deletedProduct = await Products.deleteProductByProductId(product_id);
            console.log("Deleted Product:", deletedProduct);
            if(!deletedProduct){
                res.status(404).json({errorMessage: "This product does not exist"});
            } else {
                res.status(200).json(deletedProduct);
            }
        }
    }
    catch(err) {
        res.status(500).json(`Cannot update product: ${err}`);
        console.log(err);
    }
}