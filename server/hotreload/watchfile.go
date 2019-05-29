package hotreload

import (
	"fmt"
	"os"
	"time"
)

func watchFile(filePath string, sleepTime time.Duration) error {
	initialStat, err := os.Stat(filePath)
	if err != nil {
		return err
	}

	for {
		stat, err := os.Stat(filePath)
		if err != nil {
			fmt.Println(err)
			return err
		}
		if initialStat.ModTime().Before(stat.ModTime()) {
			fmt.Println("File changed.")
			sendReload <- "Please consider reloading."
			initialStat, err = os.Stat(filePath)
			if err != nil {
				fmt.Println(err)
				return err
			}
		}
		time.Sleep(sleepTime)
	}
}
