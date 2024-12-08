import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  useColorScheme,
} from 'react-native';
import ImagePickerModal from '../components/ImagePickerModal';
import ImagePreview from '../components/ImagePreview';
import { SunIcon, MoonIcon } from 'lucide-react-native';

const mockAnalyses = [
  {
    id: '1',
    date: '2024-02-15',
    productName: 'Protein Shake',
    imageUri: 'https://example.com/image1.jpg',
    result: 'Non-Compliant - High Sodium',
    status: 'Reviewed',
    compliant: false
  },
  {
    id: '2',
    date: '2024-02-10',
    productName: 'Organic Granola',
    imageUri: 'https://example.com/image2.jpg',
    result: 'Compliant',
    status: 'Completed',
    compliant: true
  },
  {
    id: '3',
    date: '2024-02-05',
    productName: 'Frozen Meal',
    imageUri: 'https://example.com/image3.jpg',
    result: 'Requires Investigation',
    status: 'Pending',
    compliant: false
  }
];

export default function Index() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPreviewModalVisible, setPreviewModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const handleImageSelected = (uri: string) => {
    setImagePreview(uri);
    setPreviewModalVisible(true);
  };

  const clearPreview = () => {
    setImagePreview(null);
    setPreviewModalVisible(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const styles = createStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FoodPharmer</Text>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeToggle}>
          {isDarkMode ? <SunIcon color="white" size={24} /> : <MoonIcon color="white" size={24} />}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.analysesContainer}>
        <Text style={styles.sectionTitle}>Previous Analyses</Text>
        {mockAnalyses.map((analysis) => (
          <TouchableOpacity 
            key={analysis.id} 
            style={styles.analysisItem}
          >
            <View style={styles.analysisDetails}>
              <Text style={styles.analysisDate}>{analysis.date}</Text>
              <Text style={styles.analysisProduct}>{analysis.productName}</Text>
              <Text style={[
                styles.analysisResult, 
                { color: analysis.compliant ? 'green' : 'red' }
              ]}>
                {analysis.result}
              </Text>
              <Text style={styles.analysisStatus}>{analysis.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ImagePickerModal 
        onImageSelected={handleImageSelected} 
      />

      <Modal
        visible={isPreviewModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={clearPreview}
      >
        {imagePreview && (
          <ImagePreview 
            imageUri={imagePreview} 
            onClear={clearPreview} 
          />
        )}
      </Modal>
    </View>
  );
}

const createStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
  },
  header: {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#007bff',
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  darkModeToggle: {
    marginLeft: 10,
  },
  analysesContainer: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: isDarkMode ? 'white' : 'black',
  },
  analysisItem: {
    backgroundColor: isDarkMode ? '#2C2C2C' : 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  analysisDetails: {
    flexDirection: 'column',
  },
  analysisDate: {
    fontSize: 14,
    color: isDarkMode ? '#A0A0A0' : '#666',
    marginBottom: 5,
  },
  analysisProduct: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: isDarkMode ? 'white' : 'black',
  },
  analysisResult: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  analysisStatus: {
    fontSize: 14,
    color: isDarkMode ? '#4A90E2' : '#007bff',
  },
});