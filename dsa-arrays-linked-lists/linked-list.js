/** Node: node for a singly linked list. */
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.previous=null;
  }
} 

/** LinkedList: chained together nodes. */
class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode= new Node(val);
    if(!this.head){
      this.head=newNode;
      this.tail=newNode;
    }
    newNode.previous=this.tail
    this.tail.next=newNode
    this.tail=newNode
  
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode=new Node(val);
    newNode.next=this.head;
    this.head=newNode;
  }

  /** pop(): return & remove last item. */

  pop() {
    let popped=this.tail.val;
    this.tail=this.tail.previous;
    this.tail.next=null;
    return popped;
  }

  /** shift(): return & remove first item. */

  shift() {
    let shifted=this.head.val;
    this.head=this.head.next;
    this.head.previous=null;
    return shifted;

  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let thisNode=this.head;
    let index=0;
    while(thisNode!=null&&index!=idx){
      index+=1;
      thisNode=thisNode.next;
    }
    return thisNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let thisNode=this.head;
    let index=0;
    while(thisNode!=null&&index!=idx){
      index+=1;
      thisNode=thisNode.next;
    }
    thisNode.val=val;
    return thisNode.val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let thisNode=this.head;
    let index=0;
    while(thisNode!=null&&index!=idx){
      index+=1;
      thisNode=thisNode.next;
    }
    let newNode=new Node(val);
    thisNode.previous.next=newNode;
    newNode.previous=thisNode.previous
    newNode.next=thisNode;
    thisNode.previous=newNode;
    
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let thisNode=this.head;
    let index=0;
    while(thisNode!=null&&index!=idx){
      index+=1;
      thisNode=thisNode.next;
    }
    thisNode.previous.next=thisNode.next;
    thisNode.next.previous=thisNode.previous;


  }

  /** average(): return an average of all values in the list */

  average() {
    let thisNode=this.head;
    let index=0;
    let sum=0;
    while(thisNode!=null){
      index+=1;
      sum+=thisNode.val
      thisNode=thisNode.next;
    }
    return sum/(index+1);
    
  }
}

console.log("ran linked-list")

function something(){
  console.log("doing somethiomg")
}
// module.exports = LinkedList;
