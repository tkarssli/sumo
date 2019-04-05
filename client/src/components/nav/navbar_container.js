import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import NavBar from './navbar';

const mSP = state => ({

});

export default connect(mSP, { logout })(NavBar);