import { BrowserRouter as Router,Routes ,Route } from 'react-router-dom'

import Navbar from './Navbar';
import Welcome from './Welcome';
import Summary from './Summary';
import Monitor from './Monitor';

function App(){
    return (
        <div >
        <Router>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Welcome/>} />
                <Route exact path="/Summary" element={<Summary/>} />
                <Route exact path="/Monitor" element={<Monitor/>} />
            </Routes>
        </Router>
    </div>
    )
}

export default App;