import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTurfCollections } from './store/turf-collections.actions';
import { selectTurfs } from './store/turf-collections.selectors';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TurfCollectionsDetailComponent } from './turf-collections-detail/turf-collections-detail.component';

@Component({
  selector: 'app-turf-collections',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule,
    FormsModule, TurfCollectionsDetailComponent
  ],
  templateUrl: './turf-collections.component.html',
  styleUrl: './turf-collections.component.css'
})
export class TurfCollectionsComponent implements OnInit {
  turfs$: Observable<any[]>;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  selectedTurf: any = null;
  bookingData = { date: '', startTime: '', endTime: '', userId: 'USER_ID_HERE' };

  constructor(private store: Store, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.turfs$ = this.store.select(selectTurfs);
  }

  ngOnInit() {
    this.fetchTurfData();
  }

  fetchTurfData() {
    this.store.dispatch(loadTurfCollections());

    // Subscribe to store data and update dataSource
    this.turfs$.subscribe((turfs) => {
      this.dataSource.data = turfs;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator; // ✅ Connect paginator
      }
      this.cdr.detectChanges(); // ✅ Force UI refresh
    });
  }

  viewDetails(turf: any) {
    this.selectedTurf = turf;
  }

  closeDetails() {
    this.selectedTurf = null;
    this.fetchTurfData();
  }
}
