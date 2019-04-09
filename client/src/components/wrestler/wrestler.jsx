import React from 'react';
import { Link } from 'react-router-dom'
// import './wrestler.css'

class Wrestler extends React.Component {
  componentDidMount() {
    console.log(this.props.wrestler)
    if(!this.props.wrestler){
      this.props.getWrestler(this.props.match.params.id)
    }
  }
  renderWrestler() {
    const { wrestler } = this.props;
    console.log(this.props.wrestler)
    if (wrestler) {
      const { rank, stable, dob, height, image, name, pob, ringName, weight} = wrestler;
      return (
          <section>
            <div>
              <img src={image.data} alt={name}/>
            </div>
            <div>
            <h2>{name}</h2>
            <ul>
              <li>{`Ring Name: ${ringName}`}</li>
              <li>{`Stable: ${stable}`}</li>
              <li>{`Rank: ${rank}`}</li>
              <li>{`Height: ${height}`}</li>
              <li>{`Weight: ${weight}`}</li>
              <li>{`Date of Birth: ${dob}`}</li>
              <li>{`Place of Birth: ${pob}`}</li>
            </ul>
            </div>
          </section>
      );
    } else {
      return (
          <h2>Loading</h2>
      );
    }
  }

  render() {
      return (
        <div>
          {this.renderWrestler()}
        </div>
      );
  }
}

export default Wrestler;