import React from 'react';

const RepoRow = ({repo}) => {

    return (
  
      <tr>
        <td><a href={repo.url}>{repo.repoName}</a></td>
        <td>{repo.userName}</td>
        <td>{repo.watchers}</td>
      </tr>
  
  
    )
  
  
};

export default RepoRow;