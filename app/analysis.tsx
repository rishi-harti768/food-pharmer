import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeftIcon, TwitterIcon, SunIcon, MoonIcon } from 'lucide-react-native';

export default function AnalysisScreen() {
  const { image } = useLocalSearchParams<{ image: string }>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

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

  const styles = createStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeftIcon color={isDarkMode ? 'white' : 'white'} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Analysis</Text>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeToggle}>
          {isDarkMode ? <SunIcon color="white" size={24} /> : <MoonIcon color="white" size={24} />}
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: image }} 
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
});