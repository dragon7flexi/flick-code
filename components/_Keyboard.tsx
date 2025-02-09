import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Modal, TouchableOpacity, Keyboard } from 'react-native';

const CustomKeyboardApp = () => {
  const [inputText, setInputText] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleFocus = () => {
    // Prevent the default system keyboard from showing up
    Keyboard.dismiss();
    setIsKeyboardVisible(true); // Show the custom keyboard
  };

  const handleCustomKeyPress = (key: string) => {
    setInputText(inputText + key);
  };

  const handleCloseKeyboard = () => {
    setIsKeyboardVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={inputText}
        onFocus={handleFocus}
        placeholder="Tap here to show the custom keyboard"
      />
      
      {/* Display Custom Keyboard if it's visible */}
      {isKeyboardVisible && (
        <Modal transparent={true} visible={isKeyboardVisible}>
          <View style={styles.customKeyboard}>
            <View style={styles.keyboardContainer}>
              <TouchableOpacity onPress={() => handleCustomKeyPress('1')}>
                <Text style={styles.key}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCustomKeyPress('2')}>
                <Text style={styles.key}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCustomKeyPress('3')}>
                <Text style={styles.key}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCustomKeyPress('4')}>
                <Text style={styles.key}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCloseKeyboard()}>
                <Text style={styles.close}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textInput: {
    height: 50,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  customKeyboard: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardContainer: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  key: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 24,
    margin: 10,
  },
  close: {
    width: 100,
    height: 50,
    backgroundColor: '#f00',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 50,
    fontSize: 18,
    marginTop: 20,
  },
});

export default CustomKeyboardApp;
