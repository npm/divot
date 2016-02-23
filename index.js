#!/usr/bin/env node

var
	assert  = require('assert'),
	chalk   = require('chalk'),
	exec    = require('child_process').exec,
	tracker = require('pivotaltracker')
	;

function fetchUnfinishedStories(callback)
{
	// TODO this will get voluminous eventually. Does the client offer a way to filter?
	client.project(project).stories.all(function(err, stories)
	{
		if (err)
		{
			console.error(chalk.red(err.message));
			process.exit(1);
		}

		var result = [];
		stories.forEach(function(story)
		{
			if (story.currentState === 'finished')
				result.push(story);
		});
		callback(result);
	});
}

function isMentioned(id, callback)
{
	exec('git log --grep ' + id, function(err, stdout, stderr)
	{
		if (err) return callback(false);
		callback(stdout.length > 0);
	});
}

function markStoryDelivered(id)
{
	console.log('Marking story ' + chalk.yellow(id) + ' as ' + chalk.green('delivered.'));
	var comment = 'Story has been deployed to the acceptance test server; marking as delivered';

	client.project(project).story(id).comments.create(comment, function(err, comment)
	{
		if (err) console.error(chalk.red(err.message));
		client.project(project).story(id).update({currentState: 'delivered'}, function(err, story)
		{
			if (err) console.error(chalk.red(err.message));
			// console.log(story);
		});
	});
}

assert(process.env.TRACKER_TOKEN, 'You must put your Pivotal API token in the TRACKER_TOKEN env var');
var client = new tracker.Client(process.env.TRACKER_TOKEN);

var project = process.env.TRACKER_PROJECT;
if (!project)
	project = process.argv[2];

assert(project, 'You must set your Pivotal project ID in the TRACKER_PROJECT env var or pass it on the command line');

fetchUnfinishedStories(function(stories)
{
	stories.forEach(function(story)
	{
		isMentioned(story.id, function(mentioned)
		{
			if (mentioned)
				markStoryDelivered(story.id);
			else
				console.log('Story ' + chalk.yellow(story.id) + ' hasn\'t been delivered yet.');
		});
	});
});
