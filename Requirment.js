/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class pt {
  //this constructor is used to construct the pt class
  constructor(coordX, coordY) {
    this.coordX = coordX;
    this.coordY = coordY;
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); 
    }

    this.startingPoint = startingPoint;
    this.width = width; 
    this.height = height; 
  }

  // ***************
  // METHODS
  // ***************

  area() {
    return this.width * this.height;
  }

  calculatePerimeter() {
    return 2 * this.width + 2 * this.height;
  }
  

  updateMyHeight(height) {
    if (height && height > 0) {
      if(this.height === this.width){
        this.height = height;
        this.width = height;
      }
      this.height = height;
    }
    
  }

  // update the width and height of the rectangle
  update({ startingPoint, width, height }) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); 
    }

    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  fetchHeight() {
    return this.height;
  }

  //function that print the endpoints
  endPoints() {
    const topRight = this.startingPoint.coordX + this.width;
    const bottomLeft = this.startingPoint.coordY + this.height;

    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }

  getWidth() {
    return this.width;
  }
}

function buildObject(width, coordX, height, coordY) {
  const mainPoint = new pt(coordX, coordY);
  const rect = new Rectangle(mainPoint, width, height);

  return rect;
}

function construct_Square(cordX, cordY, SquareHeight) {
  let square;

  if (!SquareHeight || SquareHeight <= 0) {
    square = buildObject(SquareHeight, cordX, SquareHeight, cordY);
  }

  const square_area = square.area();
  const squarePerimeter = square.calculatePerimeter();

  console.log("square Area ", square_area);
  console.log("square Perimeter ", squarePerimeter);
}

const myRect = buildObject(2, 3, 5, 4);
const sq = construct_Square();

console.log(sq.calculatePerimeter());

sq.endPoints();

myRect.updateMyHeight(3);
