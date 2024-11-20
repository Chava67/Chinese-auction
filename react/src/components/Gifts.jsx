
import React, { useState, useEffect } from 'react';
import { add, get } from "../axios/httpRequest"

//import { giftService } from './service/giftService';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import Bar from './Bar';
const Gift = (props) => {
    const [gifts, setGifts] = useState([]);
    const [layout, setLayout] = useState('grid');
    //const [count, setCount] = useState(1);
    const [giftQuantities, setGiftQuantities] = useState({});
    const [winners,setWinners]=useState({});
    const[sortCategory,setSortCategory]=useState(false)
    const [sortPrice,setSortPrice]=useState(false)
    const navigate=useNavigate()
    const serverUrl = 'http://localhost:5281';

    const handleQuantityChange = (giftId, value) => {
        setGiftQuantities({ ...giftQuantities, [giftId]: value });
    };
    const getAll = async () => {
        const w=await get("/api/Raffle")
        if(w!=null){
            w.forEach((win)=>{
            setWinners((prev) => ({ ...prev, [win.giftId]: win.user.firstName }));
            })
        }
        const a = await get("/api/Gift")
        setGifts(a)
    }
    useEffect(() => {
        getAll()
    }, []);
  
    const addToCart =async (gift) => {
        const token=localStorage.getItem('token')
        if(token==null){
             navigate('/login')
        }
        else{
            const quantity = giftQuantities[gift.id] || 1;
        await add(`/api/Cart/${gift.id}/${quantity}`)
        props.updateBadgeCount() 
        }
       
    };
const sortByPrice=async()=>{
    if(!sortPrice){
      const a=await get('api/Gift/SortByPrice')
    setGifts(a) 
    setSortPrice(true) 
    }
    else{
        setSortPrice(false) 
        getAll()
    }
    
}
const sortByCategory=async()=>{
    if(!sortCategory){
    const a=await get('api/Gift/SortBycategory')
    setGifts(a) 
    setSortCategory(true) 

    }
    else{
        setSortCategory(false)
        getAll()
    }
    
}
    const gridItem = (gift) => {
        return (
            <div  style={{ width: '33.3%'}}className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={gift.id}>
                <div style={{ height: '350px' }}className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{gift.category.name}</span>
                        </div>
                    
                    </div>
                    <div   className="flex flex-column align-items-center gap-3 py-5">
                       <img  style={{ width: '50%',height:'50%'}} className="  shadow-2 block xl:block  border-round" src={`${serverUrl}/api/File/get/${gift.picture}`} shape="circle" alt={gift.name} />
                        {/* <img className="w-9 shadow-2 border-round" src={`images/${gift.picture}`}alt={gift.name} /> */}
                        <div className="text-2xl font-bold">{gift.name}</div>
                    </div>
                    <div >                        
                        <span className="text-2xl font-semibold">${gift.price}</span>
                       
                        {winners[gift.id]==null?<InputText min={1}   value={giftQuantities[gift.id] || ''} onChange={(e) => handleQuantityChange(gift.id, e.target.value)} type='number' placeholder="1" style={{width:"70px",marginLeft:"250px"}}></InputText>:<></>}
                        
                        {winners[gift.id]==null?<Button  icon="pi pi-shopping-cart" className="p-button-rounded" disabled={gift.inventoryStatus === 'OUTOFSTOCK'}style={{marginLeft:"10px"}} onClick={()=>{addToCart(gift)}}></Button>:<span style={{height:"70px"}}>{`There was already the lottery, ${winners[gift.id]} won`}</span>}
                    </div>
                  
                </div>
            </div>
        );
    };

    const itemTemplate = (gift, layout, index) => {
        if (!gift) {
            return;
        }

        //if (layout === 'list') return listItem(gift, index);
        else if (layout === 'grid') return gridItem(gift);
    };

    const listTemplate = (gifts, layout) => {
        return <div className="grid grid-nogutter">{gifts.map((gift, index) => itemTemplate(gift, layout, index))}</div>;
    };


    const header = () => {
        return (
            <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4')}>
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-2 gap-4">
                <Button icon="pi pi-sort-amount-down" onClick={sortByCategory}>Category</Button>
                <Button icon="pi pi-sort-amount-down" className="ml-2" onClick={sortByPrice}>Price</Button>
                </div >
                {/* <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"> <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} /></div> */}
          </div>
        );
    };

    return (
        <>
        <div className="card" >
        <DataView  className="custom-dataview" value={gifts} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
        </>
    )
}
export default Gift       
