const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fetcher');
mongoose.connect('mongodb://localhost:27017');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected!');
});

let repoSchema = mongoose.Schema({
  userName: String,
  repoName: String,
  repoID: Number,
  url: String,
  watchers: Number,
  lastUpdated: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {

  //receive an array of objects

  for (var i=0; i<repos.length; i++) {
    // Repo.create(repos[i], function (err, small) {
    //   if (err) {
    //     return console.log(err);
    //   } else {
    //     console.log('added and saved!')
    //   }
    // })
    let repo = repos[i];
    let repoObj = {
        userName: repo.owner.login,
        repoName: repo.name,
        repoID: repo.id,
        url: repo.html_url,
        watchers: repo.watchers_count,
        lastUpdated: repo.updated_at
    }

    Repo.findOneAndUpdate({repoID: repoObj.repoID}, repoObj, {upsert: true, new: true}, function(err, repo){
      if (err) {
        return console.log(err);
      } else {
        console.log('added!', repo);
      }
    })

  }
 
  Repo.find(function (err, repos) {
    if (err) return console.error(err);
    console.log('here are all the repos!', repos);
  })

}

let getRepos = (callback) => {

  Repo.find().limit(25).sort({watchers: -1}).exec((err, repos)=> {
    if (err) {
      console.log('error in db', err);
      callback(err, null);
    } else {
      console.log('here are the top 25 repos', repos);
      callback(null, repos);
    }
  })
  

}

// getRepos();


var exampleRepo = 
{
  "id": 18221276,
  "name": "git-consortium",
  "full_name": "octocat/git-consortium",
  "owner": {
    "login": "octocat",
    "id": 583231,
    "avatar_url": "https://avatars0.githubusercontent.com/u/583231?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/octocat",
    "html_url": "https://github.com/octocat",
    "followers_url": "https://api.github.com/users/octocat/followers",
    "following_url": "https://api.github.com/users/octocat/following{/other_user}",
    "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
    "organizations_url": "https://api.github.com/users/octocat/orgs",
    "repos_url": "https://api.github.com/users/octocat/repos",
    "events_url": "https://api.github.com/users/octocat/events{/privacy}",
    "received_events_url": "https://api.github.com/users/octocat/received_events",
    "type": "User",
    "site_admin": false
  },
  "private": false,
  "html_url": "https://github.com/octocat/git-consortium",
  "description": "This repo is for demonstration purposes only.",
  "fork": false,
  "url": "https://api.github.com/repos/octocat/git-consortium",
  "forks_url": "https://api.github.com/repos/octocat/git-consortium/forks",
  "keys_url": "https://api.github.com/repos/octocat/git-consortium/keys{/key_id}",
  "collaborators_url": "https://api.github.com/repos/octocat/git-consortium/collaborators{/collaborator}",
  "teams_url": "https://api.github.com/repos/octocat/git-consortium/teams",
  "hooks_url": "https://api.github.com/repos/octocat/git-consortium/hooks",
  "issue_events_url": "https://api.github.com/repos/octocat/git-consortium/issues/events{/number}",
  "events_url": "https://api.github.com/repos/octocat/git-consortium/events",
  "assignees_url": "https://api.github.com/repos/octocat/git-consortium/assignees{/user}",
  "branches_url": "https://api.github.com/repos/octocat/git-consortium/branches{/branch}",
  "tags_url": "https://api.github.com/repos/octocat/git-consortium/tags",
  "blobs_url": "https://api.github.com/repos/octocat/git-consortium/git/blobs{/sha}",
  "git_tags_url": "https://api.github.com/repos/octocat/git-consortium/git/tags{/sha}",
  "git_refs_url": "https://api.github.com/repos/octocat/git-consortium/git/refs{/sha}",
  "trees_url": "https://api.github.com/repos/octocat/git-consortium/git/trees{/sha}",
  "statuses_url": "https://api.github.com/repos/octocat/git-consortium/statuses/{sha}",
  "languages_url": "https://api.github.com/repos/octocat/git-consortium/languages",
  "stargazers_url": "https://api.github.com/repos/octocat/git-consortium/stargazers",
  "contributors_url": "https://api.github.com/repos/octocat/git-consortium/contributors",
  "subscribers_url": "https://api.github.com/repos/octocat/git-consortium/subscribers",
  "subscription_url": "https://api.github.com/repos/octocat/git-consortium/subscription",
  "commits_url": "https://api.github.com/repos/octocat/git-consortium/commits{/sha}",
  "git_commits_url": "https://api.github.com/repos/octocat/git-consortium/git/commits{/sha}",
  "comments_url": "https://api.github.com/repos/octocat/git-consortium/comments{/number}",
  "issue_comment_url": "https://api.github.com/repos/octocat/git-consortium/issues/comments{/number}",
  "contents_url": "https://api.github.com/repos/octocat/git-consortium/contents/{+path}",
  "compare_url": "https://api.github.com/repos/octocat/git-consortium/compare/{base}...{head}",
  "merges_url": "https://api.github.com/repos/octocat/git-consortium/merges",
  "archive_url": "https://api.github.com/repos/octocat/git-consortium/{archive_format}{/ref}",
  "downloads_url": "https://api.github.com/repos/octocat/git-consortium/downloads",
  "issues_url": "https://api.github.com/repos/octocat/git-consortium/issues{/number}",
  "pulls_url": "https://api.github.com/repos/octocat/git-consortium/pulls{/number}",
  "milestones_url": "https://api.github.com/repos/octocat/git-consortium/milestones{/number}",
  "notifications_url": "https://api.github.com/repos/octocat/git-consortium/notifications{?since,all,participating}",
  "labels_url": "https://api.github.com/repos/octocat/git-consortium/labels{/name}",
  "releases_url": "https://api.github.com/repos/octocat/git-consortium/releases{/id}",
  "deployments_url": "https://api.github.com/repos/octocat/git-consortium/deployments",
  "created_at": "2014-03-28T17:55:38Z",
  "updated_at": "2016-12-06T13:06:37Z",
  "pushed_at": "2016-10-30T13:43:30Z",
  "git_url": "git://github.com/octocat/git-consortium.git",
  "ssh_url": "git@github.com:octocat/git-consortium.git",
  "clone_url": "https://github.com/octocat/git-consortium.git",
  "svn_url": "https://github.com/octocat/git-consortium",
  "homepage": null,
  "size": 190,
  "stargazers_count": 7,
  "watchers_count": 7,
  "language": null,
  "has_issues": true,
  "has_downloads": true,
  "has_wiki": true,
  "has_pages": false,
  "forks_count": 24,
  "mirror_url": null,
  "open_issues_count": 4,
  "forks": 24,
  "open_issues": 4,
  "watchers": 7,
  "default_branch": "master"
}

// Repo.remove({ }, function (err) {
//   if (err) return console.log(err);
//   // removed!
// });

// save([{
//   userName: exampleRepo.owner.login,
//   repoName: 'this is updated!!',
//   repoID: exampleRepo.id,
//   url: exampleRepo.html_url,
//   watchers: exampleRepo.watchers_count,
//   lastUpdated: exampleRepo.updated_at
// }, {
//   userName: 'jennqiao',
//   repoName: 'new one',
//   repoID: 8493,
//   url: exampleRepo.html_url,
//   watchers: exampleRepo.watchers_count,
//   lastUpdated: exampleRepo.updated_at
// }])



module.exports.save = save;
module.exports.getRepos = getRepos;