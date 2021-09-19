import fruits from './fruits';
import {choice,remove} from '.helpers';

let randFruit=choice(fruits);

console.log(`I'd like one ${randFruit}, please`);
console.log(`Here you go:${randFruit}`);
let fruits2=remove(randFruit,fruits);
console.log(`I'm sorry, we're all out. We have ${fruits2.length} left.`);

