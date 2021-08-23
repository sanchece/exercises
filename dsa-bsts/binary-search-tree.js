class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    // return val;
    if(this.root===null){
      this.root=new Node(val);
      return this;
     }
    let current=this.root;
    while(true){
      if(val<current.val){
        if(current.left==null){
          current.left= new Node(val);
          return this;
        }
        else{
          current=current.left;
        }
      }
      else if(val>current.val){
        if(val>current.val){
          if(current.right==null){
            current.right= new Node(val);
            return this;
          }
          else{
            current=current.right;
          }
        }

      }
      }
     

    

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {


    if(this.root==null){
      this.root=new Node(val);
      return this;
    }

      function checkNode(node){
        if(node.val>val){
          if(node.left==null){
            node.left=new Node(val);
            return this;
          }
          else{
            return checkNode(node.left);
          }
  
        }
        else if(node.val<val){
          if(node.right==null){
            node.right=new Node(val);
            return this;
          }
          else{
            return checkNode(node.right);
          }
  
        }
      }
      return checkNode(this.root);


   

  }

//   /** find(val): search the tree for a node with value val.
//    * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if(this.root.val==val){
      return this.root;
    }
    let current=this.root;

    while(current){
      if(current.val==val){
        return current;
      }
      else if(val>current.val){
        current=current.right;
      }
      else if(val<current.val){
        current=current.left;
      }
      }
      return undefined;

    }

  

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val,curr=this.root) {
    if(curr==null){
      return undefined;
    }
    if(curr.val>val){
      return this.findRecursively(val,curr.left)
    }
    else if(curr.val<val){
      return this.findRecursively(val,curr.right)
    }
    else{
      return curr;
    }


  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let visited=[];
    let curr=this.root;

    function traverse(node) {
      visited.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);

    }
    traverse(curr);
    return visited;

  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let visited=[];
    let curr=this.root;

    function traverse(node) {
  
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);

    }
    traverse(curr);
    return visited;


  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let visited=[];
    let curr=this.root;

    function traverse(node) {
  
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.val);

    }
    traverse(curr);
    return visited;



  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];

    queue.push(node);
    while (queue.length>0) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return data;

  }

//   /** Further Study!
//    * remove(val): Removes a node in the BST with the value val.
//    * Returns the removed node. */

//   remove(val) {

//   }

//   /** Further Study!
//    * isBalanced(): Returns true if the BST is balanced, false otherwise. */

//   isBalanced() {

//   }

//   /** Further Study!
//    * findSecondHighest(): Find the second highest value in the BST, if it exists.
//    * Otherwise return undefined. */

//   findSecondHighest() {
    
//   }
 }

module.exports = BinarySearchTree;
