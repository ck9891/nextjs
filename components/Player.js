

import styled from 'styled-components'

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


      </div>
    </div>
  </StyledPlayer>
);

export default Player;
