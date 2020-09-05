import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.page.html',
  styleUrls: ['./bankdetails.page.scss'],
})
export class BankdetailsPage implements OnInit {

  @ViewChild('form') form:NgForm;
  @ViewChild('accno') account:string;
  t1:string;
  t2:string;
  constructor() { }

  ngOnInit() {
  }

  onsubmit(){
    console.log(this.form);
  }

}
