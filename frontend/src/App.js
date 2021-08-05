import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import clienteAxios from './config/axios';

//Componentes
import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';

function App() {
  
  //State de la app
  const [citas, guardarCitas] = useState([]);
  const [consultar, guardarConsultar] = useState(true);

  useEffect(() => {
    if (consultar) {
      const consultarApi = ()=>{
        clienteAxios.get('/pacientes')
          .then(res =>{
            //colocar el result6ado en el state
            guardarCitas(res.data)

            //deshabilitar la consulta 
            guardarConsultar(false)
          })
          .catch(err =>{
            console.log(err);
          })
      }
      consultarApi();
    }
    
  },[consultar])
  return (
    <Router>
      <Switch>
        <Route
          exact 
          path="/" 
          component={()=> <Pacientes 
                            citas={citas} />}
        />

        <Route
          exact 
          path="/nueva" 
          component={() => <NuevaCita 
                            guardarConsultar={guardarConsultar} />}
        />

        <Route
          exact 
          path="/cita/:id" 
          render={(props)=>{
            const cita = citas.filter(cita => cita._id === props.match.params.id)

            return (
              <Cita 
                cita={cita[0]}
                guardarConsultar={guardarConsultar}
              />
            )
          }}
        />
      </Switch>
    </Router>
    );
}

export default App;
