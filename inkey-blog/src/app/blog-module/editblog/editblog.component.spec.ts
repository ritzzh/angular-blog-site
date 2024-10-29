import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditblogComponent } from './editblog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';


describe('EditblogComponent', () => {
  let component: EditblogComponent;
  let fixture: ComponentFixture<EditblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditblogComponent, RouterTestingModule, HttpClientModule],
      providers: [
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
