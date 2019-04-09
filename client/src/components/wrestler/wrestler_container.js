import { connect } from 'react-redux';

import Wrestler from './wrestler';
import { getWrestler } from '../../actions/wrestler_actions'

const mSP = (state, ownProps) => ({
  wrestler: state.entities.wrestlers[ownProps.match.params.id]
});

const mDP = dispatch => ({
  getWrestler: id => dispatch(getWrestler(id))
})
export default connect(mSP, mDP)(Wrestler);