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
	fmt.Println("WS connected.")

	after := func() {
		conn.Close()
		fmt.Println("Connection has closed all the way.")
	}
	defer after()

	var disconnected bool

	go (func() {
		if _, _, err := conn.ReadMessage(); err != nil {
			if !disconnected {
				sendReload <- "discard"
			}
			fmt.Println("Disconnected.")
		}
	})()

	msg := <-sendReload
	if msg != "discard" {
		if err := conn.WriteJSON(struct{ Message string }{Message: msg}); err != nil {
			fmt.Println(err)
		}
	}
	disconnected = true
	fmt.Println("Connection closing.")
}
