import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MyGalleryService } from '../services/my-gallery.service';
//import { Component, OnInit } from '@angular/core';
import { MyGallery } from '../models/MyGallery';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent { //implements OnInit

  /*Component purpose:
  1) display list of the user's favorite objects --- funtion to display list
  2) allow them to edit the haveVisited bool property --- function to edit, button to edit
  3) allow them to delete the entry --- function to delete, button to delete
  */

   myGalleryList: MyGallery[] = [];

   constructor(private galleryApiService: MyGalleryService) { }

  ngOnInit() {

     this.getAllLikes();
   }

   //get list of likes by user
   getAllLikes () {
     this.galleryApiService.getAllLikes().subscribe(
       result => {
         this.myGalleryList = result;
         console.log(this.myGalleryList)
       },
       error => console.log(error)
     )
   }

   //edit an item from the list of likes
   editGalleryItem () {
  }

   // when the user clicks the "I've visited button"
   onMarkAsVisited (){

     //change the bool to true & send that update to the API (editGalleryItem)
   }
}