import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';

function Bar(props) {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/login');
    };

    const handleSignOut = () => {
        // ניקוי הלוקל סטורג' מהטוקן ושם המשתמש
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        // מעבר לדף ההתנתקות
        navigate('/login');
    };

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link" onClick={item.command}>
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
        </a>
    );

    const isAdmin = localStorage.getItem('role') === 'MANAGER'; // בדיקה אם המשתמש הוא מנהל

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'Gifts',
            icon: 'pi pi-star',
            command: () => navigate('/gifts'),
        },
        {
            label: 'Donors',
            icon: 'pi pi-users',
            command: () => navigate('/donors'),
            visible: isAdmin // רק מנהלים יראו את האפשרות לניהול מתנות
        },
        {
            label: 'Purchasers',
            icon: 'pi pi-shopping-cart',
            command: () => navigate('/purchasingManagement'),
            visible: isAdmin // רק מנהלים יראו את האפשרות לניהול רכש
        },
        {
            label: 'Gift Management',
            icon: 'pi pi-gift',
            command: () => navigate('/giftManagement'),
            visible: isAdmin // רק מנהלים יראו את האפשרות לניהול מתנות
        },
        {
            label: 'Sign In',
            icon: 'pi pi-sign-in',
            className: 'ml-auto',
            command: handleSignIn,
            visible: !localStorage.getItem('token') // רק אם אין טוקן בלוקל סטורג'
        },
        {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            className: 'ml-auto',
            command: handleSignOut,
            visible: !!localStorage.getItem('token') // רק אם יש טוקן בלוקל סטורג'
        }
    ];

    const start = <img alt="logo" src="shira.jpg" height="40" className="mr-2" />;

    const end = (
        <div className="flex align-items-center gap-2">
            <a className="flex align-items-center p-menuitem-link mr-5" onClick={() => navigate('/cart')}>
                <i className="pi pi-shopping-cart" style={{ fontSize: '1.5rem' }}></i>
                {props.badge && <Badge value={props.badge} className="ml-2" />}
            </a>
            <span className="w-8rem sm:w-auto">{localStorage.getItem('username')} </span>  
            <Avatar label={localStorage.getItem('username') ? localStorage.getItem('username').charAt(0) : ""} style={{backgroundColor:"#54b5a6"}} shape="circle" />
            
        </div>
    );

    return (
        <div style={{ width: '100%', height: '100px' }}>
            <Menubar model={items} start={start} end={end} style={{ border: "0px" }} />
        </div>
    );
}

export default Bar;
