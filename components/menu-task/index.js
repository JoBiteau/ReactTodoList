import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { style } from './style';

const MenuTask = ({ isVisible, onDisapearCallBack, currentTask, onDeleteCallBack, onStatusChangeCallBack }) => (
    <Modal 
        onBackdropPress={() => onDisapearCallBack()}
        isVisible={isVisible}
        animationIn={'zoomInDown'}
        animationOut={'zoomOutUp'}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
    >
        <View style={style.modal}>
            <View style={style.textView}>
                <Text>ACTION</Text>
                <Text>Tâche : {currentTask.content} {currentTask.status}</Text>
            </View>
            <View style={style.buttonView}>
                <Button 
                    buttonStyle={style.buttonDelete}
                    title="Supprimer"
                    onPress={() => onDeleteCallBack()}
                />
                <Button 
                    buttonStyle={style.buttonChangeStatus}
                    title="Changer statut"
                    onPress={() => onStatusChangeCallBack()}
                />
            </View>
        </View>
    </Modal>
);
 
export default MenuTask;
