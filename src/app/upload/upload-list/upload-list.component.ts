import {Component, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MdSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})

export class UploadListComponent implements OnInit {
    displayedColumns = ['itemId', 'itemName', 'itemLink'];
    exampleDatabase = new ExampleDatabase();
    dataSource: ExampleDataSource | null;

    @ViewChild(MdSort) sort: MdSort;

    ngOnInit() {
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort);
    }
}

/** Constants used to fill up our data base. */
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
    id: string;
    name: string;
    link: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
    get data(): UserData[] { return this.dataChange.value; }

    constructor() {
        // Fill up the database with 100 users.
        for (let i = 0; i < 100; i++) { this.addUser(); }
    }

    /** Adds a new user to the database. */
    addUser() {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewUser());
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new User. */
    private createNewUser() {
        const name =
            NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
            NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

        return {
            id: (this.data.length + 1).toString(),
            name: name,
            link: Math.round(Math.random() * 100).toString(),
        };
    }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: ExampleDatabase, private _sort: MdSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<UserData[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._sort.mdSortChange,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.getSortedData();
        });
    }

    disconnect() {}

    /** Returns a sorted copy of the database data. */
    getSortedData(): UserData[] {
        const data = this._exampleDatabase.data.slice();
        if (!this._sort.active || this._sort.direction === '') { return data; }

        return data.sort((a, b) => {
            let propertyA: number|string = '';
            let propertyB: number|string = '';

            switch (this._sort.active) {
                case 'userId': [propertyA, propertyB] = [a.id, b.id]; break;
                case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
                case 'link': [propertyA, propertyB] = [a.link, b.link]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
}
