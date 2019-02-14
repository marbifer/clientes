import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";

import { IClientes } from "./product";

@Injectable()
export class ProductService {
  private baseUrl = "api/products";
  private url = "http://www.mocky.io/v2/5c64a4053300005500b99924";

  constructor(private http: Http) {}

  getDataFromEndpoint() {
    return this.http
      .get(this.url)
      .map(this.extractData)
      .do(data => console.log("getProducts: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProducts(): Observable<IClientes[]> {
    return this.http
      .get(this.baseUrl)
      .map(this.extractData)
      .do(data => console.log("getProducts: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProduct(id: number): Observable<IClientes> {
    if (id === 0) {
      return Observable.of(this.initializeProduct());
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .get(url)
      .map(this.extractData)
      .do(data => console.log("getProduct: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteProduct(id: number): Observable<Response> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http
      .delete(url, options)
      .do(data => console.log("deleteProduct: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveProduct(clientes: IClientes): Observable<IClientes> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    if (clientes.documento === 0) {
      return this.createProduct(clientes, options);
    }
    return this.updateProduct(clientes, options);
  }

  private createProduct(
    clientes: IClientes,
    options: RequestOptions
  ): Observable<IClientes> {
    clientes.documento = undefined;
    return this.http
      .post(this.baseUrl, clientes, options)
      .map(this.extractData)
      .do(data => console.log("createProduct: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateProduct(
    clientes: IClientes,
    options: RequestOptions
  ): Observable<IClientes> {
    const url = `${this.baseUrl}/${clientes.documento}`;
    return this.http
      .put(url, clientes, options)
      .map(() => clientes)
      .do(data => console.log("updateProduct: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    let body = response.json();
    return body.data || {};
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }

  initializeProduct(): IClientes {
    // Return an initialized object
    return {
      documento: null,
      apellido: null,
      nombre: null,
      direccion: null,
      telefono: null,
      estado: null
    };
  }
}
