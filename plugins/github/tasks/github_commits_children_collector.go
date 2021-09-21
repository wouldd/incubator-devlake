package tasks

import (
	"github.com/merico-dev/lake/logger"
	lakeModels "github.com/merico-dev/lake/models"
	"github.com/merico-dev/lake/plugins/github/models"
	"github.com/merico-dev/lake/utils"
)

func CollectChildrenOnCommits(owner string, repositoryName string, repositoryId int) {
	var commits []models.GithubCommit
	lakeModels.Db.Find(&commits)

	maxWorkersPerSecond := 5 // Needs work - this is a temporary value
	scheduler, err := utils.NewWorkerScheduler(50, maxWorkersPerSecond)
	if err != nil {
		logger.Error("Could not create work scheduler for GitHub Pull Requests", err)
	}

	for i := 0; i < len(commits); i++ {
		commit := (commits)[i]
		err := scheduler.Submit(func() error {

			// This call is to update the details of the individual pull request with additions / deletions / etc.
			commitErr := CollectCommit(owner, repositoryName, repositoryId, &commit)
			if commitErr != nil {
				logger.Error("Could not collect Commits to update details", commitErr)
				return commitErr
			}

			return nil
		})
		if err != nil {
			logger.Error("INFO >>> Scheduler error: ", err)
			return
		}
	}

	scheduler.WaitUntilFinish()
}
