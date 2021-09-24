import { MyGallery } from './../models/MyGallery';
import { MyGalleryService } from '../services/my-gallery.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.css']
})
export class MyGalleryComponent implements OnInit {

  /*Component purpose:
  1) display list of the user's favorite objects --- funtion to display list
  2) allow them to edit the haveVisited bool property --- function to edit, button to edit
  3) allow them to delete the entry --- function to delete, button to delete
  */

   myGalleryList: MyGallery[] = [];
   galleryObject: MyGallery; //** SO

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

   // //delete an item from their list of likes -- called when the user clicks "delete from my gallery"
    deleteGalleryItem(entryId: number): void {
      this.galleryApiService.deleteGalleryItem(entryId).subscribe(
        result => {
          console.log(entryId);
          this.getAllLikes();
        },
        error => console.log(error)
      )
    }

    //** SO/AC updated
    //edit an item from the list of likes
   editGalleryItem (entryId: number, galleryObj: MyGallery) {
    this.galleryApiService.updateGalleryItem(entryId, galleryObj).subscribe(
      result => {
        this.myGalleryList = result;
        console.log(this.myGalleryList)
        this.getAllLikes();
      },
      error => console.log(error)
    )
  }

  //** SO/AC updated
   // when the user clicks the "I've visited button"
   onMarkAsVisited (item: MyGallery, entryId: number) {
   }
}

// import { MyGalleryService } from '../services/my-gallery.service';
// import { Component, OnInit } from '@angular/core';
// import { MyGallery } from '../models/MyGallery';

// @Component({
//   selector: 'app-my-gallery',
//   templateUrl: './my-gallery.component.html',
//   styleUrls: ['./my-gallery.component.css']
// })
// export class MyGalleryComponent implements OnInit {

//   /*Component purpose:
//   1) display list of the user's favorite objects --- funtion to display list
//   2) allow them to edit the haveVisited bool property --- function to edit, button to edit
//   3) allow them to delete the entry --- function to delete, button to delete
//   */

//    myGalleryList: MyGallery[] = [];

//    constructor(private galleryApiService: MyGalleryService) { }

//   ngOnInit() {

//      this.getAllLikes();
//    }

//    //get list of likes by user
//    getAllLikes () {
//      this.galleryApiService.getAllLikes().subscribe(
//        result => {
//          this.myGalleryList = result;
//          console.log(this.myGalleryList)
//        },
//        error => console.log(error)
//      )
//    }

//   // // //delete an item from their list of likes -- called when the user clicks "delete from my gallery"
//   deleteGalleryItem(entryId: number): void {
//     this.galleryApiService.deleteGalleryItem(entryId).subscribe(
//       result => {
//         console.log(entryId);
//         this.getAllLikes();
//       },
//       error => console.log(error)
//     )
//   }

//    //edit an item from the list of likes
//    editGalleryItem () {
//   }

//    // when the user clicks the "I've visited button"
//    onMarkAsVisited (){
//      //change the bool to true & send that update to the API (editGalleryItem)
//    }
// }