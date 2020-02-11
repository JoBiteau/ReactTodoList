import React from 'react';
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import Header from './components/header';
import TaskList from './components/task-list';
import ButtonAddTask from './components/button-add-task';
import MenuTask from './components/menu-task';
import loadash from 'lodash';
import TextPrompt from './components/text-prompt';

const storageKey = 'taskList';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: [],
            isMenuTaskVisible: false,
            currentTask: {},
            isAddPromptVisible: false,
            idGenerator: 0,
            isRenamePromptVisible: false
        };
    }
    componentDidMount() {
        AsyncStorage.getItem(storageKey).then(storedTaskList => {
            if (storedTaskList) {
                this.setState({ taskList: JSON.parse(storedTaskList) }, () => {
                    this.setState({ idGenerator: this.state.taskList[this.state.taskList.length - 1].id + 1 });
                });
            }
        });
    }
    changeStatusTask = () => {
        const taskToUpdate = this.state.currentTask;
        let newStatus = 'todo';
        switch (taskToUpdate.status) {
            case 'todo':
                newStatus = 'doing';
                break;
            case 'doing':
                newStatus = 'done';
                break;
            default:
                newStatus = 'todo';
        }
        const index = loadash.findIndex(this.state.taskList, {
            id: this.state.currentTask.id
        });
        const list = this.state.taskList;
        taskToUpdate.status = newStatus;
        list[index] = taskToUpdate;
        this.setState({ taskList: list }, () => {
            this.saveTaskList();
            this.toggleMenuTaskVisibility();
        });
    };
    displayAddPrompt = () => {
        this.setState({ isAddPromptVisible: true });
    };
    hideAddPrompt = () => {
        this.setState({ isAddPromptVisible: false });
    };
    onAddTask = value => {
        const newTask = {
            id: this.state.idGenerator,
            content: value,
            status: 'todo'
        };
        const list = this.state.taskList;
        list.push(newTask);
        this.setState({
            taskList: list,
            isAddPromptVisible: false,
            idGenerator: this.state.idGenerator + 1
        }, () => {
            this.saveTaskList();
        });
    };
    deleteTask = () => {
        const index = loadash.findIndex(this.state.taskList, {
            id: this.state.currentTask.id
        });
        const list = this.state.taskList;
        list.splice(index, 1);
        this.setState({ taskList: list }, () => {
            this.saveTaskList();
            this.toggleMenuTaskVisibility();
        });
    };
    toggleMenuTaskVisibility = task => {
        if (task === undefined) {
            // on a refermé la modal en tapant dans la zone vide
            this.setState({ currentTask: {} });
        } else {
            // on a tapé sur supprimer ou changer status
            this.setState({ currentTask: task });
        }
        this.setState({ isMenuTaskVisible: !this.state.isMenuTaskVisible });
    };
    displayRenameTask = (task) => {
        this.setState({ currentTask: task, isRenamePromptVisible: true })
    };
    hideRenamePrompt = () => {
        this.setState({ isRenamePromptVisible: false });
    };
    renameTask = (taskContent) => {
        const updatedTask = this.state.currentTask;
        updatedTask.content = taskContent;
        const index = loadash.findIndex(this.state.taskList, {
            id: this.state.currentTask.id
        });
        const list = this.state.taskList;
        list[index] = updatedTask;
        this.setState({ taskList: list }, () => {
            this.hideRenamePrompt();
            this.saveTaskList();
        });
    };
    renderTaskList = () => {
        if (this.state.taskList.length > 0) {
            return (
                <TaskList
                    taskList={this.state.taskList}
                    onPressCallback={this.toggleMenuTaskVisibility}
                    onLongPressCallback={this.displayRenameTask}
                />
            );
        }
        return <View style={{ marginTop: 20, alignItems: 'center' }}><Text>Cliquer sur le bouton Ajouter</Text></View>;
    };
    saveTaskList = () => {
        AsyncStorage.setItem(storageKey, JSON.stringify(this.state.taskList));
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header content="Liste des tâches" />
                <ScrollView>
                    {this.renderTaskList()}
                </ScrollView>
                <MenuTask
                    isVisible={this.state.isMenuTaskVisible}
                    onDisapearCallBack={this.toggleMenuTaskVisibility}
                    currentTask={this.state.currentTask}
                    onDeleteCallBack={this.deleteTask}
                    onStatusChangeCallBack={this.changeStatusTask}
                />
                <TextPrompt
                    isVisible={this.state.isAddPromptVisible}
                    onCancelCallback={this.hideAddPrompt}
                    onSubmitCallback={this.onAddTask}
                    title={'Ajouter une tâche'}
                    placeholder={'Indiquer le nom de la tâche'}
                />
                <TextPrompt
                    isVisible={this.state.isRenamePromptVisible}
                    onCancelCallback={this.hideRenamePrompt}
                    onSubmitCallback={this.renameTask}
                    title={'Renommer une tâche'}
                    defaultValue={this.state.currentTask.content}
                />
                <ButtonAddTask onPressCallback={this.displayAddPrompt} />
            </View>
        );
    }
}
