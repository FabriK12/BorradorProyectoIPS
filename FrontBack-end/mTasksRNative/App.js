import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
//import BottomNavigation, {FullTab} from 'react-native-material-bottom-navigation';
import Tarea from './components/Tarea';

export default function App() {
  return (
    <ScrollView>
      <View style={styles.tareaContent}>
        <Text style={styles.tituloPrincipal}>Tareas para hoy</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>

        <View style={styles.items}>
          <Tarea text={'Avanzar Proyecto 1'} desc={'Hacer una observacion a compañero'} fec={'20/11/2022'} />
          <Tarea text={'Avanzar Proyecto 1'} desc={'Hacer una observacion a compañero'} fec={'20/11/2022'} />
          <Tarea text={'Avanzar Proyecto 1'} desc={'Hacer una observacion a compañero'} fec={'20/11/2022'} />
          <Tarea text={'Avanzar Proyecto 1'} desc={'Hacer una observacion a compañero'} fec={'20/11/2022'} />
          <Tarea text={'Avanzar Proyecto 1'} desc={'Hacer una observacion a compañero'} fec={'20/11/2022'} />
          <Tarea text={'Avanzar Proyecto 1'} desc={'Hacer una observacion a compañero'} fec={'20/11/2022'} />
        </View>
        <View style={styles.container}>
          <View style={styles.subcontainer}>

          </View>
          <TouchableOpacity style={styles.addBottom}>
            <View style={styles.addContent}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>


        <StatusBar style="auto" />
      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  tareaContent: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    paddingTop: 20,
  },

  addContent: {
    width: 60,
    height: 60,
    backgroundColor: '#fba',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subcontainer: {
    paddingHorizontal: 50,
    marginHorizontal: 50,
  },

  addText: {
    fontSize: 40,
    fontWeight: 'bold'
  }
});
