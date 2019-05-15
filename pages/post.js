import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../components/MyLayout.js'
import Player from '../components/Player.js'

const PostContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
`;

const TeamLogo = styled.div`
  .team-logo {
    display: flex;
    justify-self:center;
    max-width:200px;
  }
`;

const Post = props => (
  <Layout>
    <TeamLogo>
    <img src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${props.nhlTeam[0].id}.svg`} className="team-logo" ></img>
    </TeamLogo>
    <h1>{props.nhlTeam[0].name}</h1>

    <table>
      <thead>
        <tr>
          <th>Games Played</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Overtime</th>
          <th>Points</th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.singleSeason[0].stat.gamesPlayed}</td>
          <td>{props.singleSeason[0].stat.wins}</td>
          <td>{props.singleSeason[0].stat.losses}</td>
          <td>{props.singleSeason[0].stat.ot}</td>
          <td>{props.singleSeason[0].stat.pts}</td>
        </tr>
      </tbody>
    </table>

    <PostContainer>
        {props.teamRoster.map((player, k) => (
          <Player key={player.person.id} playerId={player.person.id} playerName={player.person.fullName} playerNumber={player.jerseyNumber} playerPosition={player.position.code} />
        ))}
    </PostContainer>
  </Layout>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${id}`)
  const team = await res.json()
  const resTeam = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`);
  const roster = await resTeam.json();
  const resStats = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${id}/stats`);
  const teamStats = await resStats.json();
  const teamRoster = roster.roster;
  const nhlTeam = team.teams;
  const singleSeason = teamStats.stats[0].splits;
  console.log(nhlTeam);
  return { nhlTeam, teamRoster, singleSeason }
}

export default Post
