import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../../models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute
  ) {
    this.productoForm = this.formBuilder.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
    console.log("saber si va", this.productoForm)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto() {

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };
    if (this.id !== null) {
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue editado con éxito', 'Producto editado');
        this.router.navigate(['/'])
      })
    } else {
      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {

        this.toastr.success('El producto fue registrado con éxito', '¡Producto registrado!')
        this.router.navigate(['/']);

      }, error => {
        console.log(error);
        this.productoForm.reset()
      })
    }

    console.log("agregarproducto llamado", this.productoForm)

  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      })
    }
  }
}
