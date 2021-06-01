import React, {createContext, useContext, useState} from 'react';
const context = createContext<any>(null);

const Sub = () => {
  const [state, setState] = useState(0);
  const xx:any = useContext(context)
  return <button onClick={() => {setState(s => s +1);xx[1]((ss:any) => ss + 1)}}>Sub State:{state} Context:{xx[0]}</button>;
};
export default function Test() {
  const [state, setState] = useState(0);
  const xx = useState(0);
  return <div><button onClick={() => setState(s => s +1)}>Father state : {state}</button>{state !== 5 && <context.Provider value={xx}><Sub /></context.Provider>}</div>;

}
