import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  Modal, 
  Pressable,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraIcon, ImageIcon, PlusIcon } from 'lucide-react-native';
import { theme } from '../styles/globalStyles';

interface ImagePickerModalProps {
  onImageSelected: (uri: string) => void;
  isDarkMode?: boolean;
}

export default function ImagePickerModal({ 
  onImageSelected,
  isDarkMode = useColorScheme() === 'dark'
}: ImagePickerModalProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
        presentationStyle: 'overFullScreen',
      });

      if (!result.canceled) {
        onImageSelected(result.assets[0].uri);
        closeModal();
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const takePhotoWithCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
        presentationStyle: 'overFullScreen',
      });

      if (!result.canceled) {
        onImageSelected(result.assets[0].uri);
        closeModal();
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.fab} 
        onPress={openModal}
      >
        <PlusIcon color="white" size={24} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <Pressable 
          style={[styles.modalOverlay, { backgroundColor: currentTheme.modalOverlay }]} 
          onPress={closeModal}
        >
          <View style={[styles.modalContent, { 
            backgroundColor: currentTheme.surface,
          }]}>
            <Text style={[styles.modalTitle, { 
              color: currentTheme.text 
            }]}>Create New Report</Text>
            
            <TouchableOpacity 
              style={[styles.modalOption, { borderBottomColor: currentTheme.border }]} 
              onPress={takePhotoWithCamera}
            >
              <CameraIcon size={24} color={currentTheme.text} />
              <Text style={[styles.modalOptionText, { color: currentTheme.text }]}>
                Take Photo
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalOption, { borderBottomColor: currentTheme.border }]} 
              onPress={pickImageFromGallery}
            >
              <ImageIcon size={24} color={currentTheme.text} />
              <Text style={[styles.modalOptionText, { color: currentTheme.text }]}>
                Choose from Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: theme.light.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  modalOptionText: {
    marginLeft: 15,
    fontSize: 16,
  },
});