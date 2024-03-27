import React, { useState } from 'react';
import './styles.css'; // Asegúrate de tener un archivo CSS con las clases 'container' y 'active'

const App = () => {
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={`container ${isActive ? 'active' : ''}`} onClick={handleToggle}>
            <div className={`body ${isActive ? 'active' : ''}`}>
                {/* Contenido del cuerpo */}
            </div>
        </div>
    );
};

export default App;
