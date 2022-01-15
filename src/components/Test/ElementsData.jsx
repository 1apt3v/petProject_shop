import React from 'react';

const ElementsData = ({ el }) => {
    return (
        <div style={{ width: "400px", height: "350px", border: "1px solid black" }}>
            {`${el.id} - ${el.name} - ${el.price}`}
        </div>
    );
};

export default ElementsData;