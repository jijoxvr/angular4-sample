import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class DataSource<T>{
    resultsLength: number = 0;
    isLoadingResults: boolean = false;
    isRateLimitReached: boolean ;
    constructor(private _userDatabase: any, private _paginator: 
      MatPaginator, private _sort: MatSort, private _extractor) {
    }
  
    connect(): Observable<T[]> {
      
      const displayDataChanges = [
        this._sort.sortChange,
        this._paginator.page,
      ];
  
      this._sort.sortChange.subscribe(() => {
        this._paginator.pageIndex = 0;
      })
  
      return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        let params = {
          _page : this._paginator.pageIndex + 1,
          _limit : this._paginator.pageSize
        }
        if(this._sort.active)
          params = Object.assign(params, {_sort: this._sort.active,_order: this._sort.direction})
        return this._userDatabase.getData(params);
      })
      .catch(() => {
        this.isRateLimitReached = true;
        return Observable.of(null);
      })
      .map(result => {
        this.isLoadingResults = false;
        return result;
      })
      .map(result => {
        if (!result) { return []; }
  
        this.isRateLimitReached = false;
        this.resultsLength = result.json().total_count;
  
        return this._extractor(result);
      });
    }
  
    disconnect() {}
    
  }