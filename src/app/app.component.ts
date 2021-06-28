import { CommonService } from './services/common.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-library';
  constructor(public common: CommonService) {

    console.info(this.common)
  }
  // public uploadFn = this.common.uploadFile
  ngOnInit(): void {
    
  }
}
