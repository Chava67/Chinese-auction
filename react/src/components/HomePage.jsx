import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Menubar } from 'primereact/menubar';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        props.updateQuantity()
    }, []);
    const gifts = [
        { name: 'Tesla', image: '1.avif' },
        { name: 'Vacation', image: '2.png' },
        { name: '200,000$', image: '3.png' },
        { name: 'Piano', image: '4.png' }

    ];
    const giftTemplate = (gift) => {
        return (
            <div className="p-grid p-dir-col p-align-center">
                <img src={gift.image} alt={gift.name} style={{ width: '150px', height: '150px' }} />
                <h3>{gift.name}</h3>
            </div>
        );
    };

    return (
        <div>
            <div className="p-grid p-justify-center p-mt-5">
                <div className="p-col-12 p-md-8">
                    <Card title="Welcome to Our Gift Lottery!" className="p-shadow-6 p-text-center">
                        <p>
                            Join us for the grand gift lottery! Click the button below to participate in the draw.
                            Each participant has a chance to win amazing gifts. The draw is held every week, so don't miss out!
                        </p>
                        <Button label="Join Now" icon="pi pi-check" className="p-mt-3" />
                    </Card>
                </div>
            </div>
            <div className="p-grid p-justify-center p-mt-5">
                <div className="p-col-12 p-md-8">
                    <Card title="Popular Gifts" className="p-shadow-6 p-text-center">
                        <p>
                            Take a look at some of the popular gifts our participants have won in the past. These gifts are
                            handpicked to bring joy and excitement to our winners. Will you be the next lucky winner?
                        </p>
                        <Carousel value={gifts} itemTemplate={giftTemplate} numVisible={3} numScroll={1} />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HomePage;