package main

import (
	"flag"
	"fmt"
	"history_api_spa/server/hotreload"
	"html/template"
	"log"
	"net/http"
	"os"
)

var page = template.Must(template.ParseFiles("template/index.html"))
var dev = flag.Bool("dev", false, "Is dev?  Is dev.")

func init() {
	flag.Parse()
	fmt.Println(*dev)
	if *dev {
		hotreload.Init("./script", "./style", "./template")
	}
}

func main() {

	// Index and static
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if *dev {
			page = template.Must(template.ParseFiles("template/index.html"))
		}
		template.Must(template.ParseFiles("template/index.html")).Execute(w, nil)
	})
	http.Handle("/document/", http.StripPrefix("/document/", http.FileServer(http.Dir("/document/"))))
	http.Handle("/script/", http.StripPrefix("/script/", http.FileServer(http.Dir("./script/"))))
	http.Handle("/style/", http.StripPrefix("/style/", http.FileServer(http.Dir("./style/"))))
	http.Handle("/template/", http.StripPrefix("/template/", http.FileServer(http.Dir("./template/"))))

	// Reload
	if *dev {
		http.HandleFunc("/hotreload", hotreload.WebSocket)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	fmt.Println("On port " + port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
