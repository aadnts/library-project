import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { share } from 'rxjs';

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.scss'],
})
export class DocumentsPageComponent implements OnInit {
  public documents: any[] = []; // Array to hold documents with individual showComments flags

  commentForm: FormGroup = this.fb.group({
    rating: [''],
    content: [''],
  });

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private fb: FormBuilder,
    private dtr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDocuments();
  }

  public getDocuments() {
    this.http.get<any[]>('http://localhost:3777/books').subscribe(
      (response: any[]) => {
        this.documents = response.map((document) => ({
          ...document,
          showComments: false,
        }));
      },
      (error: any) => {
        // Handle error if needed
        console.error('Error fetching documents:', error);
      }
    );
  }

  public publishComment(bookId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + token?.slice(1, -1)
    );

    const data = {
      bookId: bookId,
      userId: this.authService.user.id,
      rating: parseInt(this.commentForm.value.rating),
      content: this.commentForm.value.content,
    };

    let comment = this.http
      .post('http://localhost:3777/comments', data, { headers: headers })
      .pipe(share());

    comment.subscribe((response) => {
      this.getDocuments();
      this.commentForm.reset();
      this.dtr.detectChanges();
    });

    // .subscribe(
    //   (response) => {},
    //   (error: any) => {
    //     // Handle error if needed
    //     // console.error('Error fetching documents:', error);
    //   }
    // );
  }

  public toggleComments(document: any) {
    document.showComments = !document.showComments;
  }

  public generateRatingStars(document: any): number[] {
    const averageRating =
      document.comments.reduce(
        (total: number, comment: any) => total + comment.rating,
        0
      ) / (document.comments.length || 1);
    // console.log(averageRating);
    // console.log(Array(Math.floor(averageRating)).fill(0));
    return Array(Math.floor(averageRating)).fill(0);
  }
}
