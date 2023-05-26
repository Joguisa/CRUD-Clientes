import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor(private _productoServicio: ProductoService, private _toastr: ToastrService){}

  ngOnInit(): void {
    this.mostrarProductos();
  }

  mostrarProductos(){
    this._productoServicio.getProductos().subscribe({
      next: (data: Producto[]) => {
        if (data)
        this.listProductos = data;
      }, 
      error: (e) => {
      }
    });
  }

  eliminarProducto(id: any){
    this._productoServicio.deleteProducto(id).subscribe( (res) =>{
      this._toastr.error('El producto fue eliminado', 'Producto eliminado');
      this.mostrarProductos();
    })
  }

  editarProducto(id: any){

  }

}
