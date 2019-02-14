import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IClientes } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./app/products/product-list.component.html",
  styleUrls: ["./app/products/product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Lista de Clientes";

  listFilter: string;
  errorMessage: string;

  products: IClientes[];

  clientes = [
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

  documento: string;
  apellido: string;
  nombre: string;
  direccion: string;
  telefono: number;
  estado: string;

  private clientesBackup = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientesBackup = this.clientes;
    this.listFilter = this.route.snapshot.queryParams["filterBy"] || "";

    /*this.productService.getDataFromEndpoint().subscribe(r => {
      console.log("endpointData", r);
    });*/
  }

  public filterBy(e: any, type: string) {
    this.clientes = this.clientesBackup;

    let val = e.target.value;

    if (val.lenght < 1 || val === "") {
      this.clientes = this.clientesBackup;
    } else {
      this.clientes = this.clientes.filter(el => {
        let elVal = el[type];
        if (type === "documento" && val && val !== "") {
          elVal = elVal.toString();
        }
        if (type === "estado" && val && val !== "") {
          if (e.target.checked === true) {
            elVal = elVal.toString();
            val = "1";
          } else {
            elVal = elVal.toString();
            val = "0";
          }
        }

        if (elVal.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
          return el;
        }
      });
    }
  }
  public reset() {
    this.clientes = this.clientesBackup;
  }
}
