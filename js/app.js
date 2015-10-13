var ReactDOM = require("react-dom");
var React = require("react");
var ProductModel = require('./models/products.js');
var ProductTable = require("./components/ProductTable.react");

ProductModel.get("products[0..24].Title.TitleText")
    .then(response => {
        ReactDOM.render(
            <ProductTable products={response.json.products} />,
            document.querySelector(".js-product-search")
        );
    });


