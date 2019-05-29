package hotreload

import (
	"fmt"
	"io/ioutil"
	"time"
)

var sendReload = make(chan string)

func Init(path ...string) {

	var watchedFiles []string
	for _, p := range path {
		findFiles(&watchedFiles, p)
	}

	sleepTime := 1000 * time.Millisecond
	for _, wf := range watchedFiles {
		go watchFile(wf, sleepTime)
	}

	go func() {
		for {
			var newWatchedFiles []string
			for _, p := range path {
				findFiles(&newWatchedFiles, p)
			}

			for _, nwf := range newWatchedFiles {
				found := false
				for _, wf := range watchedFiles {
					if nwf == wf {
						found = true
					}
				}
				if !found {
					fmt.Println(nwf)
					go watchFile(nwf, sleepTime)
					watchedFiles = append(watchedFiles, nwf)
				}
			}

			time.Sleep(sleepTime * 5)
		}
	}()
}

func findFiles(fileList *[]string, directory string) {
	files, err := ioutil.ReadDir(directory)
	if err != nil {
		fmt.Println(err)
	}

	for _, f := range files {
		filePath := directory + "/" + f.Name()
		if f.IsDir() {
			findFiles(fileList, filePath)
			continue
		}
		*fileList = append(*fileList, filePath)
	}
}
