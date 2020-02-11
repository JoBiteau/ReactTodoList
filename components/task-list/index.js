import React from 'react';
import { ListItem } from 'react-native-elements';
import { View } from 'react-native';
import TASK_STATUS from './../model';

const TaskList = ({ taskList, onPressCallback, onLongPressCallback }) => (
    <View>
        {
        taskList.map(task => (
            <ListItem 
                key={task.id} 
                title={task.content} 
                badge={{
                    value: TASK_STATUS[task.status].texte,
                    badgeStyle: { padding: 15, paddingTop: 10, backgroundColor: TASK_STATUS[task.status].bgColor }
                }}
                onPress={() => onPressCallback(task)}
                onLongPress={() => onLongPressCallback(task)}
                bottomDivider 
                chevron 
            />))
        }
    </View>
);

export default TaskList;
