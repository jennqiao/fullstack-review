import React from 'react';

const RepoList = ({repos}) => (
  <div>
    <h4> Repo List </h4>
    Here are the most watched repos.
    <table>
      <tbody>
      <tr>
        <th>Repo Name</th>
        <th>Username</th>
        <th>Watch Count</th>
      </tr>
    {
      repos.map((repo)=> {
        return <RepoRow key={repo._id} repo={repo}/> 
      })
    }
      </tbody>
    </table>
  </div>
)

export default RepoList;

const RepoRow = ({repo}) => {

  return (

    <tr>
      <td><a href={repo.url}>{repo.repoName}</a></td>
      <td>{repo.userName}</td>
      <td>{repo.watchers}</td>
    </tr>


  )


}