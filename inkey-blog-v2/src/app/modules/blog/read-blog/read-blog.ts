import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgFor } from '@angular/common';

import { BlogService } from '../blog-service';
import { CommonService } from '../../../core/services/common-service';

import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { take, Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-read-blog',
  standalone: true,
  imports: [
    MatFormField,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatLabel,
    MatIcon,
    MatDivider,
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    NgFor
  ],
  templateUrl: './read-blog.html',
  styleUrl: './read-blog.scss',
})
export class ReadBlog implements OnInit, OnDestroy {
  blogId: string = '';
  title: string | null = null;
  content: string | null = null;
  username: string = '';
  currUsername: string = '';
  loading: boolean = true;

  commentDisplay: any[] = [];
  replying = false;
  reply = '';
  activatedComment = '';

  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private location: Location,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id') || '';
    this.loadBlogDetails();
    this.loadComments();
    this.resolveCurrentUser();
  }

  private loadBlogDetails(): void {
    this.blogService.getBlogById(this.blogId)
      .pipe(take(1))
      .subscribe((res: any) => {
        const blog = res?.data;
        if (blog) {
          this.title = blog.title;
          this.content = blog.content;
          this.username = blog.username;
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  private resolveCurrentUser(): void {
    this.commonService.$username
      .pipe(takeUntil(this.destroy$))
      .subscribe((username: any) => {
        this.currUsername = username || localStorage.getItem('username') || '';
      });
  }

  private loadComments(): void {
    this.blogService.getComments(this.blogId)
      .pipe(take(1))
      .subscribe((comments: any[] = []) => {
        this.commentDisplay = comments;
        this.cdr.detectChanges();
      });
  }

  goBack(): void {
    this.location.back();
  }

  addComment(): void {
    if (this.commentForm.valid) {
      const commentText = this.commentForm.get('comment')?.value?.trim();
      if (!commentText) return;

      this.blogService.addComment(commentText, this.currUsername, this.blogId)
        .pipe(take(1))
        .subscribe((success: any) => {
          if (success) {
            this.loadComments();
            this.commentForm.reset();
          }
        });
    }
  }

  handleReplyClick(commentId: string): void {
    this.replying = true;
    this.activatedComment = commentId;
  }

  handleReplyCancel(): void {
    this.replying = false;
    this.activatedComment = '';
    this.reply = '';
  }

  addReply(commentId: string): void {
    const replyText = this.reply.trim();
    if (!replyText) return;

    this.blogService.addReply(commentId, replyText, this.currUsername)
      .pipe(take(1))
      .subscribe((success: any) => {
        if (success) {
          this.loadComments();
          this.handleReplyCancel();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
