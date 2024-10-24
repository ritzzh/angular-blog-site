import { Component } from '@angular/core';
import { MyblogsComponent } from '../myblogs/myblogs.component';
import { AllblogsComponent } from '../allblogs/allblogs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MyblogsComponent,AllblogsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
