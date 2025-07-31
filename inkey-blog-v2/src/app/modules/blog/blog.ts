import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../core/services/common-service';
import { BlogInfoInterface } from '../../shared/types/BlogTypes';
import { BlogService } from './blog-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-myblogs',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.scss'],
})
export class Blog {
  blogs: BlogInfoInterface[] = [];
  username = '';

  constructor(
    private commonService: CommonService,
    private blogService: BlogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.commonService.$username.subscribe((msg) => {
      this.username = msg || localStorage.getItem('username') || '';
      this.blogService.getBlog(this.username).subscribe((result) => {
        this.blogs =[...result];
        this.cdr.detectChanges();
      });
    });
  }

  deleteBlog(_id: string): void {
    this.blogService.deleteBlog(_id).subscribe((result) => {
      if (result) {
        this.blogs = this.blogs.filter((blog) => blog._id !== _id);
      } else {
        alert('Unable to delete blog.');
      }
    });
  }
}
