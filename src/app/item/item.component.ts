import { Component, OnInit, Input } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../model/item';
import {ItemServiceService} from 'src/app/item-service.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item = new Item();

  faCheck = faCheck;
  faTrash= faTrashAlt;
  private itemService : ItemServiceService;

  constructor(private itemSer : ItemServiceService) { 
    this.itemService = itemSer;
  }

  ngOnInit(): void {
  }

  onCheck(item){
    var i= "item"+item.name;
    document.getElementById(i).style.backgroundColor="gray";
    var html= document.getElementById(i).outerHTML;
    html= '<div id="item" class="item" style="height: 70px "><p style="font-size:20px">item checked out</p></div>';
    document.getElementById(i).outerHTML= html;

    let itemList : any =  this.itemService.getListItem();
    itemList.forEach((value) => {
      if(value.name==item.name)
      {
        this.itemService.removeItem(item);
        itemList.push(value);
      }
    });
  }

  onRemove(item){
    // this.itemService.removeItem(item);
    this.itemService.removeItem(item).subscribe(data =>{
      console.log("Item deleted")
    })
  }
}
