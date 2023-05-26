import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{
  productoform: FormGroup;
  titulo = 'Crear Producto'
  id: string;
  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService, 
              private _productoServicio: ProductoService,
              private aRouter: ActivatedRoute){
    this.productoform = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    const modelo: Producto = {
      nombre: this.productoform.get('producto')?.value,
      categoria: this.productoform.get('categoria')?.value,
      ubicacion: this.productoform.get('ubicacion')?.value,
      precio: this.productoform.get('precio')?.value,
    }
    if(this.id == null){
      this._productoServicio.postProducto(modelo).subscribe({
        next: (data) => {
          this.toastr.success('El producto fue registrado', 'Producto Registrado');
          this.router.navigate(['/list-product']);
        },
        error: (e) => {
          this.toastr.error('El producto no fue registrado', 'Producto no registrado');
          this.productoform.reset();
        }
      })
    } else {
      this._productoServicio.updateProducto(this.id, modelo).subscribe({
        next: (data) => {
          this.toastr.info('El producto fue editado', 'Producto Editado');
          this.router.navigate(['/list-product']);
        },
        error: (e) => {
          this.toastr.error('El producto no fue editado', 'Producto no editado');
          this.productoform.reset();
        }
      })
    }
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar producto';
      this._productoServicio.getProducto(this.id).subscribe(data => {
        this.productoform.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      })
    }

  }

}
