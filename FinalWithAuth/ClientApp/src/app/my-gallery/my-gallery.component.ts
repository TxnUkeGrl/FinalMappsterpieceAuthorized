import { MetObjects } from './../models/MetObjects';
import { MyGallery } from './../models/MyGallery';
import { MyGalleryService } from '../services/my-gallery.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { createFalse, createTrue } from 'typescript';

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.css']
})
export class MyGalleryComponent implements OnInit {

  /* Component purpose:
  1) display list of the user's favorite objects
  2) allow them to edit the haveVisited bool property
  3) allow them to delete the entry
  */

   myGalleryList: MyGallery[] = [];
  galleryObject: MyGallery; //** SO
  visitedObject: boolean;
  entryId: number;

   constructor(private galleryApiService: MyGalleryService) { }

  ngOnInit() {

     this.getAllLikes();
   }

   //access getAllLikes endpoint & assign data to property myGalleryList
   getAllLikes () {
     this.galleryApiService.getAllLikes().subscribe(
       result => {
         this.myGalleryList = result;
         console.log(this.myGalleryList)
       },
       error => console.log(error)
     )
  }

  getLikeById(entryId: number) {
    this.galleryApiService.getObjectById(entryId).subscribe(
      result => {
        this.galleryObject = result;
        console.log(this.galleryObject)
      },
      error => console.log(error)
    )
  }

   // delete an item from the -- called when the user clicks "delete from my gallery"
    deleteGalleryItem(entryId: number): void {
      this.galleryApiService.deleteGalleryItem(entryId).subscribe(
        result => {
          console.log(entryId);
          this.getAllLikes();
        },
        error => console.log(error)
      )
    }

  //** NOT FINISHED - HELP NEEDED
  //edit an item from the list of likes
  editGalleryItem() {
    this.galleryApiService.updateGalleryItem(this.entryId, this.galleryObject).subscribe(
      result => {
        //galleryObj.visitedObject = this.visitedObject;
        //this.myGalleryList = result;
        console.log(this.galleryObject)
        //this.getAllLikes();
      },
      error => console.log(error)
    )
  }

  onMarkAsVisited(entryId: number, item: MyGallery) {

    this.galleryObject = item;
    this.galleryObject.visitedObject = true;
    this.entryId = entryId;

    this.editGalleryItem();
  }
}
