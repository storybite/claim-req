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
    <>
      hello!
      <div>
        <AccidentRadio/>
        <DsasName/>
        <Label title="사고원인결과"/>
        <KCD></KCD><KCD></KCD><KCD></KCD>
        <br/>
        <AccidentDate/>        
        <DmndResnContainer/>
        <Hospital/>
      </div>
    </>
  );
}

export default App;
