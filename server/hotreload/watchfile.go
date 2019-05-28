package hotreload

import (
	"fmt"
	"os"
	"time"
)

func watchFile(filePath string) error {
	initialStat, err := os.Stat(filePath)
	if err != nil {
		return err
	}

	for {
		stat, err := os.Stat(filePath)
		if err != nil {
			return err
		}
		if stat.ModTime() != initialStat.ModTime() {
			break
		}
		time.Sleep(200 * time.Millisecond)
	}

	fmt.Println("File changed.")
	return nil
}
