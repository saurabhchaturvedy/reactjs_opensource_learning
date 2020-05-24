import React,{useEffect,useRef} from "react";
import classes from "./Cockpit.css";

const cockpit = (props) => {

    const toggledButtonRef = useRef(null);
    

   useEffect(() => {
       console.log('[Cockpit.js] useEffect()...');

       toggledButtonRef.current.click();
       return ()=> {
           console.log('[Cockpit.js] clean up work in useEffect() ...');
       };
   },[])


   useEffect(()=>{
       console.log('[Cockpit.js] 2nd useEffect()...');
       return () => {
           console.log('[Cockpit.js] 2nd clean up work in useEffect()...');
       }
   })


  let assignedClasses = [];
  let btnClass = [classes.Button];
  if (props.showPersons) {
    btnClass.push(classes.red);
  }
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }
  return (
    <div>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}> This is really working</p>
      <button
        className={btnClass.join(" ")}
        ref={toggledButtonRef}
        style={props.style}
        onClick={props.clicked}
      >
        Toggle Persons
      </button>
      <button onClick={props.login}>Log In</button>
    </div>
  );
};

export default React.memo(cockpit);
