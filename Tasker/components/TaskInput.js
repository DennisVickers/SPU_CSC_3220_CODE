import {useState} from "react";
import {
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Modal, 
  Image
} from "react-native";

function TaskInput(props) {
  const [enteredTaskText, setEnteredTaskText] = useState("");
  
  function taskInputHandler(enteredText) {
    setEnteredTaskText(enteredText);
  }

  function addTaskHandler() {
    props.onAddTask(enteredTaskText);
    setEnteredTaskText("");
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image 
          style={styles.image}
          source={require("../assets/images/goal.png")} 
        />
        <TextInput 
          style={styles.textInput} 
          placeholder="Next Task" 
          onChangeText = {taskInputHandler}
          value={enteredTaskText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Task" onPress={addTaskHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  )
};

export default TaskInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "lightblue",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    color: "#120438",
    backgroundColor: "lightyellow",
    borderWidth: 1,
    borderColor: "lightyellow",
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    margin: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  }
});
