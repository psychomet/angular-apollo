import {Component, OnInit, ViewChild} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {deletePost, findAllPost} from '@app/core/models';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name','age','breed','edit','delete'];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.fetchList()
  }

  fetchList(){
    this.apollo.watchQuery<any>({
      query: findAllPost
    })
      .valueChanges
      .subscribe(({data}) => {
        this.dataSource = new MatTableDataSource<any>(data.cats);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
  }

  onDelete(id: number){
    this.apollo.mutate({
      mutation: deletePost,
      variables: {id: id}

    }).subscribe(({ data }) => {
      console.log('deleted',data);
      this.fetchList();
    });
  }
}
