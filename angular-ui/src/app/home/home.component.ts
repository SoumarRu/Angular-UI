import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { Season } from './season';
import { CellClickedEvent, ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { Person } from './person';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public people: any = [];
  public seasons: Season[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getSeasons().subscribe((seasonsData: any[]) => {
      this.seasons = seasonsData;
      console.log(JSON.stringify(this.seasons));
      this.homeService.getInformation().subscribe((peopleData: any[]) => {
        this.people = peopleData;
        console.log(JSON.stringify(this.people));
      })
    })
  }

  public rowData$!: Observable<Person[]>;

  getSeasonById(id: number) {
    return this.seasons.find(x => x.id == id)?.name;
  }

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      field: 'id',
    },
    { field: 'name' },
    { field: 'age' },
    {
      field: 'seasonId',
      valueFormatter: (params) => this.getSeasonById(params.value)!
    },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.homeService.getInformation();
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}