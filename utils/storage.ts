import * as FileSystem from 'expo-file-system';

export interface AnalysisData {
  id: string;
  date: string;
  productName: string;
  imageUri: string;
  result: string;
  status: 'Reviewed' | 'Completed' | 'Pending';
  compliant: boolean;
  nutritionFacts?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sugar: number;
    sodium: number;
  };
  regulatoryCompliance?: {
    isCompliant: boolean;
    issues: string[];
  };
  qualityScore?: string;
  recommendedActions?: string[];
}

const STORAGE_FILE = `${FileSystem.documentDirectory}analyses.json`;

const ensureStorageFile = async () => {
  const fileInfo = await FileSystem.getInfoAsync(STORAGE_FILE);
  if (!fileInfo.exists) {
    await FileSystem.writeAsStringAsync(STORAGE_FILE, JSON.stringify([]));
  }
};

export const saveAnalysis = async (analysis: AnalysisData): Promise<void> => {
  try {
    await ensureStorageFile();
    const existingData = await getAnalyses();
    const updatedData = [analysis, ...existingData.filter(a => a.id !== analysis.id)];
    await FileSystem.writeAsStringAsync(STORAGE_FILE, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }
};

export const getAnalyses = async (): Promise<AnalysisData[]> => {
  try {
    await ensureStorageFile();
    const data = await FileSystem.readAsStringAsync(STORAGE_FILE);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error getting analyses:', error);
    return [];
  }
};

export const deleteAnalysis = async (id: string): Promise<void> => {
  try {
    await ensureStorageFile();
    const existingData = await getAnalyses();
    const updatedData = existingData.filter(analysis => analysis.id !== id);
    await FileSystem.writeAsStringAsync(STORAGE_FILE, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error deleting analysis:', error);
    throw error;
  }
}; 