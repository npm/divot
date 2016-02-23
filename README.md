# divot

Pivotal Tracker integration for a deployment script. pivot + deploy = divot, get it?

## Usage

`npm install -g @npmcorp/divot`

Set the following environment variable:

* `TRACKER_TOKEN`: your Tracker API token
* `TRACKER_PROJECT`: your Tracker project ID (optional)

`cd` to your deployment directory, with git information.

run `divot <tracker-project-id>` Or set the env var and run it with no arguments: `divot`.
