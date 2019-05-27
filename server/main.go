package main

import (
	"html/template"
	"net/http"
)

var page = template.Must(template.ParseFiles("./template/index.html"))

func main() {

	// Index and static
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		page.Execute(w, nil)
	})
	http.Handle("/document/", http.StripPrefix("/document/", http.FileServer(http.Dir("/document/"))))
	http.Handle("/script/", http.StripPrefix("/script/", http.FileServer(http.Dir("./script/"))))
	http.Handle("/style/", http.StripPrefix("/style/", http.FileServer(http.Dir("./style/"))))
	http.Handle("/template/", http.StripPrefix("/template/", http.FileServer(http.Dir("./template/"))))

	http.ListenAndServe(":3000", nil)
}
