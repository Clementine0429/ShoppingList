import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import {Item} from 'src/app/model/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor() { }

  itemList: Item[]= [
    {img:"assets/img/milk.jpg", name:"Milk"},
    {img:"assets/img/eggs.jpg", name:"Eggs"},
    {img:"assets/img/milk.jpg", name:"dsjbdsd"},

  ];

  getListItem() : Item[]{
    return this.itemList;
  }

  addNewItem(item: Item){
    this.itemList.push (item);
    return "Success";
  }

  removeItem (item: Item) : string {
    this.itemList.forEach((value,index)=>{
      if(value.name==item.name) this.itemList.splice(index,1);
    });
    return "Success!";
  }
}
