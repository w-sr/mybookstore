import { Injectable } from '@angular/core';
import { Book } from './book';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from'@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  /* Create book */
  AddBook(book: Book, file: any) {

    let now = new Date();
    let nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));

    return this.firestore.collection('books-list').add({     
      book_name: book.book_name,
      isbn_10: book.isbn_10,
      author_name: book.author_name,
      publication_date: book.publication_date,
      binding_type: book.binding_type,
      in_stock: book.in_stock,
      languages: book.languages,
      timeStamp: nowUTC
    })
    .then(docRef => {
      this.storage.upload(`books-list/${docRef.id}`, file)
        .then(() => {
          console.log('Successfully Uploaded!');
        })
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Get book */
  GetBook(id: string) {
    return this.firestore.collection('books-list').doc(id).get();
  }

  /* Get book list */
  GetBookList() {
    return this.firestore.collection('books-list').snapshotChanges();
  }

  /* Update book */
  UpdateBook(id, book: Book) {
    delete book.$key;
    return this.firestore.doc('books-list/' + id).update({
      book_name: book.book_name,
      isbn_10: book.isbn_10,
      author_name: book.author_name,
      publication_date: book.publication_date,
      binding_type: book.binding_type,
      in_stock: book.in_stock,
      languages: book.languages
    });
  }

  // /* Delete book */
  DeleteBook(id: string) {
    this.firestore.doc('books-list/' + id).delete()
  }

  GetDownLoadLink(id: string) {
    
  }
  // Error management
  private errorMgmt(error) {
  }
}