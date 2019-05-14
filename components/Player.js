

import styled from 'styled-components'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const StyledPlayer = styled.div`
  .player-card {
    width: 350px;
    height: 125px;
    border: 1px solid #333;
    padding: 1rem;
    display: flex
    justify-content: center;
    flex-direction: column;
    .player-header {
      display: flex;
      .player-image{
        margin: 0 .5rem;
        .img-thumb {
          border-radius: 100%;
        }
      }
      .card-title {
        h2 {
          margin: 5px 0;
        }
        p {
          margin: .5em
        }
      }
    }

  .player-info {
    width:100%;
  }
}
`;

const Player = props => (
  <Link as={`/player/${props.playerId}`} href={`/player?id=${props.playerId}`} >
  <a>
    <StyledPlayer>
      <div className="player-card">
        <div className="player-header">
          <div className="player-image">
            <img src="https://place-hold.it/100" className="img-thumb"></img>
          </div>
          <div className="card-title">
            <h2>{props.playerName}</h2>
            <p>#{props.playerNumber}</p>
            <p>Position: {props.playerPosition}</p>
          </div>
        </div>

        <div className="player-info">
            {props.playerId}

        </div>
      </div>
    </StyledPlayer>
    </a>
  </Link>
);

Player.getInitialProps = async (context) => {
  const { id } = context.query
  const res = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${id}`)
  const player = await res.json()

  console.log(player)
  return { player }
}

export default Player;
