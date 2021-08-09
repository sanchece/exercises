/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}


class Tree {
  constructor(root = null) {
    this.root = root;
  }
  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    let sum=this.root.val;
    function search(node){
      for(let item of node.children){
        if(item.children.length>=1){
          search(item)
        }
        else{
          sum+=item.val;
        }
      }
    }
    search(this.root);
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let totalEvens=0;

    function countEvens(node){
      for(let item of node.children){
        if (item.children.length>=1){
          countEvens(item);
        }
        else{
          if(item.val%2===0){
            totalEvens+=1;
          }
        }
      }

    }
    countEvens(this.root);
    return totalEvens;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let greaterNumCounter=0;
    
    function countGreaterNums(node){
      for(let item of node.children){
        if(item.children.length>=1){
          countGreaterNums(item);
        }
        else{
          if(item.val>lowerBound){
            greaterNumCounter+=1;
          }
        }
      }

    }

    countGreaterNums(node);
    return greaterNumCounter;



  }
}

module.exports = { Tree, TreeNode };
