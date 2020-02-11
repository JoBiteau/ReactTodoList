import React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { APP_COLORS } from './../../styles/color';

const ButtonAddTask = ({ onPressCallback }) => (
    <ActionButton 
        buttonColor={APP_COLORS.primaryAction}
        // icon={<Icon color={APP_COLORS.primaryText} name={'add'} />}
        renderIcon={() => (<Icon style={APP_COLORS.primaryText} name={'add'} />)} 
        onPress={() => onPressCallback()}
    />
);


export default ButtonAddTask;
