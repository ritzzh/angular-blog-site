import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditBlog } from './create-edit-blog';

describe('CreateEditBlog', () => {
  let component: CreateEditBlog;
  let fixture: ComponentFixture<CreateEditBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditBlog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
