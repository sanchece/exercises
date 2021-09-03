class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.remove(v2);
    v2.adjacent.remove(v1);

  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let v of this.nodes){
      if(v.adjacent.has(vertex)){
        v.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const queue=[start];
    const result=[];
    let viewed;
    let allViewed=new Set();

    while(queue.length){
      viewed=queue.pop();
      result.push(viewed.value);

      viewed.adjacent.forEach(adjacent=>{
        if(!allViewed.has(adjacent)){
          allViewed.add(adjacent);
          queue.push(adjacent);
        }
      })

    }
    return result;
  }
  }


  breadthFirstSearch(start) {
    const queue=[start];
    const result=[];
    let viewed;
    let allViewed=new Set();

    while(queue.length){
      viewed=queue.shift();
      result.push(viewed.value);

      viewed.adjacent.forEach(adjacent=>{
        if(!allViewed.has(adjacent)){
          allViewed.add(adjacent);
          queue.push(adjacent);
        }
      })

    }
    return result;
  }
}

module.exports = {Graph, Node}