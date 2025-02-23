import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTurfs } from './store/turf.selectors';
import { loadTurf } from './store/turf.actions';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatDialog } from '@angular/material/dialog';
import { TurfDialogComponent } from './turf-dialog/turf-dialog.component';


@Component({
  selector: 'app-turf',
  standalone: true, // Mark as standalone
  imports: [
    MatTableModule,
    MatPaginator,
    MatSortModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule, // Add MatIconModule
  ],
  templateUrl: './turf.component.html',
  styleUrls: ['./turf.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })), // Initial state (hidden and slightly moved up)
      transition(':enter', [ // When the element is added to the DOM
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })) // Animate to visible and original position
      ])
    ])
  ]
})
export class TurfComponent implements OnInit {
  turfs$: Observable<any[]>; // Observable to hold turfs from the store
  displayedColumns: string[] = ['name', 'location', 'pricePerHour', 'capacity', 'imageUrl', 'actions']; // Add 'actions' column
  dataSource = new MatTableDataSource<any>(); // Data source for the table

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store,private dialog: MatDialog) {
    this.turfs$ = this.store.select(selectTurfs); // Select turfs from the store
  }

  ngOnInit() {
    this.store.dispatch(loadTurf());

    this.turfs$.subscribe((turfs) => {
      this.dataSource.data = turfs; // Bind the data to the table
      this.dataSource.paginator = this.paginator; // Enable pagination
      this.dataSource.sort = this.sort; // Enable sorting
    });
  }

  onEdit(turf: any) {
    console.log('Edit turf:', turf);
  }

  // Method to handle delete action
  onDelete(turf: any) {
    console.log('Delete turf:', turf);
  }

  openAddTurfDialog(): void {
    const dialogRef = this.dialog.open(TurfDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Turf Added:', result);
        // TODO: Call API to refresh turf list
      }
    });
  }

}