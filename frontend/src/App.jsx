import { BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import SendMoney from './SendMoney';


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/sign-in' Component={SignIn}/>
          <Route path='/sign-up' Component={SignUp}/>
          <Route path='/dashboard' Component={Dashboard}/>
          <Route path='/send' Component={SendMoney}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
