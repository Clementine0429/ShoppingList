import { Component, OnInit } from '@angular/core';
import {Item} from 'src/app/model/item';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  message:string="";
  itemList: Item[]= [
    {img:"assets/img/milk.jpg", name:"Milk"},
    {img:"assets/img/eggs.jpg", name:"Eggs"},
    {img:"assets/img/milk.jpg", name:"dsjbdsd"},

  ];
  formItem= this.frm.group({
    name: ['', Validators.required],
  });

  constructor(private frm : FormBuilder) { }

  ngOnInit(): void {

  }

  onSubmit(){
    let item: Item= new Item;
    item.img= "assets/img/milk.jpg";
    item.name= this.formItem.get('name').value;

    this.addNewItem(item);

    this.formItem.reset;
    alert("Hi");
  };

  addNewItem(item: Item): string{
    this.itemList.push(item);
    return "Success!";
  }
}
