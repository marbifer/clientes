import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { MessageService } from "../messages/message.service";

import { IClientes } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./app/products/product-edit.component.html",
  styleUrls: ["./app/products/product-edit.component.css"]
})
export class ProductEditComponent implements OnInit {
  pageTitle: string = "Product Edit";
  errorMessage: string;

  private currentProduct: IClientes;
  private originalProduct: IClientes;
  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return (
      JSON.stringify(this.originalProduct) !==
      JSON.stringify(this.currentProduct)
    );
  }

  get product(): IClientes {
    return this.currentProduct;
  }
  set product(value: IClientes) {
    this.currentProduct = value;
    // Clone the object to retain a copy
    this.originalProduct = Object.assign({}, value);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Watch for changes to the resolve data
    this.route.data.subscribe(data => {
      this.onProductRetrieved(data["product"]);
    });
  }

  onProductRetrieved(product: IClientes): void {
    this.product = product;

    // Adjust the title
    if (this.product.documento === 0) {
      this.pageTitle = "Add Product";
    } else {
      this.pageTitle = `Edit Product: ${this.product.documento}`;
    }
  }

  deleteProduct(): void {
    if (this.product.documento === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.documento} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.documento}?`)) {
        this.productService
          .deleteProduct(this.product.documento)
          .subscribe(
            () => this.onSaveComplete(`${this.product.documento} was deleted`),
            (error: any) => (this.errorMessage = <any>error)
          );
      }
    }
  }

  isValid(path: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true)
    );
  }

  saveProduct(): void {
    if (this.isValid(null)) {
      this.productService
        .saveProduct(this.product)
        .subscribe(
          () => this.onSaveComplete(`${this.product.documento} was saved`),
          (error: any) => (this.errorMessage = <any>error)
        );
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();
    // Navigate back to the product list
    this.router.navigate(["/products"]);
  }

  // Reset the data
  // Required after a save so the data is no longer seen as dirty.
  reset(): void {
    this.dataIsValid = null;
    this.currentProduct = null;
    this.originalProduct = null;
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.product.documento >= 3 && this.product.documento) {
      this.dataIsValid["info"] = true;
    } else {
      this.dataIsValid["info"] = false;
    }

    // 'tags' tab
    if (this.product.documento) {
      this.dataIsValid["tags"] = true;
    } else {
      this.dataIsValid["tags"] = false;
    }
  }
}
