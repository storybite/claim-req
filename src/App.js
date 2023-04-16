import logo from './logo.svg';
import './App.css';
import AccidentRadio from './components/AccidentRadio';
import DsasName from './components/DsasName';
import Label from './components/UI/Label';
import KCD from './components/KCD';
import AccidentDate from './components/AccidentDate';
import DmndResnContainer from './components/DmndResn/DmnsResnContainer';
import Hospital from './components/Hospital';

function App() {
  return (
      <form>
        <AccidentRadio/>
        <hr/>
        <div>
          <AccidentDate/>        
          <DsasName/>
          <Label>질병코드</Label>
          <KCD/><KCD/><KCD/><KCD/>
        </div>
        <hr/>
        <DmndResnContainer/>
        <Hospital/>
      </form>
  );
}

export default App;
