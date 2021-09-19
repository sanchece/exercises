function choice(items) {
    let i = Math.floor(Math.random() * items.length);
    return items[i];
  }

  function remove(item, items) {
    let newArr=[]
    for (let i = 0; i < items.length; i++) {
      if (items[i] ==item) {
        newArr=[...items.slice(0,i),...items.slice(i+1)]
        return newArr;
      }
    }
    return undefined
  }
  
  
  export {choice, remove}