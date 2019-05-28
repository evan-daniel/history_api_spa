package hotreload

import (
	"context"
	"errors"
	"fmt"
	"io/ioutil"
	"log"

	"golang.org/x/sync/errgroup"
)

func Init(path ...string) {

	var watchedFiles []string
	for _, p := range path {
		findFiles(&watchedFiles, p)
	}
	fmt.Println(watchedFiles)

	errs, _ := errgroup.WithContext(context.Background())
	for i := 0; i < len(watchedFiles); i++ {
		errs.Go(func() error {
			fmt.Println(watchedFiles[0])
			watchFile(watchedFiles[i])
			return errors.New("This is a textual error.")
		})
	}

	errs.Wait()
	fmt.Println("Done.")

}

func findFiles(fileList *[]string, directory string) {
	files, err := ioutil.ReadDir(directory)
	if err != nil {
		log.Fatal(err)
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
