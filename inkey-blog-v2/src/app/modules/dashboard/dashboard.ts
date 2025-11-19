import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BlogService } from '../blog/blog-service';
import { CommonService } from '../../core/services/common-service';
import { BlogInfoInterface } from '../../shared/types/BlogTypes';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil, take, BehaviorSubject } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, MatIconModule, MatProgressSpinner, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
  blogs: BlogInfoInterface[] = [];
  isAdmin: boolean = false;
  loading: boolean = true;
  blogs$ = new BehaviorSubject<BlogInfoInterface[]>([]);
  private destroy$ = new Subject<void>();

  constructor(
    private blogService: BlogService,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkAdminStatus();
    this.loadBlogs();
  }

  private checkAdminStatus(): void {
    this.commonService.$isAdmin
      .subscribe((isAdmin: boolean) => {
        this.isAdmin = isAdmin;
      });
  }

  private loadBlogs(): void {
    this.blogService.getAllBlog()
      .subscribe((blogs) => {
        this.blogs = [...blogs];
        this.blogs$.next([...blogs]);
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  approveBlog(_id: string, title: string, content: string, username: string): void {
    this.updateBlogStatus(_id, title, content, username, 'approved');
  }

  rejectBlog(_id: string, title: string, content: string, username: string): void {
    this.updateBlogStatus(_id, title, content, username, 'rejected');
  }

  private updateBlogStatus(
    _id: string,
    title: string,
    content: string,
    username: string,
    status: string
  ): void {
    this.blogService.updateBlog(_id, title, content, username, status)
      .pipe(take(1))
      .subscribe((success) => {
        if (success) {
          this.loadBlogs();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
