const websocket = new WebSocket('ws:localhost:3000/hotreload'); 

websocket.addEventListener('message', websocketMessage => {
    const msg = JSON.parse(websocketMessage.data); 
    
    if(msg.Message === 'Please consider reloading.') {
        location.reload(true); 
    }

    // Test. 
    // Test. 
}); 