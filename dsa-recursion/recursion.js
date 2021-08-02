/** product: calculate the product of an array of numbers. */

function product(nums,i) {
  if(i==nums.length){
    return 1;
  }
  return nums[i]*product(nums,i+1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words,i,longest=0) {
  if(i===words.length){
    return longest;
  }
  if(word[i]>longest){
    longest=word[i];
  }
  return longest(words,i+1,longest);


}

/** everyOther: return a string with every other letter. */

function everyOther(str,i,everyOther="") {
  if(str.length===i){
    return everyOther;
  }
  everyOther+=str[i];
  return everyOther(str,i+2,everyOther)

}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str,i) {
  if(str[i]!==str.lenght-1-i){
    return false;
  }
  if(str[i]>=str.length-1-i){
    return true;
  }
  return isPalindrome(str,i+1)

}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val,i=0) {
  if(i>=arr.length){
    return -1;
  }
  if(arr[i]===val){
    return i;
  }
  else{
    findIndex(arr,val,i+1);
  }

}

/** revString: return a copy of a string, but in reverse. */

function revString(str,i=0,reversedStr="") {
  if(i>=str.length){
    return reversedStr;
  }
  reversedStr=reversedStr+str[str.length-i-1];
  revString(str,i+1,reversedStr);
  


}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strings=[];
  for(k in obj){
    if(typeof obj[k]=="string"){
      strings.push(obj[k])
    }
    else if(typeof obj[k]=="object"){
      strings.push(...gatherStrings(obj[k]));
    }
  }
  return strings;


}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val,lo=arr[0],hi=arr.length-1) {
  if(hi>=lo){
    return -1;
  }
  let mid=lo+(hi-lo);

  if(arr[mid]==val){
    return mid;
  }
  else if(arr[mid]<val){
    return binarySearch(arr,val,lo=lo,hi=mid);
  }
  else{
    return binarySearch(arr,val,lo=mid,hi=hi);
  }

}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
