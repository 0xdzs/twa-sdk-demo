import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import './App.css';
import CustomPopup from './components/CustomPopup';

function App() {
    const [colorScheme, setColorScheme] = useState(WebApp.colorScheme);
    const [viewportHeight, setViewportHeight] = useState(WebApp.viewportHeight);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        // Initialize the web app
        WebApp.ready();

        // Store the event handlers in variables so we can reference them in cleanup
        const themeChangeHandler = () => {
            setColorScheme(WebApp.colorScheme);
        };

        const viewportChangeHandler = () => {
            setViewportHeight(WebApp.viewportHeight);
        };

        // Add event listeners
        WebApp.onEvent('themeChanged', themeChangeHandler);
        WebApp.onEvent('viewportChanged', viewportChangeHandler);

        // Setup MainButton
        WebApp.MainButton.setText('Click Me!');
        WebApp.MainButton.onClick(() => {
            WebApp.showAlert('Main button clicked!');
        });

        // Setup BackButton
        WebApp.BackButton.onClick(() => {
            WebApp.showAlert('Back button clicked!');
        });

        return () => {
            // Cleanup event listeners with both event name and handler
            WebApp.offEvent('themeChanged', themeChangeHandler);
            WebApp.offEvent('viewportChanged', viewportChangeHandler);
        };
    }, []);

    const handleShowPopup = () => {
        setIsPopupVisible(true);
    };

    const handlePopupOk = () => {
        console.log('OK clicked');
        setIsPopupVisible(false);
    };

    const handlePopupCancel = () => {
        console.log('Cancel clicked');
        setIsPopupVisible(false);
    };

    const handleRequestContact = () => {
        try {
            WebApp.requestContact((success) => {
                if (success) {
                    WebApp.showAlert('Contact shared successfully!');
                } else {
                    WebApp.showAlert('Contact sharing was cancelled');
                }
            });
        } catch (error) {
            console.error('Contact request error:', error);
            window.alert('Contact request feature is not available on this platform.');
        }
    };

    return (
        <div className="App" style={{ height: viewportHeight }}>
            <header className={`App-header ${colorScheme}`}>
                <h1>Telegram Web App Demo</h1>
                <p>Color Scheme: {colorScheme}</p>
                <p>Viewport Height: {viewportHeight}px</p>

                <div className="button-container">
                    <button onClick={() => WebApp.MainButton.show()}>
                        Show Main Button
                    </button>
                    <button onClick={() => WebApp.MainButton.hide()}>
                        Hide Main Button
                    </button>
                    <button onClick={() => WebApp.BackButton.show()}>
                        Show Back Button
                    </button>
                    <button onClick={() => WebApp.BackButton.hide()}>
                        Hide Back Button
                    </button>
                    <button onClick={handleShowPopup}>
                        Show Popup
                    </button>
                    <button onClick={handleRequestContact}>
                        Request Contact
                    </button>
                </div>
            </header>
            <CustomPopup
                title="Demo Popup"
                message="This is a demo popup with custom buttons"
                onOk={handlePopupOk}
                onCancel={handlePopupCancel}
                isVisible={isPopupVisible}
            />
        </div>
    );
}

export default App; 