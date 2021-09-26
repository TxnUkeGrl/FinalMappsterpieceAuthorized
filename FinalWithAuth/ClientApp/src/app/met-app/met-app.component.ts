import { MetObjects } from './../models/MetObjects';
import { MetAPIService } from './../services/met-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { ListBySearchTerm } from '../models/ListBySearchTerm';
import { MyGalleryService } from '../services/my-gallery.service';

@Component({
  selector: 'app-met-app',
  templateUrl: './met-app.component.html',
  styleUrls: ['./met-app.component.css']
})
export class MetAppComponent implements OnInit {

  metObj: MetObjects;
  listBySearchTerm: ListBySearchTerm;
  userSearchSelection: string = '';
  searchArray: number [] = [];
  searchTermArray: string[] = [ "Paintings", "Ceramics", "Sculpture", "Furniture" ];
  randomValue: number;
  currentIndex: number = 0;


  constructor(private metAPIservice: MetAPIService, private myGalleryAPIservice: MyGalleryService) { }

    // On start, the app shows a pre-selected object. Can work out a better system later.
    ngOnInit() {
      console.log("made it to the app component")
      //this.getMetObjById(436529);
      this.getMetObjById(11319);
   }

    //when the user selects a searchterm from the drop down, this method assigns the value to property userSearchSelection
    //then, that value is sent as a parameter to getObjListBySearchTerm, which assigns values to a property called listBySearchTerm
    submitSearchTerm(e: any) {
      this.userSearchSelection = e.target.value;
        console.log(`userSearchSelection`);
        console.log(this.userSearchSelection)
      this.getObjListBySearchTerm(this.userSearchSelection); //assigns ListBySearchTerm values (a list of objects that meet that searchterm)
        console.log("end of submitSearchTerm method")
    }

    //accesses the 3rd party API to assign value to listBySearchTerm object
    //returns a shuffled list of object IDs that match the search
    getObjListBySearchTerm(searchTerm: string) {
        console.log("beginning of getObjListBySearchterm")
        console.log(`term: ${searchTerm}`);
      this.metAPIservice.getObjectListBySearchTerm(searchTerm).subscribe(
         result => {
           this.listBySearchTerm = result; //assigning value
              console.log(`listBySearchTerm ObjectIds`)
              console.log(this.listBySearchTerm.objectIDs)
           this.shuffle(this.listBySearchTerm.objectIDs); //shuffling the array randomly
              console.log(`shuffled listBySearchTerm ObjectIds`);
              console.log(this.listBySearchTerm.objectIDs)
         },

         error => console.log(error)
      )};

    //shuffles the array randomly (fischer-yates method) & returns the shuffled array of numbers
    //purpose: so the user doesn't go through the same set of images each time they view the app
    shuffle(numbers: number[]): number[] {
      var m = numbers.length; //the length of the array

      while (m) {
        var i = Math.floor(Math.random() * m--); //var i = random index
        var t = numbers[m]; // t = the value of the random index
        numbers[m] = numbers[i]; // the number at the end of the array = the current index
        numbers[i] = t; //the current index = random index
      }

      return numbers;
    }

    // returns the next number from the number array
    getNextValue(numbers: number[]) : number {
      var value = numbers[this.currentIndex++]; //value = the value of the current index

      if (this.currentIndex >= numbers.length) {
        this.currentIndex = 0;
      }

      return value;
    }

    //Refers to the Select button, which is clicked after a search term is selected.
    //This sets a local variable rand equal to the value that is returned from getNextValue
    //then sends rand to getMetObjById to display the metObject
    onSelect(){
      var rand = this.getNextValue(this.listBySearchTerm.objectIDs);
      this.getMetObjById(rand);

    }

    //same as onSelect, but when the user selects "like"
    //add the met Obj to the myGallery list
    onLike() {
      var rand = this.getNextValue(this.listBySearchTerm.objectIDs);
      this.getMetObjById(rand);
      this.addNewLike(this.metObj); //addNewLike
    }

    //same as onSelect, but when the user selects "dislike"
    //nothing else happens per MVP goals
    onDislike() {
      var rand = this.getNextValue(this.listBySearchTerm.objectIDs);
      this.getMetObjById(rand);
    }

   //accesses the 3rd party API to assign values to the MetObject object
   getMetObjById(objectId: number) {
     this.metAPIservice.getObjectById(objectId).subscribe(
       result => {
         this.metObj = result;
         console.log(`getMetObjById`);
         console.log(this.metObj)
       },
       error => console.log(error)
      )};

   //method to call newlike & add it to thelikes/mygallery
   addNewLike(metObj: MetObjects) {
    this.myGalleryAPIservice.addToMyGallery(metObj).subscribe(
      result => {
        console.log(`addNewLike`);
        console.log(result)
      },
      error => console.log(error)
    )
  }

}
