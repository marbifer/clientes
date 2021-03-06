"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var message_service_1 = require("../messages/message.service");
var product_service_1 = require("./product.service");
var ProductEditComponent = (function () {
    function ProductEditComponent(route, router, productService, messageService) {
        this.route = route;
        this.router = router;
        this.productService = productService;
        this.messageService = messageService;
        this.pageTitle = "Product Edit";
        this.dataIsValid = {};
    }
    Object.defineProperty(ProductEditComponent.prototype, "isDirty", {
        get: function () {
            return (JSON.stringify(this.originalProduct) !==
                JSON.stringify(this.currentProduct));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductEditComponent.prototype, "product", {
        get: function () {
            return this.currentProduct;
        },
        set: function (value) {
            this.currentProduct = value;
            // Clone the object to retain a copy
            this.originalProduct = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    ProductEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Watch for changes to the resolve data
        this.route.data.subscribe(function (data) {
            _this.onProductRetrieved(data["product"]);
        });
    };
    ProductEditComponent.prototype.onProductRetrieved = function (product) {
        this.product = product;
        // Adjust the title
        if (this.product.documento === 0) {
            this.pageTitle = "Add Product";
        }
        else {
            this.pageTitle = "Edit Product: " + this.product.documento;
        }
    };
    ProductEditComponent.prototype.deleteProduct = function () {
        var _this = this;
        if (this.product.documento === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(this.product.documento + " was deleted");
        }
        else {
            if (confirm("Really delete the product: " + this.product.documento + "?")) {
                this.productService
                    .deleteProduct(this.product.documento)
                    .subscribe(function () { return _this.onSaveComplete(_this.product.documento + " was deleted"); }, function (error) { return (_this.errorMessage = error); });
            }
        }
    };
    ProductEditComponent.prototype.isValid = function (path) {
        var _this = this;
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(function (d) { return _this.dataIsValid[d] === true; }));
    };
    ProductEditComponent.prototype.saveProduct = function () {
        var _this = this;
        if (this.isValid(null)) {
            this.productService
                .saveProduct(this.product)
                .subscribe(function () { return _this.onSaveComplete(_this.product.documento + " was saved"); }, function (error) { return (_this.errorMessage = error); });
        }
        else {
            this.errorMessage = "Please correct the validation errors.";
        }
    };
    ProductEditComponent.prototype.onSaveComplete = function (message) {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();
        // Navigate back to the product list
        this.router.navigate(["/products"]);
    };
    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    ProductEditComponent.prototype.reset = function () {
        this.dataIsValid = null;
        this.currentProduct = null;
        this.originalProduct = null;
    };
    ProductEditComponent.prototype.validate = function () {
        // Clear the validation object
        this.dataIsValid = {};
        // 'info' tab
        if (this.product.documento >= 3 && this.product.documento) {
            this.dataIsValid["info"] = true;
        }
        else {
            this.dataIsValid["info"] = false;
        }
        // 'tags' tab
        if (this.product.documento) {
            this.dataIsValid["tags"] = true;
        }
        else {
            this.dataIsValid["tags"] = false;
        }
    };
    return ProductEditComponent;
}());
ProductEditComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/products/product-edit.component.html",
        styleUrls: ["./app/products/product-edit.component.css"]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        product_service_1.ProductService,
        message_service_1.MessageService])
], ProductEditComponent);
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map