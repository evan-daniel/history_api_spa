package main

import (
	"history_api_spa/server/hotreload"
	"html/template"
	"net/http"
)

var page = template.Must(template.ParseFiles("template/index.html"))

func init() {
	hotreload.Init("./script", "./style")
}

func main() {

	// Print files in current directory
	// files, err := ioutil.ReadDir("./")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// for _, f := range files {
	// 	fmt.Println(f.Name())
	// }

	// Index and static
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		page.Execute(w, nil)
	})
	http.Handle("/document/", http.StripPrefix("/document/", http.FileServer(http.Dir("/document/"))))
	http.Handle("/script/", http.StripPrefix("/script/", http.FileServer(http.Dir("./script/"))))
	http.Handle("/style/", http.StripPrefix("/style/", http.FileServer(http.Dir("./style/"))))
	http.Handle("/template/", http.StripPrefix("/template/", http.FileServer(http.Dir("./template/"))))

	// Reload
	http.HandleFunc("/hotreload", hotreload.WebSocket)

	http.ListenAndServe(":3000", nil)
}
