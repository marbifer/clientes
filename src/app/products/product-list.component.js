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
var product_service_1 = require("./product.service");
var ProductListComponent = (function () {
    function ProductListComponent(productService, route) {
        this.productService = productService;
        this.route = route;
        this.pageTitle = "Lista de Clientes";
        this.clientes = [
            {
                documento: 123456789,
                apellido: "P1",
                nombre: "N1",
                direccion: "Dirección 1",
                telefono: 56484213,
                estado: 1
            },
            {
                documento: 8712356489,
                apellido: "P2",
                nombre: "N2",
                direccion: "Dirección 2",
                telefono: 15641231651,
                estado: 1
            },
            {
                documento: 51556235435,
                apellido: "P3",
                nombre: "N3",
                direccion: "Dirección 3",
                telefono: 564894123,
                estado: 0
            },
            {
                documento: 56135155,
                apellido: "P4",
                nombre: "N4",
                direccion: "Dirección 4",
                telefono: 1003505363,
                estado: 0
            }
        ];
        this.clientesBackup = [];
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.clientesBackup = this.clientes;
        this.listFilter = this.route.snapshot.queryParams["filterBy"] || "";
        /*this.productService.getDataFromEndpoint().subscribe(r => {
          console.log("endpointData", r);
        });*/
    };
    ProductListComponent.prototype.filterBy = function (e, type) {
        this.clientes = this.clientesBackup;
        var val = e.target.value;
        if (val.lenght < 1 || val === "") {
            this.clientes = this.clientesBackup;
        }
        else {
            this.clientes = this.clientes.filter(function (el) {
                var elVal = el[type];
                if (type === "documento" && val && val !== "") {
                    elVal = elVal.toString();
                }
                if (type === "estado" && val && val !== "") {
                    if (e.target.checked === true) {
                        elVal = elVal.toString();
                        val = "1";
                    }
                    else {
                        elVal = elVal.toString();
                        val = "0";
                    }
                }
                if (elVal.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                    return el;
                }
            });
        }
    };
    ProductListComponent.prototype.reset = function () {
        this.clientes = this.clientesBackup;
    };
    return ProductListComponent;
}());
ProductListComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/products/product-list.component.html",
        styleUrls: ["./app/products/product-list.component.css"]
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.ActivatedRoute])
], ProductListComponent);
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map