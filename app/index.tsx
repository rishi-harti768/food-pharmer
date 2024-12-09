import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  useColorScheme,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import ImagePickerModal from '../components/ImagePickerModal';
import ImagePreview from '../components/ImagePreview';
import { SunIcon, MoonIcon, ArrowRightIcon, ClipboardListIcon } from 'lucide-react-native';

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
  const [pressedId, setPressedId] = useState<string | null>(null);

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

  const navigateToAnalysis = (analysis: typeof mockAnalyses[0]) => {
    setPressedId(analysis.id);
    setTimeout(() => {
      setPressedId(null);
      router.push({
        pathname: '/analysis',
        params: { image: analysis.imageUri }
      });
    }, 150);
  };

  const styles = createStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ClipboardListIcon color="white" size={28} style={styles.headerIcon} />
          <Text style={styles.headerTitle}>FoodPharmer</Text>
        </View>
        <TouchableOpacity 
          onPress={toggleDarkMode} 
          style={styles.darkModeToggle}
        >
          {isDarkMode ? 
            <SunIcon color="white" size={24} /> : 
            <MoonIcon color="white" size={24} />
          }
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.analysesContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Previous Analyses</Text>
        {mockAnalyses.map((analysis) => (
          <TouchableOpacity 
            key={analysis.id} 
            style={[
              styles.analysisItem,
              pressedId === analysis.id && styles.analysisItemPressed,
              { borderLeftColor: analysis.compliant ? '#4CAF50' : '#F44336' }
            ]}
            onPress={() => navigateToAnalysis(analysis)}
            activeOpacity={0.7}
          >
            <View style={styles.analysisDetails}>
              <View style={styles.analysisHeader}>
                <View style={styles.dateContainer}>
                  <Text style={styles.analysisDate}>{analysis.date}</Text>
                </View>
                <ArrowRightIcon 
                  size={20} 
                  color={isDarkMode ? '#A0A0A0' : '#666'} 
                  style={styles.arrowIcon}
                />
              </View>
              <Text style={styles.analysisProduct}>{analysis.productName}</Text>
              <View style={styles.analysisFooter}>
                <Text style={[
                  styles.analysisResult, 
                  { color: analysis.compliant ? '#4CAF50' : '#F44336' }
                ]}>
                  {analysis.result}
                </Text>
                <View style={[
                  styles.statusBadge,
                  { 
                    backgroundColor: analysis.compliant ? 
                      'rgba(76, 175, 80, 0.1)' : 
                      'rgba(244, 67, 54, 0.1)' 
                  }
                ]}>
                  <Text style={[
                    styles.analysisStatus,
                    { color: analysis.compliant ? '#4CAF50' : '#F44336' }
                  ]}>
                    {analysis.status}
                  </Text>
                </View>
              </View>
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
    backgroundColor: isDarkMode ? '#1E1E1E' : '#2196F3',
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  darkModeToggle: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  analysesContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: isDarkMode ? 'white' : 'black',
    letterSpacing: 0.5,
  },
  analysisItem: {
    backgroundColor: isDarkMode ? '#2C2C2C' : 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderLeftWidth: 4,
    transform: [{ scale: 1 }],
  },
  analysisItemPressed: {
    transform: [{ scale: 0.98 }],
  },
  analysisDetails: {
    flexDirection: 'column',
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  analysisDate: {
    fontSize: 14,
    color: isDarkMode ? '#A0A0A0' : '#666',
    fontWeight: '500',
  },
  arrowIcon: {
    opacity: 0.6,
  },
  analysisProduct: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: isDarkMode ? 'white' : 'black',
    letterSpacing: 0.3,
  },
  analysisFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  analysisResult: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  analysisStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
});