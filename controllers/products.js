var Product = require("../models/products");

exports.getProducts = function (req, res) {
	Product.find({}, function (err, products) {
		res.json(products);
	});
};

exports.getProduct = function (req, res) {
	Product.find({_id: req.params.productId}, function (err, products) {
		res.json(products);
	});
};

exports.addProduct = function (req, res) {
	var product = new Product();
	product.name = req.body.productName;
	product.description = req.body.productDescription;
	product.price = req.body.productPrice;
	product.photo = req.body.productPhotoUrl;

	product.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.send({message: "Product saved successfully"});
		};
	});
};

exports.updateProduct = function (req, res) {

	Product.update({_id: req.params.productId}, {
		name: req.body.productName,
		description: req.body.productDescription,
		price: req.body.productPrice,
		photo: req.body.productPhotoUrl
	}, function (err, num, raw) {
		if (err) {
			res.send(err);
		} else {
			res.json(num);
		};
	});
};

exports.deleteProduct = function (req, res) {
	Product.remove({_id:req.params.productId}, function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json({message: "Product deleted successfully"});
		};
	});
};

// WEB

exports.renderProducts = function (req, res) {
	Product.find({}, function (err, products) {
		if (err) {
			res.send(err);
		} else {
			res.render("products/index", {products: products});
		};
	});
};

exports.renderProduct = function (req, res) {
	Product.findOne({_id: req.params.productId}, function (err, product) {
		if (err) {
			res.send(err);
		} else {
			res.render("products/show", {product: product});
		};
	});
};

exports.renderNewProduct = function (req, res) {
	res.render("products/new", {product: new Product()});
};

exports.saveNewProduct = function (req, res) {
	var product = new Product(req.body.product);
	product.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.redirect("/products/" + product._id.toHexString());
		};
	});
};

exports.renderEditProduct = function (req, res) {
	Product.findOne({_id: req.params.productId}, function (err, product) {
		if (err) {
			res.send(err);
		} else {
			res.render("products/edit", {product: product});
		};
	});
};

exports.saveEditProduct = function (req, res) {
	Product.update({_id: req.params.productId}, {
		name: req.body.product.name,
		description: req.body.product.description,
		price: req.body.product.price,
		photo: req.body.product.photo
	}, function (err, num, raw) {
		if (err) {
			res.send(err);
		} else {
			res.redirect("/products/" + req.params.productId);
		};
	});
};

exports.renderDeleteProduct = function (req, res) {
	res.render("products/delete", {productId: req.params.productId});
}

exports.deleteRenderedProduct = function (req, res) {
	Product.remove({_id:req.params.productId}, function (err) {
		if (err) {
			res.send(err);
		} else {
			res.redirect("/products");
		};
	});
}











