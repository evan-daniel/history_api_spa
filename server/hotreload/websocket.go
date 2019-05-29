package hotreload

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{ReadBufferSize: 1024, WriteBufferSize: 1024}

func WebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
	}
	defer conn.Close()

	for {
		msg := <-sendReload
		if err := conn.WriteJSON(struct{ Message string }{Message: msg}); err != nil {
			fmt.Println(err)
		}
	}

}
