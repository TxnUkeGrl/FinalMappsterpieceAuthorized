import { Departments } from '../models/Departments';
import { Component, OnInit } from '@angular/core';
import { MyGallery } from '../models/MyGallery';
import { MyGalleryService } from '../services/my-gallery.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-department-suggestion',
  templateUrl: './department-suggestion.component.html',
  styleUrls: ['./department-suggestion.component.css']
})
export class DepartmentSuggestionComponent implements OnInit {

 // purpose: use the getAllLikes endpoint to analyze which department is most frequest in the list of liked objects

  myGalleryList: MyGallery[] = [];
  mapObj = new Map ()
  department: string = '';
  departmentList : string[] = [];
  showDiv = false;

  constructor(private galleryApiService: MyGalleryService) { }

  // when the page is loaded, it gets the list of liked objects & assigns it to myGalleryList
  ngOnInit() {
    console.log("ngOnInIt")
    this.getAllLikes();
   }

   // this takes an array of myGallery objects & adds the departments into a new array
  makeNewList (array: MyGallery[]) : string[] {
      console.log("makeNewList");
    var deptList = array.map(item => item.department);
      console.log(deptList)
    return deptList;
  }

  // this method finds the most frequent value in the departments array using a map object
  mostFrequent(array: string[]) {

    var map = this.mapObj; //a map object is like a dictionary - it's a set of key value pairs

    let compare: number = 0;
    let mostFreq : string = '';

    for (var i = 0; i < array.length; i++) { //for the item in the array
      var word = array[i];  //set the variable "word" equal to the first item in the array. This will be the key.
      var x: number = 1; //this will be the value.

      //map.set(word, x)

       if (map.get(word) == null ) { //if the word doesn't exist in the map
         map.set(word, x); // create a new entry where word equals the item from department list & the key is 1
       } else { //if it does exist...
         var j = map.get(word); //j equals the value of that word (word is the key).
         var j = j + 1 //increment the value
         map.set(word, j) // and re-set it
       }
       // basically, if the dept name (key), doesn't exist, add it to the map & give it a value of one, because there's one item
       // in that department. If the department name does exist, increment the value (j) by one, like a tally

       if (map.get(word) > compare) { //if the tally is greater than compare (set to 0)
        compare = map.get(word); // set compare to the tally
        mostFreq = array[i]; // the property mostFreq = the item at that index (department name)
       }
    }

    this.department = mostFreq;
    return this.department;
  }

  // this is called when the get result button is clicked.
  // sets the department list to the array returned from makeNewList & sends that to mostFrequent to find the most popular dept.
  calculateDepartment () {
    this.mapObj.clear();
    this.departmentList = this.makeNewList(this.myGalleryList)
    this.mostFrequent(this.departmentList)
    this.showDiv = !this.showDiv;
  }

  //endpoint
  getAllLikes () {
    this.galleryApiService.getAllLikes().subscribe(
      result => {
        this.myGalleryList = result;
        console.log("getAllLikes")
        console.log( this.myGalleryList)
      },
      error => console.log(error)
    )
  }
}
