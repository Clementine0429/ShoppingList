import { Component, NgZone, OnInit } from '@angular/core';
import {Item} from 'src/app/model/item';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemServiceService} from 'src/app/item-service.service';
// import {Router} from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  message:string="";
  
  formItem= this.frm.group({
    name: ['', Validators.required],
  });

  items : ItemServiceService= this.itemList;

  listItem: any= [] ;

  constructor(private frm : FormBuilder, private itemList: ItemServiceService) { }

  ngOnInit(): void {
    this.getListItem();
  }

  onSubmit(){
    let item: Item= new Item;

    // id tự generate
    // item.id= id+1;
    item.img= "assets/img/milk.jpg";
    item.name= this.formItem.get('name').value;

    this.addNewItem(item);

    this.formItem.reset;
    alert("Hi");
  };

  addNewItem(item){
    // this.items.addNewItem(item);
    return this.items.addNewItem(item).subscribe(res =>{
      console.log('Issue added!')
      // this.ngZone.run(() => this.router.navigateByUrl('/body'))
    })
  }

  getListItem() {
    // return this.items.getListItem().subscribe((data:{}) => {
    //   this.listItem= data;
    // });
    return this.items.getListItem().subscribe((data: {}) => {
      this.listItem = data;
    })
  }
  
}
