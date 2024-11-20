
import React, { useState, useRef } from 'react'; 
import { Button } from 'primereact/button';
import { useClickOutside } from 'primereact/hooks';

export default function ShowGifts(props) {
    const [visible, setVisible] = useState(false);
    const overlayRef = useRef(null);

    useClickOutside(overlayRef, () => {
        setVisible(false);
    });

//     const func =()=>{ 
 
//   return(   props.gifts.forEach((element,index)=>{
//     <div>{element.name}</div>
//     console.log(element.name);
//         }) )
     
// }
// useEffect(()=>{
// if(visible)
// func();
// },[visible])
    return (
        <div className="relative">
            <Button onClick={() => setVisible(true)} label="Show" />
            {visible ? (
                
                <div ref={overlayRef} className="absolute border-round  surface-overlay z-2 white-space-nowrap scalein "style={{ top: '0', right: '100%', marginRight: '10px' }}>
                         {props.gifts.map((element, index) => (
                            <li key={index}>{element.name}
                               <img className=" sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`images/${element.picture}`} alt={element.name} />
                            </li>
                        ))}
                   
                </div>
            ) : null}
        </div>
    )
}
        