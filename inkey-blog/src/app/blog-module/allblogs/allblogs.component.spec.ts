import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllblogsComponent } from './allblogs.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogService } from '../../blog.service';
import { AuthenticationService } from '../../authentication.service';
import { BlogInfoInterface } from '../../blog-info-interface';

describe('AllblogsComponent', () => {
  let component: AllblogsComponent;
  let fixture: ComponentFixture<AllblogsComponent>;
  let mockBlogService: jasmine.SpyObj<BlogService>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    mockBlogService = jasmine.createSpyObj('BlogService', [
      'getAllBlog',
      'updateBlog',
    ]);
    mockAuthService = jasmine.createSpyObj('AuthenticationService', ['']);

    await TestBed.configureTestingModule({
      imports: [AllblogsComponent, RouterTestingModule,HttpClientModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
