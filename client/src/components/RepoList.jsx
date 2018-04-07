import React from 'react';
import RepoRow from './RepoRow.jsx';

const RepoList = ({repos}) => (
  <div>
    <table>
      <tbody>
      <tr>
        <th>REPO</th>
        <th>PLAYER</th>
        <th>POINTS</th>
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

