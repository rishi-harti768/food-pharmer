import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  Modal, 
  Pressable,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraIcon, ImageIcon, PlusIcon } from 'lucide-react-native';

interface ImagePickerModalProps {
  onImageSelected: (uri: string) => void;
}

export default function ImagePickerModal({ 
  onImageSelected 
}: ImagePickerModalProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
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
          style={styles.modalOverlay} 
          onPress={closeModal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Report</Text>
            
            <TouchableOpacity 
              style={styles.modalOption} 
              onPress={takePhotoWithCamera}
            >
              <CameraIcon size={24} color="black" />
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalOption} 
              onPress={pickImageFromGallery}
            >
              <ImageIcon size={24} color="black" />
              <Text style={styles.modalOptionText}>Choose from Gallery</Text>
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
    backgroundColor: '#007bff',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
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
    borderBottomColor: '#e0e0e0',
  },
  modalOptionText: {
    marginLeft: 15,
    fontSize: 16,
  },
});