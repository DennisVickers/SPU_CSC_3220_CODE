import { useState, useCallback, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, Button } from "react-native";

import TaskItem from "./components/TaskItem";
import TaskInput from "./components/TaskInput";
import useDBClient from "./components/sqlClient";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const dbClient = useDBClient();

  const initialLoad = useCallback(async () => {
    await dbClient.loadData();
    setLoaded(true);
  }, [dbClient]);

  useEffect(() => {initialLoad()},[]);

  function startAddTaskHandler() {
    setModalIsVisible(true);
  }

  function endAddTaskHandler() {
    setModalIsVisible(false);
  }

  async function addTaskHandler(enteredTaskText) {
    try {
      await dbClient.addTask(enteredTaskText);
    } catch (e) { 
      console.log(e);
    }
    endAddTaskHandler();
  }

  async function deleteTaskHandler(id) {
    try {
      await dbClient.deleteTask(id);
    } catch {}
    endAddTaskHandler();
  }

  if (!isLoaded) {
    return (
      <View style={styles.appContainer}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add New Task"
        color="darkblue"
        onPress={startAddTaskHandler}
      />
      <TaskInput
        visible={modalIsVisible}
        onAddTask={addTaskHandler}
        onCancel={endAddTaskHandler}
      />
      <View style={styles.tasksContainer}>
        <FlatList
          data={dbClient.taskList}
          renderItem={(itemData) => {
            return (
              <TaskItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteTaskHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 75,
    paddingHorizontal: 16,
    backgroundColor: "lightblue",
  },
  tasksContainer: {
    flex: 5,
  },
});
