import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeftIcon, TwitterIcon, SunIcon, MoonIcon, SaveIcon } from 'lucide-react-native';
import { theme } from '../styles/globalStyles';
import { saveAnalysis } from '../utils/storage';
import * as Haptics from 'expo-haptics';

export default function AnalysisScreen() {
  const params = useLocalSearchParams<{ image: string; isDarkMode: string }>();
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(
    params.isDarkMode ? params.isDarkMode === 'true' : systemColorScheme === 'dark'
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!params.isDarkMode) {
      setIsDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, params.isDarkMode]);

  const mockAnalysisData = {
    date: '2024-02-16',
    productName: 'Protein Shake',
    nutritionFacts: {
      calories: 180,
      protein: 20,
      carbs: 8,
      fat: 5,
      sugar: 3,
      sodium: 150,
    },
    regulatoryCompliance: {
      isCompliant: false,
      issues: [
        'Excess sodium content (>140mg per serving)',
        'Sugar content exceeds recommended daily intake',
        'Incomplete nutritional labeling'
      ]
    },
    qualityScore: '4/10',
    recommendedActions: [
      'Avoid consumption',
      'Contact manufacturer for clarification',
      'Consider healthier alternatives'
    ]
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const ShareOnTwitter = () => {
    console.log('Sharing analysis on Twitter');
    alert('This is just a mock button for now');
  };

  const handleSave = async () => {
    if (isSaving) return;
    
    try {
      setIsSaving(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      const analysisData = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        productName: mockAnalysisData.productName,
        imageUri: params.image,
        result: mockAnalysisData.regulatoryCompliance.isCompliant ? 'Compliant' : 'Non-Compliant',
        status: 'Completed' as const,
        compliant: mockAnalysisData.regulatoryCompliance.isCompliant,
        nutritionFacts: mockAnalysisData.nutritionFacts,
        regulatoryCompliance: mockAnalysisData.regulatoryCompliance,
        qualityScore: mockAnalysisData.qualityScore,
        recommendedActions: mockAnalysisData.recommendedActions,
      };

      await saveAnalysis(analysisData);

      // Show platform-specific success notification
      if (Platform.OS === 'android') {
        ToastAndroid.show('Analysis saved successfully', ToastAndroid.SHORT);
      } else {
        Alert.alert(
          'Success',
          'Analysis saved successfully',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save analysis');
    } finally {
      setIsSaving(false);
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const styles = createStyles(isDarkMode);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1E1E1E' : '#2196F3'}
      />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeftIcon color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Analysis</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[
              styles.headerButton,
              isSaving && styles.headerButtonDisabled
            ]} 
            onPress={handleSave}
            disabled={isSaving}
          >
            <SaveIcon color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={toggleDarkMode}
          >
            {isDarkMode ? 
              <SunIcon color="white" size={24} /> : 
              <MoonIcon color="white" size={24} />
            }
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: params.image }} 
          style={styles.image} 
          resizeMode="contain" 
        />
      </View>

      <ScrollView style={styles.analysisContainer}>
        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>Product Name</Text>
          <Text style={styles.sectionContent}>{mockAnalysisData.productName}</Text>
        </View>

        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>Nutrition Facts</Text>
          {Object.entries(mockAnalysisData.nutritionFacts).map(([key, value]) => (
            <View key={key} style={styles.nutritionRow}>
              <Text style={styles.nutritionLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              <Text style={styles.nutritionValue}>{value} {key === 'calories' ? 'kcal' : 'g'}</Text>
            </View>
          ))}
        </View>

        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>Regulatory Compliance</Text>
          <Text style={[
            styles.complianceStatus, 
            { 
              color: mockAnalysisData.regulatoryCompliance.isCompliant ? 'green' : 'red' 
            }
          ]}>
            {mockAnalysisData.regulatoryCompliance.isCompliant ? 'Compliant' : 'Non-Compliant'}
          </Text>
          {mockAnalysisData.regulatoryCompliance.issues.map((issue, index) => (
            <Text key={index} style={styles.listItem}>• {issue}</Text>
          ))}
        </View>

        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>Recommended Actions</Text>
          {mockAnalysisData.recommendedActions.map((action, index) => (
            <Text key={index} style={styles.listItem}>• {action}</Text>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.twitterButton} 
          onPress={ShareOnTwitter}
        >
          <TwitterIcon color="white" size={24} />
          <Text style={styles.twitterButtonText}>Share Analysis</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  darkModeToggle: {
    marginLeft: 10,
  },
  imageContainer: {
    height: 300,
    backgroundColor: isDarkMode ? '#2C2C2C' : 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: '90%',
    height: '90%',
  },
  analysisContainer: {
    flex: 1,
    padding: 15,
  },
  analysisSection: {
    backgroundColor: isDarkMode ? '#2C2C2C' : 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: isDarkMode ? '#4A90E2' : '#007bff',
  },
  sectionContent: {
    fontSize: 16,
    color: isDarkMode ? 'white' : 'black',
  },
  listItem: {
    fontSize: 14,
    marginBottom: 5,
    color: isDarkMode ? '#E0E0E0' : 'black',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nutritionLabel: {
    fontSize: 14,
    color: isDarkMode ? '#A0A0A0' : '#666',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: isDarkMode ? 'white' : 'black',
  },
  complianceStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  twitterButton: {
    flexDirection: 'row',
    backgroundColor: '#1DA1F2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  twitterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 15,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerButtonDisabled: {
    opacity: 0.5,
  },
});