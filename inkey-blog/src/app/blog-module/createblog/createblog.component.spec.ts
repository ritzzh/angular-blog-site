import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateblogComponent } from './createblog.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateblogComponent', () => {
  let component: CreateblogComponent;
  let fixture: ComponentFixture<CreateblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateblogComponent, HttpClientModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
