import React from 'react';
import Prompt from 'rn-prompt';

const TextPrompt = ({ isVisible, onCancelCallback, onSubmitCallback, title, placeholder, defaultValue }) => (
    <Prompt
        title={title}
        placeholder={placeholder}
        defaultValue={defaultValue}
        visible={isVisible}
        onCancel={() => onCancelCallback()}
        onSubmit={(value) => onSubmitCallback(value)}
    />
);

export default TextPrompt;
