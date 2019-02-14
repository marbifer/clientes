import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IClientes } from "./product";

@Component({
  templateUrl: "./app/products/product-edit-tags.component.html"
})
export class ProductEditTagsComponent implements OnInit {
  errorMessage: string;
  newTags = "";
  product: IClientes;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      this.product = data["product"];
    });
  }
}
