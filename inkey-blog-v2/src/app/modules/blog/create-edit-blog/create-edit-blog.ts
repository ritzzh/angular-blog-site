import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BlogService } from '../blog-service';
import { CommonService } from '../../../core/services/common-service';
import { BlogInfoInterface } from '../../../shared/types/BlogTypes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-edit-blog',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './create-edit-blog.html',
  styleUrl: './create-edit-blog.scss'
})
export class CreateEditBlog implements OnInit {
  blogForm: FormGroup;
  blogId: string = '';
  isEditMode = false;
  username: string = '';
  loading: boolean = false;
  bloginfo?: BlogInfoInterface;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private blogService: BlogService,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.commonService.$username.subscribe((username: string) => {
      this.username = username || localStorage.getItem('username') || '';
    });
  }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id') || '';
    this.isEditMode = !!this.blogId;

    if (this.isEditMode) {
      this.loadBlogDetails();
    }
  }

  loadBlogDetails() {
    this.loading = true;
    this.blogService.getBlogById(this.blogId).subscribe({
      next: (blog:any) => {
        if (blog) {
          this.blogForm.patchValue({
            title: blog?.data?.title || 'hehe',
            content: blog?.data?.content || ''
          });
          this.bloginfo = { ...blog };
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load blog details', err);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.blogForm.invalid) return;

    const { title, content } = this.blogForm.value;
    this.loading = true;

    const action$ = this.isEditMode
      ? this.blogService.updateBlog(this.blogId, title, content, this.username, 'pending')
      : this.blogService.saveBlog(title, content, this.username);

    action$.subscribe({
      next: (result) => {
        this.loading = false;
        if (result) {
          alert(this.isEditMode ? 'Updated successfully' : 'Blog saved successfully');
          this.router.navigate(['/blog/my-blogs']);
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Blog save/update failed', err);
        alert('Something went wrong.');
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
