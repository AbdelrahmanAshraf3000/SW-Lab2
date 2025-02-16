/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class Point {
  //this constructor is used to construct the point class with x and y coordinates
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

  // Calculate the area of the rectangle
  calculateArea() {
    return this.width * this.height;
  }

  // Calculate the perimeter of the rectangle
  calculatePerimeter() {
    return 2 * this.width + 2 * this.height;
  }
  
// Update the height of the rectangle
  updateHeight(height) {
    if (height && height > 0) {
      if(this.height === this.width){   // this checks if the rectangle is a square
        this.width = height;
      }
      this.height = height;
    }
    
  }

  // update the width and height of the rectangle
  updateDimensions({ startingPoint, width, height }) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); 
    }

    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  //function that print the endpoints
  printEndPoints() {
    const topRightX = this.startingPoint.coordX + this.width;
    const bottomLeftY = this.startingPoint.coordY + this.height;

    console.log("End Point X-Axis (Top Right): " + topRightX);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeftY);
  }

  
}

// Function to create a rectangle object
function createRectangle(width, coordX, height, coordY) {
  const startingPoint = new Point(coordX, coordY);
  return new Rectangle(startingPoint, width, height);
}

function createSquare(coordX, coordY, squareLength) {
  if (!squareLength || squareLength <= 0) {
    throw Error("invalid square length");
  }
  const square = createRectangle(squareLength, coordX, squareLength, coordY);
  const squareArea = square.calculateArea();
  const squarePerimeter = square.calculatePerimeter();

  console.log("square Area ", squareArea);
  console.log("square Perimeter ", squarePerimeter);
  
  return square;
}

// Function to create a square object and test functions above
const myRectangle = createRectangle(2, 3, 5, 4);
const mySquare = createSquare(1, 1, 3);

console.log(mySquare.calculatePerimeter());

mySquare.printEndPoints();

myRectangle.updateHeight(3);
