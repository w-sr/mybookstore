import { Book } from './../../shared/book';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BookService } from './../../shared/book.service';

import { AngularFireStorage } from'@angular/fire/storage';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent {
  
  dataSource: MatTableDataSource<Book>;
  @ViewChild('MatPaginator', { static: true }) paginator: MatPaginator;
  BookData: any = [];
  displayedColumns: any[] = [
    '$key',
    'book_name',
    'author_name', 
    'publication_date',
    'in_stock',
    'action'
  ];
  
  constructor(private bookApi: BookService, private storage: AngularFireStorage){
    this.bookApi.GetBookList().subscribe(books => {
      books.forEach(item => {
        let a = item.payload.doc.data();
        
        a['$key'] = item.payload.doc.id;
        let link = this.bookApi.GetDownLoadLink(item.payload.doc.id)
        this.BookData.push(a as Book)
      })

      this.dataSource = new MatTableDataSource(this.BookData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  /* Delete */
  deleteBook(index: number, e){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice(index, 1);
      this.dataSource.data = data;
      this.bookApi.DeleteBook(e.$key)
    }
  }
  
  open(index: number, e) {
    // console.log('index', e.$key)
    this.storage.storage.ref('books-list').listAll()
      .then(res => {
        res.items.forEach(async item => {
          const url = await item.getDownloadURL();
          console.log('url', url)
          window.open(url, "_blank");
        })
      });
  }
}