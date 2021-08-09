/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    function findMinDepth(node){
      if(node.left==null&& node.right==null){
        return 1;
      }
      else if(node.left==null){
        return findMinDepth(node.right);
      }
      else if(node.right==null){
        return findMinDepth(node.left);
      }
      else{
        return Math.min(findMinDepth(node.left),findMinDepth(node.right))+1;
      }
    }
    let minDepth=findMinDepth(this.root)
    return minDepth;

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    function findMaxDepth(node){
      if(node.left==null&& node.right==null){
        return 1;
      }
      else if(node.left==null){
        return findMaxDepth(node.right);
      }
      else if(node.right==null){
        return findMaxDepth(node.left);
      }
      else{
        return Math.max(findMaxDepth(node.left),findMaxDepth(node.right))+1;
      }
    }
    let maxDepth=findMaxDepth(this.root)
    return maxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let max=0;

    function maxSum(node){
        let left=maxSum(node.left);
        let right=maxSum(node.right);
        result=Math.max(node.val+left+right,max);
        return Math.max(left+node.val,right+node.val,0);
      
    }
    maxSum(this.root);

    return max;


  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let toVisitQueue=[this.root];
    let lowVal=null;
    while(queue.length){
      let node=toVisitQueue.shift();
      let val=node.val;
      if(val>lowerBound&& val<lowVal ||lowVal==null){
        lowVal=val;
      }
      if(node.left){
        queue.push(node.left);
      }
      if(node.right){
        queue.push(node.right);
      }
    
      }

    }



  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
