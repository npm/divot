# divot

Pivotal Tracker integration for a deployment script. pivot + deploy = divot, get it?

## Usage

Set the following environment variable:

* `TRACKER_TOKEN`: your Tracker API token
* `TRACKER_PROJECT`: your Tracker project ID (optional)

`cd` to your deployment directory, with git information.

run `index.js <tracker-project-id>` (or set the env var)
