import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyblogsComponent } from './myblogs.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('MyblogsComponent', () => {
  let component: MyblogsComponent;
  let fixture: ComponentFixture<MyblogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyblogsComponent, HttpClientModule,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
