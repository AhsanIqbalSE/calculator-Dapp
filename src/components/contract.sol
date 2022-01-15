// SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.0;
contract Calculator {
   int public storedData;      // State variable
   constructor() {
      storedData = 2;   // Using State variable
   }
    function Add(int num1) public view returns (int) {
      return num1 + storedData;
   }
    function Subtract(int num1) public view returns (int) {
      return num1 - storedData;
   }
    function Multiply(int num1) public view returns (int) {
      return num1 * storedData;
   }
    function Divide(int num1) public view returns (int) {
      return num1 / storedData;
   }

}