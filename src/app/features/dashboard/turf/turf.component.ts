import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTurfs } from './store/turf.selectors';
import { deleteTurf, loadTurf } from './store/turf.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TurfDialogComponent } from './turf-dialog/turf-dialog.component';
import { environment } from '../../../../environment/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turf',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatSort,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './turf.component.html',
  styleUrls: ['./turf.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition(':enter', [animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))])
    ])
  ]
})
export class TurfComponent implements OnInit, AfterViewInit {
  turfs$: Observable<any[]>; 
  displayedColumns: string[] = ['name', 'location', 'pricePerHour', 'capacity', 'imageUrl', 'actions'];
  dataSource = new MatTableDataSource<any>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.turfs$ = this.store.select(selectTurfs);
  }

  ngOnInit() {
    this.store.dispatch(loadTurf());
  
    this.turfs$.subscribe((turfs) => {
      this.dataSource.data = turfs.map(turf => ({
        ...turf,
        imageUrl: `${environment.apiUrl}${turf.imageUrl}`
      }));
  
      // Ensure paginator and sorting are assigned after data is updated
      setTimeout(() => {
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      });
    });
  }
  
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  

  get isDataEmpty(): boolean {
    return this.dataSource.data.length === 0;
  }

  onEdit(turf: any) {
    const dialogRef = this.dialog.open(TurfDialogComponent, {
      width: '500px',
      data: { ...turf },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Updated Turf:', result);
        this.store.dispatch(loadTurf()); 
      }
    });
  }

  onDelete(turf: any) {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to remove "${turf.name}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(deleteTurf({ turfId: turf.id }));

        Swal.fire({
          title: "Deleted!",
          text: `"${turf.name}" has been successfully removed.`,
          icon: "success",
          timer: 2500,
          showConfirmButton: false
        });

        // Refresh data
        this.store.dispatch(loadTurf());
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: `"${turf.name}" is safe!`,
          icon: "info",
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

  openAddTurfDialog(): void {
    const dialogRef = this.dialog.open(TurfDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Turf Added:', result);
        this.store.dispatch(loadTurf());
      }
    });
  }
}
