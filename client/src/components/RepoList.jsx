import React from 'react';
import RepoRow from './RepoRow.jsx';

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

