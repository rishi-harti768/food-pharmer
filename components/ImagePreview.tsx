import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  Image,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from 'react-native';
import { XIcon } from 'lucide-react-native';
import { router } from 'expo-router';
import { theme } from '../styles/globalStyles';

interface ImagePreviewProps {
  imageUri: string;
  onClear: () => void;
  isDarkMode?: boolean;
}

export default function ImagePreview({ 
  imageUri, 
  onClear,
  isDarkMode = useColorScheme() === 'dark'
}: ImagePreviewProps) {
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const proceedToAnalysis = () => {
    router.push({
      pathname: '/analysis',
      params: { 
        image: imageUri, 
        isDarkMode: isDarkMode ? 'true' : 'false'
      }
    });
    onClear();
  };

  return (
    <View style={[styles.modalContainer, { backgroundColor: currentTheme.modalOverlay }]}>
      <View style={[styles.previewContainer, { backgroundColor: currentTheme.surface }]}>
        <TouchableOpacity 
          style={styles.clearPreviewButton} 
          onPress={onClear}
        >
          <XIcon color="white" size={20} />
        </TouchableOpacity>
        
        <Image 
          source={{ uri: imageUri }} 
          style={styles.previewImage} 
          resizeMode="contain"
        />
        
        <TouchableOpacity 
          style={styles.proceedButton} 
          onPress={proceedToAnalysis}
        >
          <Text style={styles.proceedButtonText}>Analyze Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  previewImage: {
    width: '100%',
    height: '80%',
  },
  clearPreviewButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: theme.light.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  proceedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});